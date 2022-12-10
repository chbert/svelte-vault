import { get } from 'svelte/store'
import { browser } from '$app/environment'
import { goto } from '$app/navigation'

import { term, sort, category, days, downloads } from '$stores'

export const updateUrl = () => {
	if (browser) {
		const url = `/?term=${encodeURI(get(term))}&sort=${get(sort)}&category=${get(
			category
		)}&days=${get(days)}&downloads=${get(downloads)}`

		goto(url)
	}
}
