import { supabaseAdminClient } from '$db/server'

import { GOOGLE_API_KEY } from '$env/static/private'
import { getPagination } from '$utils/pagination'
import { getVideoId, getVideosSearchQuery } from '$utils/videos'

const apiKey = GOOGLE_API_KEY
const baseUrl = `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&part=snippet,statistics,contentDetails`

const videos = {
	// Get all videos
	getAll: async ({
		select = '*',
		term = '',
		sort = 'title',
		ascending = true,
		views = -1,
		likes = -1,
		days = -1,
		paginate = true,
		page = 1,
		pageSize = 10
	}) => {
		let from = 0
		let to = -1

		if (paginate) {
			const pagination = getPagination(page, pageSize)
			from = pagination.from
			to = pagination.to
		}

		term = decodeURI(term)

		let publishedAfter = new Date().getTime() - 1000 * 60 * 60 * 24 * days

		let query = supabaseAdminClient
			.from('videos')
			.select(select, { count: 'exact' })
			.or(getVideosSearchQuery(term))
			.order(sort, { ascending: ascending })

		if (days > -1) query = query.lt('published_at', publishedAfter)
		if (views > -1) query = query.gt('views', views)
		if (likes > -1) query = query.gt('likes', likes)

		if (paginate) query = query.range(from, to)

		return await query
	},

	// Add a video
	add: async (url: string) => {
		const id = getVideoId(url)
		const response = await fetch(`${baseUrl}&id=${id}`)
		const data = await response.json()

		if (data.items.length) {
			const videoInfo = data.items[0]

			const { error } = await supabaseAdminClient.from('videos').insert({
				url,
				video: id,
				title: videoInfo.snippet.title,
				channel: videoInfo.snippet.channelId,
				description: videoInfo.snippet.description,
				thumbnail: videoInfo.snippet.thumbnails.default.url,
				published_at: videoInfo.snippet.publishedAt,
				duration: videoInfo.contentDetails.duration,
				views: videoInfo.statistics.viewCount,
				likes: videoInfo.statistics.likeCount,
				hashtags: videoInfo.snippet.tags
			})
			if (error) console.log(error)

			return { success: !error }
		}
	},

	// Update a video
	update: async (video: string) => {
		const response = await fetch(`${baseUrl}&id=${video}`)
		const data = await response.json()
		const videoInfo = data.items[0]

		const { error } = await supabaseAdminClient
			.from('videos')
			.update({
				title: videoInfo.snippet.title,
				channel: videoInfo.snippet.channelId,
				description: videoInfo.snippet.description,
				thumbnail: videoInfo.snippet.thumbnails.high.url,
				published_at: videoInfo.snippet.publishedAt,
				duration: videoInfo.contentDetails.duration,
				views: videoInfo.statistics.viewCount,
				likes: videoInfo.statistics.likeCount,
				hashtags: videoInfo.snippet.tags
			})
			.eq('video', video)
		if (error) console.log(error)

		return { success: !error }
	}
}

export default videos
