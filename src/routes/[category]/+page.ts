import type { Load } from '@sveltejs/kit'
import {
	termStore,
	sortStore,
	downloadsStore,
	daysStore,
	entriesStore,
	pageSizeStore,
	totalEntriesStore
} from '$stores'

export const load: Load = async ({ fetch, url, params }) => {
	const term = url.searchParams.get('term') || ''
	const sort = url.searchParams.get('sort') || 'title'
	const page = url.searchParams.get('page') || '1'
	const pageSize = url.searchParams.get('pagesize') || '10'
	const days = url.searchParams.get('days') || '-1'
	const downloads = url.searchParams.get('downloads') || '-1'
	const category = params.category || 'packages'

	termStore.set(decodeURI(term))
	sortStore.set(sort)
	pageSizeStore.set(Number(pageSize))
	daysStore.set(Number(days))
	downloadsStore.set(Number(downloads))

	// Fetch entries
	const resEntries = await fetch(
		`/api/categories/${category}?term=${encodeURI(
			term
		)}&sort=${sort}&page=${page}&pagesize=${pageSize}&days=${days}&downloads=${downloads}`
	)
	const entries = await resEntries.json()
	if (entries.error) throw console.error(500, entries.error.message)

	// Update stores
	entriesStore.set(entries.data)
	totalEntriesStore.set({ [category]: entries.count })

	return {
		count: entries.count,
		entries: entries.data
	}
}
