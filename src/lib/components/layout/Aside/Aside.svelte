<script lang="ts">
	import LinkGroup from '$components/Group/Link'

	import { BookOpen, Gift, VideoCamera, Document } from '@steeze-ui/heroicons'

	// TODO: User categories from db
	// Radio group categories values
	const values = [
		{ label: 'Packages', href: 'packages', icon: Gift },
		{
			label: 'Repositories',
			href: 'repositories',
			icon: BookOpen
		},
		{ label: 'Articles', href: 'articles', icon: Document },
		{ label: 'Videos', href: 'videos', icon: VideoCamera }
	]
</script>

<div class="aside">
	<LinkGroup legend="Categories" {values} />
</div>

<style lang="postcss">
	:global(.rangeSlider) {
		margin-left: 0 !important;
		margin-right: 0 !important;
	}

	.aside {
		margin-top: 3rem;
		background-color: var(--color-gray-100);

		& section {
			padding: 0.5rem 1rem;
		}

		& .range-slider {
			& .labels {
				display: flex;
				color: var(--muted-color);
				justify-content: space-between;
				margin-top: 0.5rem;
			}
		}
	}
</style>
