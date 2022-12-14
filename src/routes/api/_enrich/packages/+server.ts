import { json as json$1 } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

import { updatePackage } from '$api/packages'
import { supabaseClient } from '$db'

export const GET: RequestHandler = async () => {
	const { data, error } = await supabaseClient.from('packages').select('id, url, npm_package')

	if (error) return console.log(error)

	for await (const entry of data) {
		const { id, url, npm_package } = entry
		updatePackage({ id, url, npm_package })
	}

	// Return success response 200
	return json$1('Updated successfull', { status: 200 })
}
