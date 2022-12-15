import { supabaseAdminClient } from '$db/server'

import { getPagination } from '$utils/pagination'
import { splitRepoUrl } from '$utils/repositories'
import { cleanupNpmPackage, getNpmDownloads } from '$utils/packages'
import repositories from '$api/repositories'

const packages = {
	// Get all packages
	getAll: async ({
		select = '*',
		term = '',
		sort = 'title',
		ascending = true,
		downloads = -1,
		repoUpdatedAt = '',
		days = -1,
		paginate = true,
		page = 1,
		pageSize = 10
	}) => {
		let from = 0
		let to = -1

		if (paginate) {
			const pagination = getPagination(page, pageSize)
			from = pagination.from
			to = pagination.to
		}

		let query = supabaseAdminClient
			.from('packages')
			.select(select, { count: 'exact' })
			.or(
				`title.ilike.%${decodeURI(term)}%,npm_package.ilike.%${decodeURI(
					term
				)}%,url.ilike.%${decodeURI(term)}%,description.ilike.%${decodeURI(term)}%`
			)
			.order(sort, { ascending: ascending })
			.gte('npm_downloads_last_week', downloads)

		if (days > -1) query = query.gt('repo_updated_at', repoUpdatedAt)
		if (downloads > -1) query = query.gt('npm_downloads_last_week', downloads)
		if (paginate) query = query.range(from, to)

		return await query
	},
	// Add a package
	add: async (repoUrl: string, npmPackage: string) => {
		// Get domain from url
		const { provider, domain, owner, repo, sub_repo } = splitRepoUrl(repoUrl)
		let npmDownloadsLastWeek = 0

		// Get last week downloads from npm
		if (npmPackage) {
			npmPackage = cleanupNpmPackage(npmPackage)

			try {
				npmDownloadsLastWeek = await getNpmDownloads(npmPackage)
			} catch (error) {
				console.log('error :>> ', error)
			}
		}

		const repoInfo = await repositories.getAll(repoUrl, domain, owner, repo)
		if (repoInfo?.status !== 200) return { success: false, error: repoInfo?.status }

		const {
			title,
			description,
			avatar,
			homepage,
			stars,
			open_issues,
			topics,
			repo_updated_at,
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
			repo_updated_at,
			license,
			url,
			provider,
			owner,
			repo,
			sub_repo,
			updated_at: new Date(),
			npm_package: npmPackage,
			npm_downloads_last_week: npmDownloadsLastWeek
		})

		if (error) console.log(error)

		return { success: !error }
	},
	// Update a package
	update: async ({ id = 0, url = '', npm_package = '' }) => {
		const { domain, owner, repo } = splitRepoUrl(url)

		const npmDownloadsLastWeek = await getNpmDownloads(npm_package)

		const repoInfo = await getRepoInfo(url, domain, owner, repo)
		if (repoInfo?.status !== 200) return { success: false, error: repoInfo?.status }

		const {
			title,
			description,
			avatar,
			homepage,
			stars,
			open_issues,
			topics,
			repo_updated_at,
			license
		} = await repoInfo

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
				repo_updated_at,
				license,
				updated_at: new Date(),
				npm_downloads_last_week: npmDownloadsLastWeek
			})
			.eq('id', id)

		if (error) console.log(error)

		return { success: !error }
	}
}

export default packages
