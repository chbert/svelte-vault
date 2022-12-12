import type { RequestHandler } from './$types'
import { json as json$1 } from '@sveltejs/kit'
import { supabaseAdminClient } from '$db/server'

const addRepoInfo = async (repo: string, npm: string, category: number) => {
	// remove 'https://www.npmjs.com/package/' from npm
	if (npm && npm.includes('https://www.npmjs.com/package/')) {
		npm = npm.replace('https://www.npmjs.com/package/', '')
	}

	const { error } = await supabaseAdminClient.from('entries').insert({
		repo_url: repo,
		npm_package: npm,
		category: category,
		last_data_update: '2022-01-01 00:00:00'
	})

	if (error) console.log(error)
}

export const GET: RequestHandler = async () => {
	const baseUrl =
		'https://raw.githubusercontent.com/svelte-society/sveltesociety.dev/staging/src/routes'

	const toolsRes = await fetch(`${baseUrl}/tools/tools.json`)
	const tools = await toolsRes.json()

	for await (const tool of tools) {
		addRepoInfo(tool.url, '', 4)
	}

	const componentsRes = await fetch(`${baseUrl}/components/components.json`)
	const components = await componentsRes.json()

	for await (const component of components) {
		addRepoInfo(component.url, component.npm, 3)
	}

	const templatesRes = await fetch(`${baseUrl}/templates/templates.json`)
	const templates = await templatesRes.json()

	for await (const template of templates) {
		addRepoInfo(template.url, '', 2)
	}

	// Return success response 200
	return json$1('Import successfull', { status: 200 })
}
