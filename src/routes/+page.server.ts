import { fail, json as json$1 } from '@sveltejs/kit'

import type { Actions } from './$types'
import { supabaseAdminClient } from '$db/server'

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await request.formData()
		const url = form.get('url')

		// Regex to validate URL
		const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/
		const urlIsValid = urlRegex.test(String(url))

		if (urlIsValid) {
			const { error } = await supabaseAdminClient.from('submissions').insert({ url: url })
			if (error) return json$1({ error: error?.message }, { status: 500 })
			return { success: true }
		}

		return fail(400, { message: 'Invalid URL' })
	}
}
