import { get } from 'svelte/store'
import { browser } from '$app/environment'
import { goto } from '$app/navigation'

import {
	termStore,
	sortStore,
	pageStore,
	pageSizeStore,
	categoryStore,
	daysStore,
	downloadsStore
} from '$stores'

export const updateParams = () => {
	if (browser) {
		const url = `/?term=${encodeURI(get(termStore))}&sort=${get(sortStore)}&page=${get(
			pageStore
		)}&pagesize=${get(pageSizeStore)}&category=${get(categoryStore)}&days=${get(
			daysStore
		)}&downloads=${get(downloadsStore)}`

		goto(url, { invalidateAll: true })
	}
}

export const resetParams = () => {
	if (browser) {
		const url = `/?term=&sort=full_name&page=1&pagesize=${get(
			pageSizeStore
		)}&category=0&days=-1&downloads=-1`

		goto(url, { invalidateAll: true })
	}
}
