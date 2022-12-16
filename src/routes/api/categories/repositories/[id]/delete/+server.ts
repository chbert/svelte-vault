import type { RequestHandler } from './$types'
import { json } from '@sveltejs/kit'
import repositories from '$api/repositories'

export const GET: RequestHandler = async ({ params }) => {
	const { id } = params

	const { error } = await repositories.delete(Number(id))
	if (error) return json({ error: error?.message }, { status: 500 })

	return json({ error }, { status: 200 })
}
