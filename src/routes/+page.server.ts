import { fail, json as json$1 } from '@sveltejs/kit'

import type { Actions } from './$types'
import { supabaseAdminClient } from '$db/server'
import { PRIVATE_TURNSTILE_SECRET_KEY } from '$env/static/private'

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await request.formData()
		const url = form.get('url')

		const token = String(form.get('cf-turnstile-response'))
		const ip = String(request.headers.get('CF-Connecting-IP'))

		form.append('secret', PRIVATE_TURNSTILE_SECRET_KEY)
		form.append('response', token)
		form.append('remoteip', ip)

		const turnstileUrl = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'
		const result = await fetch(turnstileUrl, {
			body: form,
			method: 'POST'
		})

		const outcome = await result.json()

		console.log('outcome :>> ', outcome)

		// Regex to validate URL
		const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/
		const urlIsValid = urlRegex.test(String(url))

		if (urlIsValid && outcome.success) {
			const { error } = await supabaseAdminClient.from('submissions').insert({ url: url })
			if (error) return json$1({ error: error?.message }, { status: 500 })
			return { success: true }
		}

		return fail(400, { message: 'Invalid URL' })
	}
}
