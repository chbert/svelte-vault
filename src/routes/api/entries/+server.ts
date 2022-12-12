import type { RequestHandler } from './$types'
import { json as json$1 } from '@sveltejs/kit'
import { supabaseAdminClient } from '$db/server'
import { Octokit } from 'octokit'
import { entriesStore } from '$stores/categories'

import { PRIVATE_GITHUB_TOKEN } from '$env/static/private'

const token = PRIVATE_GITHUB_TOKEN
const octokit = new Octokit({ auth: token })

export const GET: RequestHandler = async ({ url }) => {
	const term = url.searchParams.get('term') || ''
	const sort = url.searchParams.get('sort') || 'full_name'
	const days = Number(url.searchParams.get('days')) || -1
	const downloads = Number(url.searchParams.get('downloads')) || 0
	const category = Number(url.searchParams.get('category')) || 0

	const ascending = sort === 'full_name' ? true : false
	const now = Number(new Date())
	const range = now - Number(days) * 1000 * 60 * 60 * 24

	// Convert range to  YYYY-MM-DD HH:MI:SS
	const gitHubUpdatedAtComp = new Date(range).toISOString().slice(0, 19).replace('T', ' ')

	// Only check for categories if category is not 0
	const getData = async () => {
		let query = supabaseAdminClient
			.from('entries')
			.select(`*, categories(*)`)
			.or(`full_name.ilike.%${decodeURI(term)}%,description.ilike.%${decodeURI(term)}%`)
			.order(sort, { ascending: ascending })
			.gte('npm_downloads_last_week', downloads)

		if (category !== 0) query = query.eq('category', category)
		if (days > -1) query = query.gt('github_updated_at', gitHubUpdatedAtComp)
		if (downloads > -1) query = query.gt('npm_downloads_last_week', downloads)

		return await query
	}

	const { data, error } = await getData()

	if (error) return json$1({ error: error?.message }, { status: 500 })

	let updateData = false
	if (data) {
		await Promise.all(
			data.map(async (entry) => {
				const {
					id,
					last_data_update: lastDataUpdate,
					github_repo: githubRepo,
					npm_package: npmPackage
				} = entry

				// Check if data was updated in the past 24 hours
				if (lastDataUpdate < Date.now() - 1000 * 60 * 60 * 24) {
					updateData = true

					const owner = githubRepo.split('/')[0]
					const repo = githubRepo.split('/')[1]

					const repository = await octokit.request('GET /repos/{owner}/{repo}', {
						owner: owner,
						repo: repo
					})

					// console.log(repository)

					const {
						stargazers_count: stars,
						open_issues_count: open_issues,
						full_name,
						description,
						updated_at,
						homepage
					} = repository.data
					const license = JSON.stringify(repository.data.license)

					let npmDownloadsLastWeek = 0

					if (npmPackage) {
						// Get last week downloads from npm
						// Replace / with %2F in npm package name
						const npmEncoded = npmPackage.replace(/\//g, '%2F')

						const npmDownloadsRes = await fetch(
							`https://api.npmjs.org/downloads/range/last-week/${npmEncoded}`
						)
						const npmDownloads = await npmDownloadsRes.json()

						// Sum up all downloads values in downloads inside npmDownloads
						npmDownloadsLastWeek = npmDownloads.downloads.reduce(
							(acc: number, curr: any) => acc + curr.downloads,
							0
						)
					}

					const { error } = await supabaseAdminClient
						.from('entries')
						.update({
							full_name,
							description,
							homepage,
							stars,
							open_issues,
							license,
							github_repo: githubRepo,
							github_updated_at: updated_at,
							last_data_update: new Date().toISOString(),
							npm_downloads_last_week: npmDownloadsLastWeek,
							npm_package: npmPackage
						})
						.eq('id', id)

					if (error) throw error
				}
			})
		)
	}

	if (updateData) {
		// Get all entries from the database
		const { data, error } = await getData()

		if (error) return json$1({ error: error?.message }, { status: 500 })
		return json$1({ data, error }, { status: 200 })
	}

	return json$1({ data, error }, { status: 200 })
}
