export const getArticlesSearchQuery = (term: string) => {
	const encodedTerm = encodeURI(term)
	return `title.fts.%${encodedTerm}%,description.fts.%${encodedTerm}%`
}
