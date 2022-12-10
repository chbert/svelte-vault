import { browser } from '$app/environment'
import { goto } from '$app/navigation'

export const updateUrl = (term: string, category: number, days: number, downloads: number) => {
	if (browser) {
		const url = `/?term=${encodeURI(term)}&category=${category}&days=${days}&downloads=${downloads}`

		goto(url)
	}
}
