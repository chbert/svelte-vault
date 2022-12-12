import type { RequestHandler } from './$types'
import { json as json$1 } from '@sveltejs/kit'
import { supabaseClient } from '$db'

import { Octokit } from 'octokit'
import { throttling } from '@octokit/plugin-throttling'

import { env } from '$env/dynamic/private'

const token = env.PRIVATE_GITHUB_TOKEN

const VaultOctokit = Octokit.plugin(throttling)
const octokit = new VaultOctokit({
	auth: token,
	throttle: {
		onRateLimit: (
			retryAfter: any,
			options: { method: any; url: any },
			octokit: { log: { warn: (arg0: string) => void; info: (arg0: string) => void } },
			retryCount: number
		) => {
			octokit.log.warn(`Request quota exhausted for request ${options.method} ${options.url}`)

			if (retryCount < 1) {
				// only retries once
				octokit.log.info(`Retrying after ${retryAfter} seconds!`)
				return true
			}
		},
		onSecondaryRateLimit: (
			retryAfter: any,
			options: { method: any; url: any },
			octokit: { log: { warn: (arg0: string) => void } }
		) => {
			// does not retry, only logs a warning
			octokit.log.warn(`SecondaryRateLimit detected for request ${options.method} ${options.url}`)
		}
	},
	log: console
})

const enrichRepoInfo = async (entry: any) => {
	// Get domain from url
	const domain = entry.repo_url.split('/')[2]

	if (domain === 'github.com') {
		// Get owner and repo from url
		const owner = entry.repo_url.split('/')[3]
		const repo = entry.repo_url.split('/')[4]

		if (owner && repo) {
			try {
				const response = await octokit.request('GET /repos/{owner}/{repo}', {
					owner,
					repo
				})

				if (response.status === 200) {
					const { data } = response

					if (data) {
						const { error } = await supabaseClient
							.from('entries')
							.update({
								stars: data.stargazers_count,
								open_issues: data.open_issues_count,
								full_name: data.full_name,
								description: data?.description,
								repo_updated_at: data.updated_at,
								homepage: data?.homepage,
								license: JSON.stringify(data.license),
								repo_url: entry.repo_url,
								last_data_update: new Date()
							})
							.eq('id', entry.id)
						if (error) console.log(error)
					}
				}
			} catch (error) {
				console.log(error)
			}
		}
	}
}

export const GET: RequestHandler = async () => {
	const { data, error } = await supabaseAdminClient.from('entries').select('*')
	if (error) console.log(error)

	if (data) {
		for await (const entry of data) {
			enrichRepoInfo(entry)
		}
	}

	// Return success response 200
	return json$1({ data }, { status: 200 })
}
