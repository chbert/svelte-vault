import { json as json$1 } from '@sveltejs/kit'
import { supabaseAdminClient } from '$db/server'

export const GET = async () => {
	const { data, error } = await supabaseAdminClient.from('categories').select(`*`)
	if (error) return json$1({ error: error?.message }, { status: 500 })

	const categories: any[] = await data.map((category) => category.path)
	const categoriesCounts = async () => {
		let counts: any[] = []

		for await (const category of categories) {
			const { data, error } = await supabaseAdminClient.from(category).select(`count(*)`)
			if (error) return json$1({ error: error?.message }, { status: 500 })

			counts.push({ [category]: data[0].count })
		}

		return counts
	}

	return json$1({ data, categoriesCounts, error }, { status: 200 })
}
