import { supabaseAdminClient } from '$db/server'
import { getRepoInfo } from '$api/repositories'
import { getPagination } from '$utils/pagination'
import { splitRepoUrl } from '$utils/repositories'
import { cleanupNpmPackage, getNpmDownloads } from '$utils/packages'

export const getPackages = async ({
	select = '*',
	term = '',
	sort = 'title',
	ascending = true,
	downloads = -1,
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
		.from('packages')
		.select(select, { count: 'exact' })
		.or(
			`title.ilike.%${decodeURI(term)}%,npm_package.ilike.%${decodeURI(
				term
			)}%,url.ilike.%${decodeURI(term)}%,description.ilike.%${decodeURI(term)}%`
		)
		.order(sort, { ascending: ascending })
		.gte('npm_downloads_last_week', downloads)

	if (days > -1) query = query.gt('updated_at', updatedAt)
	if (downloads > -1) query = query.gt('npm_downloads_last_week', downloads)
	if (paginate) query = query.range(from, to)

	return await query
}

export const addPackage = async (repoUrl: string, npmPackage: string) => {
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
		last_data_update: new Date().toISOString(),
		npm_package: npmPackage,
		npm_downloads_last_week: npmDownloadsLastWeek
	})

	if (error) console.log(error)

	return { success: !error }
}

export const updatePackage = async ({ id = 0, url = '', npm_package = '' }) => {
	const { domain, owner, repo } = splitRepoUrl(url)

	const repoInfo = await getRepoInfo(url, domain, owner, repo)
	if (repoInfo?.status !== 200) return { success: false, error: repoInfo?.status }

	const npmDownloadsLastWeek = await getNpmDownloads(npm_package)
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
			last_data_update: new Date().toISOString(),
			npm_downloads_last_week: npmDownloadsLastWeek
		})
		.eq('id', id)

	if (error) console.log(error)

	return { success: !error }
}