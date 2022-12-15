<script lang="ts">
	import '../styles.postcss'

	import type { Data } from './types'
	import { formatDuration } from '$utils/videos'

	import { ArrowPath, HandThumbUp, Eye, Clock } from '@steeze-ui/heroicons'
	import { Icon } from '@steeze-ui/svelte-icon'

	import formatDate from '$utils/formatDate'

	import Item from '$components/Item'
	import Title from '$components/Title'
	import Badge from '$components/Badge'
	import Description from '$components/Result/Description'

	export let data: Data

	const orientation = 'horizontal'

	const {
		url,
		views,
		title,
		description,
		hashtags,
		channel,
		published_at: publishedAt,
		thumbnail,
		duration,
		likes
	} = data
</script>

<div class="result">
	<div class="row">
		<div class="col-xl-3">
			<a href={url} alt={title} target="_blank" rel="noreferrer">
				<img src={thumbnail} alt={title} />
			</a>
		</div>
		<div class="col-xl-9">
			<div class="result-header">
				<div class="title">
					<Title size="lg" tag="h3" hasMargin={false}>
						<a href={url} target="_blank" rel="noreferrer">{title}</a>
					</Title>
					<div class="subtitle">
						<Icon src={ArrowPath} size="16" /> Uploaded
						{`${formatDate(publishedAt, true)}`}
					</div>
				</div>
			</div>

			<div class="result-main">
				<div>
					{#if description}
						<Description>{@html description}</Description>
					{/if}
					{#if hashtags}
						{#each hashtags as hashtag}
							<Badge href={`https://www.youtube.com/results?search_query=${hashtag}`}>
								#{hashtag}
							</Badge>
						{/each}
					{/if}
				</div>
			</div>
		</div>
	</div>

	<div class="result-footer">
		<div class="start">
			<Item icon={HandThumbUp} {orientation}>{likes.toLocaleString()} likes</Item>
			<Item icon={Eye} {orientation}>{views.toLocaleString()} views</Item>
			<Item icon={Clock} {orientation}>{formatDuration(duration)}</Item>
		</div>
	</div>
</div>
