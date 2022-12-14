import type { RequestHandler } from './$types'
import { json } from '@sveltejs/kit'
import packages from '$api/packages'

export const GET: RequestHandler = async ({ url }) => {
	const term = url.searchParams.get('term') || ''
	const sort = url.searchParams.get('sort') || 'title'
	const days = Number(url.searchParams.get('days')) || -1
	const downloads = Number(url.searchParams.get('downloads')) || 0
	const page = Number(url.searchParams.get('page')) || 1
	const pageSize = Number(url.searchParams.get('pagesize')) || 10
	const ascending = sort === 'title' ? true : false

	const { data, count, error } = await packages.getAll({
		term,
		sort,
		ascending,
		downloads,
		days,
		paginate: true,
		page,
		pageSize
	})
	if (error) return console.log(error)

	let updateData = false

	if (data) {
		await Promise.all(
			data.map(async (entry: any) => {
				const { id, updated_at: updatedAt, url, npm_package } = entry

				// Check if data was updated in the past 24 hours
				const needsDataUpdate = updatedAt
					? new Date(updatedAt).valueOf() < Date.now() - 1000 * 60 * 60 * 24
					: true

				if (needsDataUpdate) {
					updateData = true
					packages.update({ id, url, npm_package })
				}
			})
		)
	}

	if (updateData) {
		// Reget all entries from the database
		const { data, count, error } = await packages.getAll({
			term,
			sort,
			ascending,
			downloads,
			days,
			paginate: true,
			page,
			pageSize
		})
		if (error) return json({ error: error?.message }, { status: 500 })

		return json({ data, count, error }, { status: 200 })
	}

	return json({ data, count, error }, { status: 200 })
}
