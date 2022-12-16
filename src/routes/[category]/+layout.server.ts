import type { LayoutServerLoad } from '../$types'
import { supabaseAdminClient } from '$db/server'

import { getArticlesSearchQuery } from '$utils/articles'
import { getRepositoriesSearchQuery } from '$utils/repositories'
import { getPackagesSearchQuery } from '$utils/packages'
import { getSplittedTerm } from '$utils'

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
			query = query.textSearch('fts', `${getSplittedTerm(term)}`)
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
