import type { RequestHandler } from './$types'

import { json, redirect } from '@sveltejs/kit'
import { getSupabase } from '@supabase/auth-helpers-sveltekit'

import packages from '$api/packages'
import { supabaseClient } from '$db'

export const GET: RequestHandler = async (event) => {
	const { session } = await getSupabase(event)

	if (!session) {
		throw redirect(303, '/')
	}

	const { data, error } = await supabaseClient.from('packages').select('id, url, npm_package')

	if (error) return console.log(error)

	for await (const entry of data) {
		const { id, url, npm_package } = entry
		packages.update({ id, url, npm_package })
	}

	// Return success response 200
	return json('Updated successfull', { status: 200 })
}
