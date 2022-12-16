import type { RequestHandler } from './$types'

import { json, redirect } from '@sveltejs/kit'
import { getSupabase } from '@supabase/auth-helpers-sveltekit'

import videos from '$api/videos'

export const GET: RequestHandler = async (event) => {
	const { session } = await getSupabase(event)

	if (!session) {
		throw redirect(303, '/')
	}

	videos.add('https://www.youtube.com/watch?v=6NCTwSEltLM')

	// Return success response 200
	return json('Import successfull', { status: 200 })
}
