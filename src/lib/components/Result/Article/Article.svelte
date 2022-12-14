<script lang="ts">
	import '../styles.postcss'

	import type { Data } from './types'

	import { ArrowPath } from '@steeze-ui/heroicons'
	import { Icon } from '@steeze-ui/svelte-icon'

	import formatDate from '$utils/formatDate'

	import Title from '$components/Title'
	import Description from '$components/Result/Description'

	export let data: Data

	const { url, title, description, tags, published_at: publishedAt } = data
</script>

<div class="result">
	<div class="result-header">
		<div class="title">
			<Title size="lg" tag="h3" hasMargin={false}>
				<a href={url}>{title}</a>
			</Title>
			{#if publishedAt}
				<div class="subtitle">
					<Icon src={ArrowPath} size="16" /> Published
					{`${formatDate(publishedAt, true)}`}
				</div>
			{/if}
		</div>
	</div>
	<div class="result-main">
		<Description>{@html description}</Description>
	</div>
</div>
