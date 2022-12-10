import { writable, derived } from 'svelte/store'
import type { Writable } from 'svelte/store'

const getCount = (data: [], category: number) => {
	return data.filter((entry: any) => entry.category === category).length
}

export const entriesStore: Writable<any> = writable(null)
export const categoriesStore: Writable<any> = writable(null)

export const categoryCounts: any = derived(
	[entriesStore, categoriesStore],
	([$entries, $categories], set) => {
		let categoryCounts: any = {}

		$categories?.forEach((category: any) => {
			categoryCounts[category.id] = getCount($entries, category.id)
		})

		return set(categoryCounts)
	}
)
