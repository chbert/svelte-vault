import type { LayoutServerLoad } from '../$types'
import { supabaseAdminClient } from '$db/server'

import { getVideosSearchQuery } from '$utils/videos'
import { getArticlesSearchQuery } from '$utils/articles'
import { getRepositoriesSearchQuery } from '$utils/repositories'
import { getPackagesSearchQuery } from '$utils/packages'

export const load: LayoutServerLoad = async ({ url }) => {
	const term = url.searchParams.get('term') || ''

	const { data, error } = await supabaseAdminClient
		.from('categories')
		.select(`*`)
		.order('order', { ascending: true })
	if (error) return console.log(error)

	const counts = []

	// Fetch categories counts
	for await (const category of data) {
		const categoryName = category.name
		const categoryTable = category.path

		let query = supabaseAdminClient.from(categoryTable).select(`id`, { count: 'exact' })

		if (term) {
			if (categoryName === 'Articles') query = query.or(getArticlesSearchQuery(term))
			else if (categoryName === 'Videos') query = query.or(getVideosSearchQuery(term))
			else if (categoryName === 'Repositories') query = query.or(getRepositoriesSearchQuery(term))
			else if (categoryName === 'Packages') query = query.or(getPackagesSearchQuery(term))
		}

		const { count, error } = await query
		if (error) return console.error(500, error.message)

		counts.push({ name: categoryName, count: count })
	}

	return {
		categories: data,
		counts: counts
	}
}
