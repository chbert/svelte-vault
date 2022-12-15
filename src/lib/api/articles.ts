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

		let query = supabaseAdminClient
			.from('articles')
			.select(select, { count: 'exact' })
			.or(getArticlesSearchQuery(term))
			.order(sort, { ascending: ascending })

		if (days > -1) query = query.gt('published_at', days)
		if (paginate) query = query.range(from, to)

		return await query
	}
}

export default articles
