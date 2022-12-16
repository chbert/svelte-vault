import { supabaseAdminClient } from '$db/server'
import { getSplittedTerm } from '$utils'
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

		const publishedAfterDate = new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * days)
		const publishedAfter = publishedAfterDate.toISOString().replace('T', ' ').substring(0, 19)

		let query = supabaseAdminClient
			.from('articles')
			.select(select, { count: 'exact' })
			.order(sort, { ascending: ascending })

		if (term) query = query.textSearch('fts', `${getSplittedTerm(term)}`)
		if (days > -1) query = query.gt('published_at', publishedAfterDate)
		if (paginate) query = query.range(from, to)

		return await query
	},
	// Add an article
	add: async (url: string, title: string, description: string, author: string = '') => {
		return await supabaseAdminClient.from('articles').insert({ url, title, description, author })
	},
	// Delete an article
	delete: async (id: number) => {
		const { error } = await supabaseAdminClient.from('articles').delete().eq('id', id)
		if (error) return { success: false, error }

		return { success: !error }
	}
}

export default articles
