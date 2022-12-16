export const getNpmDownloads = async (npmPackage: string) => {
	let npmDownloadsLastWeek = 0

	// Get last week downloads from npm
	// Replace / with %2F in npm package name
	const npmEncoded = npmPackage?.replace(/\//g, '%2F')

	if (npmEncoded) {
		const npmDownloadsRes = await fetch(
			`https://api.npmjs.org/downloads/range/last-week/${npmEncoded}`
		)
		const npmDownloads = await npmDownloadsRes.json()
		if (npmDownloads.error) console.log('Error :>> ', npmDownloads.error)

		if (!npmDownloads.error) {
			// Sum up all downloads values in downloads inside npmDownloads
			npmDownloadsLastWeek = npmDownloads?.downloads.reduce(
				(acc: number, curr: any) => acc + curr.downloads,
				0
			)
		}
	}

	return npmDownloadsLastWeek
}

export const cleanupNpmPackage = (npmPackage: string) => {
	if (npmPackage.includes('https://www.npmjs.com/package/')) {
		return npmPackage.replace('https://www.npmjs.com/package/', '')
	}
	return npmPackage
}

export const getPackagesSearchQuery = (term: string) => {
	const encodedTerm = encodeURI(term)
	return `title.wfts.%${encodedTerm}%,npm_package.wfts.%${encodedTerm}%,url.wfts.%${encodedTerm}%,description.wfts.%${encodedTerm}%`
}
