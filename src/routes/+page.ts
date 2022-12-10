import type { Load } from '@sveltejs/kit'
import { entriesStore, categoriesStore } from '$stores/categories'

export const load: Load = async ({ fetch, url }) => {
	const term = url.searchParams.get('term') || ''
	const sort = url.searchParams.get('sort') || 'full_name'
	const days = url.searchParams.get('days') || '0'
	const downloads = url.searchParams.get('downloads') || '0'
	const category = url.searchParams.get('category') || '0'

	const resEntries = await fetch(
		`/api/entries?term=${encodeURI(
			term
		)}&sort=${sort}&category=${category}&days=${days}&downloads=${downloads}`
	)
	const entries = await resEntries.json()

	if (entries.error) throw console.error(500, entries.error.message)
	entriesStore.set(entries.data)

	const resCategories = await fetch(`/api/categories`)
	const categories = await resCategories.json()

	if (categories.error) throw console.error(500, entries.error.message)
	categoriesStore.set(categories.data)

	return {
		cateogries: categories.data,
		entries: entries.data
	}
}
