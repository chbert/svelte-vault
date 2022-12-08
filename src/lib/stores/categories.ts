import { writable, derived } from 'svelte/store'
import type { Writable } from 'svelte/store'

const getCount = (data: [], category: string) => {
	return data.filter((entry: any) => entry.categories?.name === category).length
}

export const entriesStore: Writable<any> = writable(null)
export const categoriesStore: Writable<any> = writable(null)

export const categoryCounts: any = derived(
	[entriesStore, categoriesStore],
	([$entries, $categories], set) => {
		let categoryCounts: any = {}

		$categories?.forEach((category: any) => {
			categoryCounts[category.name] = getCount($entries, category.name)
		})

		return set(categoryCounts)
	}
)
