export const getVideoId = (url: string) => {
	if (url.includes('youtube.com')) {
		// Extract video id from url
		return url.split('v=')[1]
	} else {
		return { error: 'Non-Youtube urls not supported' }
	}
}

export const getVideosSearchQuery = (term: string) => {
	return `title.ilike.%${term}%,channel.ilike.%${term}%,description.ilike.%${term}%`
}

export const formatDuration = (duration: string) => {
	// Format duration from ISO 8601 format to human readable format
	const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/
	const match = duration.match(regex)

	if (!match) return null

	const hours = match[1]
	const minutes = match[2]
	const seconds = match[3]

	if (hours) {
		return `${hours}:${minutes}:${seconds}`
	}
	if (minutes) {
		return `${minutes}:${seconds}`
	}
	if (seconds) {
		return `0:${seconds}`
	}
}
