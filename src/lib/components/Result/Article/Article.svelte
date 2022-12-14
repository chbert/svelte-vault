<script lang="ts">
	import type { Data } from './types'
	import { formatDuration } from '$utils/videos'

	import { ArrowPath, HandThumbUp, Eye, Clock } from '@steeze-ui/heroicons'
	import { Icon } from '@steeze-ui/svelte-icon'

	import formatDate from '$utils/formatDate'

	import Title from '$components/Title'

	export let data: Data

	const { url, title, description, tags, published_at: publishedAt } = data
</script>

<div class="result">
	<div class="result-header">
		<div class="title">
			<Title size="lg" tag="h3" hasMargin={false}>
				<a href={url}>{title}</a>
			</Title>
			<div class="subtitle">
				<Icon src={ArrowPath} size="16" /> Published
				{`${formatDate(publishedAt, true)}`}
			</div>
		</div>
	</div>
	<div class="result-main">
		<p class="truncate">{@html description}</p>
	</div>
</div>

<!--
	
-->
<style lang="postcss">
	.result {
		overflow: hidden;
		background-color: inherit;
		border-radius: var(--border-radius);
	}

	.result-header {
		padding: var(--element-padding);
		padding-bottom: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;

		& .subtitle {
			color: var(--muted-color);
			font-size: 0.875rem;
			margin-top: 0.125rem;
			display: flex;
			align-items: center;
			gap: 0.5rem;
		}
	}

	.result-main {
		display: flex;
		justify-content: space-between;
		padding: var(--element-padding);
		max-height: 10rem;
	}

	.result-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: var(--element-padding);
		color: var(--muted-color);
		background: var(--muted-color-hover);

		& .start {
			margin-top: 1rem;
		}

		@media (min-width: 1200px) {
			& .start {
				margin-top: 0;
				display: flex;
				align-items: center;
				flex-basis: 0;
				gap: 1rem;
			}

			& .end {
				display: flex;
				flex-basis: 0;
				justify-content: flex-end;
				align-items: center;
				margin-right: -0.5rem; /* compensate for the margin on the copy button */
			}
		}
	}
</style>
