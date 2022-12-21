<script lang="ts">
	import '../Result.postcss'

	import type { Data } from './types'

	import formatDate from '$utils/formatDate'

	import Title from '$components/Title'
	import Description from '$components/Result/Description'
	import Badge from '$components/Badge'
	import Delete from '$components/Result/Delete'

	export let data: Data

	const { id, url, title, description, tags, published_at: publishedAt } = data
</script>

<div class="result">
	<div class="result-header">
		<div class="title">
			<Title size="lg" tag="h3" hasMargin={false}>
				<a href={url}>{title}</a>
			</Title>
			{#if publishedAt}
				<div class="subtitle">
					<iconify-icon icon="heroicons:arrow-path" /> Published
					{`${formatDate(publishedAt, true)}`}
				</div>
			{/if}
		</div>
		<Delete {id} />
	</div>
	<div class="result-main">
		<div>
			{#if description}
				<Description>{@html description}</Description>
			{/if}
			{#if tags}
				{#each tags as tag}
					<Badge>
						{tag}
					</Badge>
				{/each}
			{/if}
		</div>
	</div>
</div>
