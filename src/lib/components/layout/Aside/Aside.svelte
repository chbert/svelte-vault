<script lang="ts">
	import * as heroicons from '@steeze-ui/heroicons'
	import { getParams } from '$utils/filter'

	import LinkGroup from '$components/Group/Link'

	export let categories: any[] = []

	$: getCategoryValues = () => {
		const values: any = []
		for (const category of categories) {
			const { name, path, icon } = category
			values.push({ label: name, path: path, href: getParams(path), icon: heroicons[icon] })
		}
		return values
	}

	$: values = getCategoryValues()
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
