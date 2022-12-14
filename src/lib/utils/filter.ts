import { get } from 'svelte/store'
import { browser } from '$app/environment'
import { goto } from '$app/navigation'
import { page } from '$app/stores'

import { sortStore, pageSizeStore, daysStore, downloadsStore, termStore } from '$stores'

export const updateParams = () => {
	if (browser) {
		const url = `${get(page).params.category}/?term=${encodeURI(get(termStore))}&sort=${get(
			sortStore
		)}&page=1&pagesize=${get(pageSizeStore)}&days=${get(daysStore)}&downloads=${get(
			downloadsStore
		)}`

		goto(url, { invalidateAll: true })
	}
}

export const resetParams = () => {
	if (browser) {
		const url = `/?term=&sort=title&page=1&pagesize=${get(pageSizeStore)}&days=-1&downloads=-1`

		termStore.set('')

		goto(url, { invalidateAll: true })
	}
}
