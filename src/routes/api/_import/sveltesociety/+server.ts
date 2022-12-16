import type { RequestHandler } from './$types'

import { json, redirect } from '@sveltejs/kit'
import { getSupabase } from '@supabase/auth-helpers-sveltekit'

import packages from '$api/packages'
import repositories from '$api/repositories'

export const GET: RequestHandler = async (event) => {
	const { session } = await getSupabase(event)

	if (!session) {
		throw redirect(303, '/')
	}

	const baseUrl =
		'https://raw.githubusercontent.com/svelte-society/sveltesociety.dev/staging/src/routes'

	const toolsRes = await fetch(`${baseUrl}/tools/tools.json`)
	const tools = await toolsRes.json()

	for await (const tool of tools) {
		repositories.add(tool.url)
	}

	const templatesRes = await fetch(`${baseUrl}/templates/templates.json`)
	const templates = await templatesRes.json()

	for await (const template of templates) {
		repositories.add(template.url)
	}

	const componentsRes = await fetch(`${baseUrl}/components/components.json`)
	const components = await componentsRes.json()

	for await (const component of components) {
		if (component.npm) {
			packages.add(component.url, component.npm)
		}
	}

	// Return success response 200
	return json('Import successfull', { status: 200 })
}
