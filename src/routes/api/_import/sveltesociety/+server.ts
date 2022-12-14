import { json as json$1 } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

import { addPackage } from '$api/packages'
import { addRepository } from '$api/repositories'

export const GET: RequestHandler = async () => {
	const baseUrl =
		'https://raw.githubusercontent.com/svelte-society/sveltesociety.dev/staging/src/routes'

	const toolsRes = await fetch(`${baseUrl}/tools/tools.json`)
	const tools = await toolsRes.json()

	for await (const tool of tools) {
		addRepository(tool.url)
	}

	const templatesRes = await fetch(`${baseUrl}/templates/templates.json`)
	const templates = await templatesRes.json()

	for await (const template of templates) {
		addRepository(template.url)
	}

	const componentsRes = await fetch(`${baseUrl}/components/components.json`)
	const components = await componentsRes.json()

	for await (const component of components) {
		if (component.npm) {
			addPackage(component.url, component.npm)
		}
	}

	// Return success response 200
	return json$1('Import successfull', { status: 200 })
}
