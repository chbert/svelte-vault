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

	return { domain, provider: '', owner: '', repo: '', subRepo: '' }
}

export const getRepositoriesSearchQuery = (term: string) => {
	const encodedTerm = encodeURI(term)
	return `title.fts.%${encodedTerm}%,url.fts.%${encodedTerm}%,description.fts.%${encodedTerm}%`
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
		repo_updated_at: null,
		license: {},
		url: url
	}
}
