import type { Load } from '@sveltejs/kit'

export const load: Load = async ({ fetch }) => {
	const res = await fetch(`/api/entries`)
	const { data, error } = await res.json()

	if (data) {
		return {
			entries: data
		}
	}

	throw error(500, error.message)
}
