import type { LayoutServerLoad } from '../$types'
import { supabaseClient } from '$db'

export const load: LayoutServerLoad = async () => {
	const { data, error } = await supabaseClient
		.from('categories')
		.select(`*`)
		.order('order', { ascending: true })
	if (error) return console.log(error)

	return {
		categories: data
	}
}
