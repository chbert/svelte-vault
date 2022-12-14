import { get } from 'svelte/store'
import { browser } from '$app/environment'
import { goto } from '$app/navigation'
import { page } from '$app/stores'

import { sortStore, pageSizeStore, daysStore, downloadsStore, termStore } from '$stores'

export const getParams = (category: string) => {
	if (browser) {
		let url = new URL(`/${category}`, get(page).url)

		url?.searchParams?.set('term', encodeURI(get(termStore)))
		url?.searchParams?.set('sort', get(sortStore))
		url?.searchParams?.set('page', '1')
		url?.searchParams?.set('pagesize', get(pageSizeStore).toString())
		url?.searchParams?.set('days', get(daysStore).toString())
		if (category === 'packages') url?.searchParams?.set('downloads', get(downloadsStore).toString())

		console.log('url.href :>> ', url.href)

		return url.href
	}
}

export const updateParams = (category: string) => {
	if (browser) {
		get(page).url.searchParams.set('term', encodeURI(get(termStore)))
		get(page).url.searchParams.set('sort', get(sortStore))
		get(page).url.searchParams.set('page', '1')
		get(page).url.searchParams.set('pagesize', String(get(pageSizeStore)))
		get(page).url.searchParams.set('days', String(get(daysStore)))

		if (category === 'packages')
			get(page).url.searchParams.set('downloads', String(get(downloadsStore)))

		goto(`/${category}?${get(page).url.searchParams.toString()}`, {
			invalidateAll: true
		})
	}
}

export const resetParams = () => {
	if (browser) {
		get(page).url.searchParams.set('term', '')
		get(page).url.searchParams.set('sort', 'title')
		get(page).url.searchParams.set('page', '1')
		get(page).url.searchParams.set('pagesize', String(get(pageSizeStore)))
		get(page).url.searchParams.set('days', '-1')
		get(page).url.searchParams.set('downloads', '-1')

		termStore.set('')

		goto(`/${get(page).params.category}?${get(page).url.searchParams.toString()}`, {
			invalidateAll: true
		})
	}
}
