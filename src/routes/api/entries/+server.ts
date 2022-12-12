import type { RequestHandler } from './$types'
import { json as json$1 } from '@sveltejs/kit'
import { supabaseAdminClient } from '$db/server'
import { Octokit } from 'octokit'
import { throttling } from '@octokit/plugin-throttling'

import { env } from '$env/dynamic/private'
import { getPagination } from '$utils/pagination'

const token = env.PRIVATE_GITHUB_TOKEN

const VaultOctokit = Octokit.plugin(throttling)
const octokit = new VaultOctokit({
	auth: token,
	throttle: {
		onRateLimit: (
			retryAfter: any,
			options: { method: any; url: any },
			octokit: { log: { warn: (arg0: string) => void; info: (arg0: string) => void } },
			retryCount: number
		) => {
			octokit.log.warn(`Request quota exhausted for request ${options.method} ${options.url}`)

			if (retryCount < 1) {
				// only retries once
				octokit.log.info(`Retrying after ${retryAfter} seconds!`)
				return true
			}
		},
		onSecondaryRateLimit: (
			retryAfter: any,
			options: { method: any; url: any },
			octokit: { log: { warn: (arg0: string) => void } }
		) => {
			// does not retry, only logs a warning
			octokit.log.warn(`SecondaryRateLimit detected for request ${options.method} ${options.url}`)
		}
	},
	log: console
})

export const GET: RequestHandler = async ({ url }) => {
	const term = url.searchParams.get('term') || ''
	const sort = url.searchParams.get('sort') || 'full_name'
	const days = Number(url.searchParams.get('days')) || -1
	const downloads = Number(url.searchParams.get('downloads')) || 0
	const category = Number(url.searchParams.get('category')) || 0
	const page = Number(url.searchParams.get('page')) || 1
	const pageSize = Number(url.searchParams.get('pagesize')) || 5

	const ascending = sort === 'github' ? true : false
	const now = Number(new Date())
	const range = now - Number(days) * 1000 * 60 * 60 * 24

	// Convert range to  YYYY-MM-DD HH:MI:SS
	const gitHubUpdatedAtComp = new Date(range).toISOString().slice(0, 19).replace('T', ' ')

	// Only check for categories if category is not 0
	const getData = async (paginate: boolean = true, select: string = '*') => {
		let from = 0
		let to = 5

		if (paginate) {
			const pagination = getPagination(page, pageSize)
			from = pagination.from
			to = pagination.to
		}

		let query = supabaseAdminClient
			.from('entries')
			.select(select, { count: 'exact' })
			.or(`full_name.ilike.%${decodeURI(term)}%,description.ilike.%${decodeURI(term)}%`)
			.order(sort, { ascending: ascending })
			.gte('npm_downloads_last_week', downloads)

		if (category !== 0) query = query.eq('category', category)
		if (days > -1) query = query.gt('repo_updated_at', gitHubUpdatedAtComp)
		if (downloads > -1) query = query.gt('npm_downloads_last_week', downloads)
		if (paginate) query = query.range(from, to)

		return await query
	}

	const { data, count, error } = await getData()
	if (error) return json$1({ error: error?.message }, { status: 500 })

	let updateData = false

	if (data) {
		await Promise.all(
			data.map(async (entry: any) => {
				const {
					id,
					last_data_update: lastDataUpdate,
					repo_url: repoUrl,
					npm_package: npmPackage
				} = entry

				// Check if data was updated in the past 24 hours
				const needsDataUpdate =
					new Date(lastDataUpdate).valueOf() < Date.now() - 1000 * 60 * 60 * 24

				if (true) {
					updateData = true

					// Get domain from repoUrl
					const domain = repoUrl.split('/')[2]
					const owner = repoUrl.split('/')[3]
					const repo = repoUrl.split('/')[4]

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

					if (domain === 'github.com') {
						const { data } = await octokit.request('GET /repos/{owner}/{repo}', {
							owner: owner,
							repo: repo
						})

						const {
							stargazers_count: stars,
							open_issues_count: openIssues,
							full_name: fullName,
							description,
							updated_at: repoUpdatedAt,
							homepage,
							license
						} = data

						const { error } = await supabaseAdminClient
							.from('entries')
							.update({
								full_name: fullName,
								description,
								homepage,
								stars,
								open_issues: openIssues,
								license: JSON.stringify(license),
								repo_url: repoUrl,
								repo_updated_at: repoUpdatedAt,
								last_data_update: new Date().toISOString(),
								npm_downloads_last_week: npmDownloadsLastWeek,
								npm_package: npmPackage
							})
							.eq('id', id)

						if (error) throw error
					}
				}
			})
		)
	}

	// TODO: Find a better way to update data
	// Get all categories from the database
	const categoriesEntries = await getData(false, 'category')
	if (categoriesEntries.error)
		return json$1({ error: categoriesEntries.error?.message }, { status: 500 })

	if (updateData) {
		// TODO: Find a better way to update data
		// Get all entries from the database
		const { data, count, error } = await getData()
		if (error) return json$1({ error: error?.message }, { status: 500 })

		return json$1(
			{ data, categoriesEntries: categoriesEntries.data, count, error },
			{ status: 200 }
		)
	}

	return json$1({ data, categoriesEntries: categoriesEntries.data, count, error }, { status: 200 })
}
