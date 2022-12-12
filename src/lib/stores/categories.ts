import { derived } from 'svelte/store'
import { categoriesEntriesStore, categoriesStore } from '$stores'

const getCount = (data: [], category: number) => {
	return data.filter((entry: any) => entry.category === category).length
}

export const categoryCountsStore: any = derived(
	[categoriesEntriesStore, categoriesStore],
	([$categoriesEntriesStore, $categories], set) => {
		let categoryCountsStore: any = {}

		$categories?.forEach((category: any) => {
			categoryCountsStore[category.id] = getCount($categoriesEntriesStore, category.id)
		})

		return set(categoryCountsStore)
	}
)
