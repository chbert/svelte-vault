export const getArticlesSearchQuery = (term: string) => {
	return `title.ilike.%${term}%,description.ilike.%${term}%`
}
