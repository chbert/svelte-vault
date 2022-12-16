import { supabaseAdminClient } from '$db/server'
import { getArticlesSearchQuery } from '$utils/articles'
import { getPagination } from '$utils/pagination'

const articles = {
	// Get all articles
	getAll: async ({
		select = '*',
		term = '',
		sort = 'title',
		ascending = true,
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

		term = decodeURI(term)

		let publishedAfter = new Date().getTime() - 1000 * 60 * 60 * 24 * days

		let query = supabaseAdminClient
			.from('articles')
			.select(select, { count: 'exact' })
			.or(getArticlesSearchQuery(term))
			.order(sort, { ascending: ascending })

		if (days > -1) query = query.gt('published_at', publishedAfter)
		if (paginate) query = query.range(from, to)

		return await query
	},
	// Add an article
	add: async (url: string, title: string, description: string, author: string = '') => {
		return await supabaseAdminClient.from('articles').insert({ url, title, description, author })
	}
}

export default articles
