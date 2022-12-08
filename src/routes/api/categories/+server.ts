import { json as json$1 } from '@sveltejs/kit'
import { supabaseAdminClient } from '$db/server'

export const GET = async () => {
	const { data, error } = await supabaseAdminClient.from('categories').select(`*`)
	if (error) return json$1({ error: error?.message }, { status: 500 })

	return json$1({ data, error }, { status: 200 })
}
