import type { RequestHandler } from './$types'

import { json, redirect } from '@sveltejs/kit'
import { getSupabase } from '@supabase/auth-helpers-sveltekit'

import videos from '$api/videos'
import { GOOGLE_API_KEY } from '$env/static/private'

const apiKey = GOOGLE_API_KEY

export const GET: RequestHandler = async (event) => {
	const { session } = await getSupabase(event)

	if (!session) {
		throw redirect(303, '/')
	}

	const channelId = encodeURI(event.params.channelId)
	const searchTerm = encodeURI(event.params.searchterm)

	// Get all youtube video urls from channel
	const url = `https://www.googleapis.com/youtube/v3/search?channelId=${channelId}&q=${searchTerm}&order=date&part=id&type=video&maxResults=50&type=video&key=${apiKey}`

	const res = await fetch(url)
	const data = await res.json()

	for await (const item of data.items) {
		await videos.add(`https://www.youtube.com/watch?v=${item.id.videoId}`)
	}

	// Return success response 200
	return json('Import successfull', { status: 200 })
}
