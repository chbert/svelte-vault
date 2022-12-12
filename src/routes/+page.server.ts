import { fail, json as json$1 } from '@sveltejs/kit'

import type { Actions } from './$types'
import { supabaseAdminClient } from '$db/server'
import { PRIVATE_TURNSTILE_SECRET_KEY } from '$env/static/private'

interface TokenValidateResponse {
	'error-codes': string[]
	success: boolean
	action: string
	cdata: string
}

async function validateToken(token: string, secret: string) {
	const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
		method: 'POST',
		headers: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		body: new URLSearchParams({
			response: token,
			secret: secret
		})
	})

	const data: TokenValidateResponse = await response.json()

	return {
		// Return the status
		success: data.success,

		// Return the first error if it exists
		error: data['error-codes']?.length ? data['error-codes'][0] : null
	}
}

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await request.formData()
		const url = form.get('url')

		const token = form.get('cf-turnstile-response')
		const { success, error } = await validateToken(token, PRIVATE_TURNSTILE_SECRET_KEY)
		if (!success) return fail(400, { message: error })

		// Regex to validate URL
		const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/
		const urlIsValid = urlRegex.test(String(url))

		if (urlIsValid && success) {
			const { error } = await supabaseAdminClient.from('submissions').insert({ url: url })
			if (error) return json$1({ error: error?.message }, { status: 500 })
			return { success: true }
		}

		return fail(400, { message: 'Invalid URL' })
	}
}
