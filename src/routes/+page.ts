import type { Load } from '@sveltejs/kit'
import {
	termStore,
	sortStore,
	categoryStore,
	downloadsStore,
	daysStore,
	categoriesStore,
	entriesStore
} from '$stores'

export const load: Load = async ({ fetch, url }) => {
	const term = url.searchParams.get('term') || ''
	const sort = url.searchParams.get('sort') || 'full_name'
	const days = url.searchParams.get('days') || '-1'
	const downloads = url.searchParams.get('downloads') || '-1'
	const category = url.searchParams.get('category') || '0'

	termStore.set(term)
	sortStore.set(sort)
	daysStore.set(Number(days))
	downloadsStore.set(Number(downloads))
	categoryStore.set(Number(category))

	const resEntries = await fetch(
		`/api/entries?term=${encodeURI(
			term
		)}&sort=${sort}&category=${category}&days=${days}&downloads=${downloads}`
	)
	const entries = await resEntries.json()

	if (entries.error) throw console.error(500, entries.error.message)

	const resCategories = await fetch(`/api/categories`)
	const categories = await resCategories.json()

	if (categories.error) throw console.error(500, entries.error.message)

	// Update stores

	console.log('entries.data.length :>> ', entries.data.length)
	entriesStore.set(entries.data)
	categoriesStore.set(categories.data)

	return {
		categories: categories.data,
		entries: entries.data
	}
}
