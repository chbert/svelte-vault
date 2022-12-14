import { redirect } from '@sveltejs/kit'

export const GET = async () => {
	return redirect(302, '/packages')
}
