import type { Load } from '@sveltejs/kit'
import {
	termStore,
	sortStore,
	categoryStore,
	downloadsStore,
	daysStore,
	categoriesStore,
	entriesStore,
	pageStore,
	pageSizeStore
} from '$stores'

export const load: Load = async ({ fetch, url }) => {
	const term = url.searchParams.get('term') || ''
	const sort = url.searchParams.get('sort') || 'full_name'
	const page = url.searchParams.get('page') || '1'
	const pageSize = url.searchParams.get('pagesize') || '5'
	const days = url.searchParams.get('days') || '-1'
	const downloads = url.searchParams.get('downloads') || '-1'
	const category = url.searchParams.get('category') || '0'

	termStore.set(term)
	sortStore.set(sort)
	pageStore.set(Number(page))
	pageSizeStore.set(Number(pageSize))
	daysStore.set(Number(days))
	downloadsStore.set(Number(downloads))
	categoryStore.set(Number(category))

	const resEntries = await fetch(
		`/api/entries?term=${encodeURI(
			term
		)}&sort=${sort}&page=${page}&pagesize=${pageSize}&category=${category}&days=${days}&downloads=${downloads}`
	)
	const entries = await resEntries.json()

	if (entries.error) throw console.error(500, entries.error.message)

	const resCategories = await fetch(`/api/categories`)
	const categories = await resCategories.json()

	if (categories.error) throw console.error(500, entries.error.message)

	// Update stores
	entriesStore.set(entries.data)
	categoriesStore.set(categories.data)

	return {
		categories: categories.data,
		entries: entries.data
	}
}
