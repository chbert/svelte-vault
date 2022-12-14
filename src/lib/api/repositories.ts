import { supabaseAdminClient } from '$db/server'

import { Octokit } from 'octokit'
import { throttling } from '@octokit/plugin-throttling'

import { env } from '$env/dynamic/private'
import { getPagination } from '$utils/pagination'
import { getEmptyRepoObject, splitRepoUrl } from '$utils/repositories'

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

export const getRepoInfo = async (repoUrl: string, domain: string, owner: string, repo: string) => {
	if (domain === 'github.com') {
		try {
			const response = await octokit.request('GET /repos/{owner}/{repo}', {
				owner: owner,
				repo: repo
			})

			const { status } = response

			if (status === 200) {
				const { data } = response
				const {
					name,
					full_name,
					description,
					owner,
					homepage,
					stargazers_count,
					open_issues_count,
					topics,
					updated_at,
					license
				} = data

				return {
					status,
					title: name ? name : full_name,
					description,
					avatar: owner.avatar_url,
					homepage,
					stars: stargazers_count,
					open_issues: open_issues_count,
					topics,
					updated_at,
					license,
					url: repoUrl
				}
			} else if (status === 404) {
				return getEmptyRepoObject(status, repo, repoUrl)
			} else {
				return getEmptyRepoObject(status, repo, repoUrl)
			}
		} catch (error) {
			console.log('error :>> ', error)
		}
	} else {
		return getEmptyRepoObject(200, repo, repoUrl)
	}
}

export const getRepositories = async ({
	select = '*',
	term = '',
	sort = 'title',
	ascending = true,
	updatedAt = '',
	days = -1,
	paginate = true,
	page = 1,
	pageSize = 5
}) => {
	let from = 0
	let to = -1

	if (paginate) {
		const pagination = getPagination(page, pageSize)
		from = pagination.from
		to = pagination.to
	}

	let query = supabaseAdminClient
		.from('repositories')
		.select(select, { count: 'exact' })
		.or(
			`title.ilike.%${decodeURI(term)}%,url.ilike.%${decodeURI(
				term
			)}%,description.ilike.%${decodeURI(term)}%`
		)
		.order(sort, { ascending: ascending })

	if (days > -1) query = query.gt('updated_at', updatedAt)
	if (paginate) query = query.range(from, to)

	return await query
}

export const addRepository = async (repoUrl: string) => {
	// Get domain from url
	const { provider, domain, owner, repo, sub_repo } = splitRepoUrl(repoUrl)

	const repoInfo = await getRepoInfo(repoUrl, domain, owner, repo)
	if (repoInfo?.status !== 200) return { success: false, error: repoInfo?.status }

	const {
		title,
		description,
		avatar,
		homepage,
		stars,
		open_issues,
		topics,
		updated_at,
		license,
		url
	} = await repoInfo

	const { error } = await supabaseAdminClient.from('packages').insert({
		title,
		description,
		avatar,
		homepage,
		stars,
		open_issues,
		topics,
		updated_at,
		license,
		url,
		provider,
		owner,
		repo,
		sub_repo,
		last_data_update: new Date().toISOString()
	})

	if (error) console.log(error)

	return { success: !error }
}

export const updateRepository = async ({ id = 0, url = '' }) => {
	const { domain, owner, repo } = splitRepoUrl(url)

	const repoInfo = await getRepoInfo(url, domain, owner, repo)
	if (repoInfo?.status !== 200) return { success: false, error: repoInfo?.status }

	const { title, description, avatar, homepage, stars, open_issues, topics, updated_at, license } =
		await repoInfo

	const { error } = await supabaseAdminClient
		.from('packages')
		.update({
			title,
			description,
			avatar,
			homepage,
			stars,
			open_issues,
			topics,
			updated_at,
			license,
			last_data_update: new Date().toISOString()
		})
		.eq('id', id)

	if (error) console.log(error)

	return { success: !error }
}
