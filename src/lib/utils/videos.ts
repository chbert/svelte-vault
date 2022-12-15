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
	const [hours, minutes, seconds] = duration
		.replace('PT', '')
		.replace('H', ':')
		.replace('M', ':')
		.replace('S', '')
		.split(':')
		.map((time) => parseInt(time))

	if (hours) {
		return `${hours}h ${minutes}m ${seconds}s`
	} else if (minutes) {
		return `${minutes}m ${seconds}s`
	} else {
		return `${seconds}s`
	}
}
