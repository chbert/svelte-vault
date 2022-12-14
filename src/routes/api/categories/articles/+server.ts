import type { RequestHandler } from './$types'
import { json as json$1 } from '@sveltejs/kit'
import { getArticles } from '$api/articles'

export const GET: RequestHandler = async ({ url }) => {
	const term = url.searchParams.get('term') || ''
	const sort = url.searchParams.get('sort') || 'title'
	const days = Number(url.searchParams.get('days')) || -1
	const page = Number(url.searchParams.get('page')) || 1
	const pageSize = Number(url.searchParams.get('pagesize')) || 5
	const ascending = sort === 'title' ? true : false

	const now = Number(new Date())
	const range = now - Number(days) * 1000 * 60 * 60 * 24

	const { data, count, error } = await getArticles({
		term,
		sort,
		ascending,
		days,
		paginate: true,
		page,
		pageSize
	})
	if (error) return console.log(error)

	return json$1({ data, count, error }, { status: 200 })
}
