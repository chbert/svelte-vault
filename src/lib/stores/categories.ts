import { derived } from 'svelte/store'
import { entriesStore, categoriesStore } from '$stores'

const getCount = (data: [], category: number) => {
	return data.filter((entry: any) => entry.category === category).length
}

export const categoryCountsStore: any = derived(
	[entriesStore, categoriesStore],
	([$entries, $categories], set) => {
		let categoryCountsStore: any = {}

		$categories?.forEach((category: any) => {
			categoryCountsStore[category.id] = getCount($entries, category.id)
		})

		return set(categoryCountsStore)
	}
)
