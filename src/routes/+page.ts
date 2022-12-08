import type { Load } from '@sveltejs/kit'
import { entriesStore, categoriesStore } from '$stores/categories'

export const load: Load = async ({ fetch }) => {
	const resEntries = await fetch(`/api/entries`)
	const entries = await resEntries.json()

	if (entries.error) throw console.error(500, entries.error.message)

	const resCategories = await fetch(`/api/categories`)
	const categories = await resCategories.json()

	if (categories.error) throw console.error(500, entries.error.message)

	entriesStore.set(entries.data)
	categoriesStore.set(categories.data)

	return {
		cateogries: categories.data,
		entries: entries.data
	}
}
