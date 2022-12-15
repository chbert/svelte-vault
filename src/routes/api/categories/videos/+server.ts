import type { RequestHandler } from './$types'
import { json as json$1 } from '@sveltejs/kit'
import videos from '$api/videos'

export const GET: RequestHandler = async ({ url }) => {
	const term = url.searchParams.get('term') || ''
	const sort = url.searchParams.get('sort') || 'title'
	const days = Number(url.searchParams.get('days')) || -1
	const likes = Number(url.searchParams.get('likes')) || 0
	const views = Number(url.searchParams.get('views')) || -1
	const page = Number(url.searchParams.get('page')) || 1
	const pageSize = Number(url.searchParams.get('pagesize')) || 10
	const ascending = sort === 'title' ? true : false

	const now = Number(new Date())
	const range = now - Number(days) * 1000 * 60 * 60 * 24

	const { data, count, error } = await videos.getAll({
		term,
		sort,
		ascending,
		likes,
		views,
		days,
		paginate: true,
		page,
		pageSize
	})

	return json$1({ data, count, error }, { status: 200 })
}
