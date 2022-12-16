import type { Actions } from './$types'

import { fail, json } from '@sveltejs/kit'

import { supabaseAdminClient } from '$db/server'
import articles from '$api/articles'
import repositories from '$api/repositories'
import videos from '$api/videos'
import packages from '$api/packages'

export const actions: Actions = {
	add: async ({ request }) => {
		const data = await request.formData()

		// Category validation
		const category = String(data.get('category'))
		if (!category) {
			return fail(400, { category, missingCategory: true })
		}

		// Url validation
		const repositoryUrl = String(data.get('repositoryUrl'))
		const npmPackage = String(data.get('npmPackage'))
		const videoUrl = String(data.get('videoUrl'))
		const articleUrl = String(data.get('articleUrl'))
		const articleTitle = String(data.get('articleTitle'))
		const articleDescription = String(data.get('articleDescription'))

		if (category === 'repositories' || category === 'packages') {
			if (!repositoryUrl) {
				return fail(400, { repositoryUrl, missingRepositoryUrl: true })
			}
		}

		if (category === 'packages' && !npmPackage) {
			return fail(400, { npmPackage, missingNpmPackage: true })
		}

		if (category === 'videos' && !videoUrl) {
			return fail(400, { videoUrl, missingVideoUrl: true })
		}

		if (category === 'articles') {
			if (!articleUrl) {
				return fail(400, { articleUrl, missingArticleUrl: true })
			}
			if (!articleTitle) {
				return fail(400, { articleTitle, missingArticleTitle: true })
			}
			if (!articleDescription) {
				return fail(400, { articleDescription, missingArticleDescription: true })
			}
		}

		switch (category) {
			case 'videos':
				videos.add(videoUrl)
				break
			case 'repositories':
				repositories.add(repositoryUrl)
				break
			case 'packages':
				packages.add(repositoryUrl, npmPackage)
		}

		return { success: true }
	}
}
