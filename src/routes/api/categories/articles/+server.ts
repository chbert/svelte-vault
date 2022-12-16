import type { RequestHandler } from './$types'
import { json } from '@sveltejs/kit'
import articles from '$api/articles'

export const GET: RequestHandler = async ({ url }) => {
	const term = url.searchParams.get('term') || ''
	const sort = url.searchParams.get('sort') || 'title'
	const days = Number(url.searchParams.get('days')) || -1
	const page = Number(url.searchParams.get('page')) || 1
	const pageSize = Number(url.searchParams.get('pagesize')) || 10
	const ascending = sort === 'title' ? true : false

	const { data, count, error } = await articles.getAll({
		term,
		sort,
		ascending,
		days,
		paginate: true,
		page,
		pageSize
	})
	if (error) return console.log(error)

	return json({ data, count, error }, { status: 200 })
}
