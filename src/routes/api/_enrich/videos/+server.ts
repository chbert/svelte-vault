import { json as json$1 } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

import { addVideo } from '$utils/videos'

export const GET: RequestHandler = async () => {
	addVideo('https://www.youtube.com/watch?v=6NCTwSEltLM')

	// Return success response 200
	return json$1('Import successfull', { status: 200 })
}
