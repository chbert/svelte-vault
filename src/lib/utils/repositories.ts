export const splitRepoUrl = (url: string) => {
	const domain = url.split('/')[2]

	if (domain === 'github.com' || domain === 'gitlab.com' || domain === 'bitbucket.org') {
		const provider = url.split('/')[2].split('.')[0]
		const owner = url.split('/')[3]
		const repo = url.split('/')[4]

		// Get subrepo from rest of url
		const sub_repo = url.split('/').slice(5).join('/')

		return { domain, provider, owner, repo, sub_repo }
	}

	return { domain, provider: null, owner: null, repo: null, subRepo: null }
}

export const getEmptyRepoObject = (status: number, repo: string = '', url: string) => {
	return {
		status,
		title: repo,
		description: '',
		avatar: '',
		homepage: '',
		stars: 0,
		open_issues: 0,
		topics: [],
		updated_at: null,
		license: {},
		url: url
	}
}
