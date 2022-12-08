<script lang="ts">
	import { categoryCounts, entriesStore } from '$stores/categories'

	import Title from '$components/Title'
	import RadioGroup from '$components/form/RadioGroup'

	import {
		WrenchScrewdriver,
		BookOpen,
		Document,
		Squares2x2,
		Square3Stack3d
	} from '@steeze-ui/heroicons'

	const values = [
		{ label: 'All', value: 'all', icon: Square3Stack3d, count: $entriesStore.length },
		{
			label: 'Repositories',
			value: 'repositories',
			icon: BookOpen,
			count: $categoryCounts['repositories']
		},
		{ label: 'Templates', value: 'templates', icon: Document, count: $categoryCounts['templates'] },
		{
			label: 'Components',
			value: 'components',
			icon: Squares2x2,
			count: $categoryCounts['components']
		},
		{ label: 'Tools', value: 'tools', icon: WrenchScrewdriver, count: $categoryCounts['tools'] }
	]
</script>

<div class="aside">
	<section>
		<Title tag="h2" size="lg" color="muted">Filters</Title>
	</section>

	<RadioGroup legend="Categories" {values} />

	<section>
		<Title size="sm" transform="uppercase">Last updated</Title>
	</section>
</div>

<style lang="postcss">
	.aside {
		margin-top: 1.5rem;
		background-color: var(--color-gray-100);

		& section {
			padding-left: 1rem;
			padding-right: 1rem;
		}
	}
</style>
