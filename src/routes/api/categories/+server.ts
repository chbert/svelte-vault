import { json } from '@sveltejs/kit'
import { supabaseAdminClient } from '$db/server'

export const GET = async () => {
	const { data, error } = await supabaseAdminClient.from('categories').select(`*`)
	if (error) return json({ error: error?.message }, { status: 500 })

	return json({ data, error }, { status: 200 })
}
