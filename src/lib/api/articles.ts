import { supabaseAdminClient } from '$db/server'
import { getPagination } from '$utils/pagination'

export const getArticles = async ({
	select = '*',
	term = '',
	sort = 'title',
	ascending = true,
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
		.from('articles')
		.select(select, { count: 'exact' })
		.or(`title.ilike.%${decodeURI(term)}%,description.ilike.%${decodeURI(term)}%`)
		.order(sort, { ascending: ascending })

	if (days > -1) query = query.gt('published_at', days)
	if (paginate) query = query.range(from, to)

	return await query
}
