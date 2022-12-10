import { browser } from '$app/environment'
import { goto } from '$app/navigation'

export const updateUrl = (
	term: string,
	sort: string,
	category: number,
	days: number,
	downloads: number
) => {
	if (browser) {
		const url = `/?term=${encodeURI(
			term
		)}&sort=${sort}&category=${category}&days=${days}&downloads=${downloads}`

		goto(url)
	}
}
