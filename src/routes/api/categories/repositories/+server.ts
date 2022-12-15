import type { RequestHandler } from './$types'
import { json as json$1 } from '@sveltejs/kit'
import repositories from '$api/repositories'

export const GET: RequestHandler = async ({ url }) => {
	const term = url.searchParams.get('term') || ''
	const sort = url.searchParams.get('sort') || 'title'
	const days = Number(url.searchParams.get('days')) || -1
	const downloads = Number(url.searchParams.get('downloads')) || 0
	const page = Number(url.searchParams.get('page')) || 1
	const pageSize = Number(url.searchParams.get('pagesize')) || 10
	const ascending = sort === 'title' ? true : false

	const now = Number(new Date())
	const range = now - Number(days) * 1000 * 60 * 60 * 24

	// Convert range to  YYYY-MM-DD HH:MI:SS
	const gitHubUpdatedAtComp = new Date(range).toISOString().slice(0, 19).replace('T', ' ')

	const { data, count, error } = await repositories.getAll({
		term,
		sort,
		ascending,
		repoUpdatedAt: gitHubUpdatedAtComp,
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
				const { id, last_data_update: lastDataUpdate, url } = entry

				// Check if data was updated in the past 24 hours
				const needsDataUpdate =
					new Date(lastDataUpdate).valueOf() < Date.now() - 1000 * 60 * 60 * 24

				if (needsDataUpdate) {
					updateData = true
					repositories.update({ id, url })
				}
			})
		)
	}

	if (updateData) {
		// Reget all entries from the database
		const { data, count, error } = await repositories.getAll({
			term,
			sort,
			ascending,
			updatedAt: gitHubUpdatedAtComp,
			days,
			paginate: true,
			page,
			pageSize
		})
		if (error) return json$1({ error: error?.message }, { status: 500 })

		return json$1({ data, count, error }, { status: 200 })
	}

	return json$1({ data, count, error }, { status: 200 })
}
