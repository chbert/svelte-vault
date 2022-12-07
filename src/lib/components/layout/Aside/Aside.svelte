<script lang="ts">
	import Item from '$components/form/RadioGroup/Item'
	import RadioGroup from '$components/form/RadioGroup/RadioGroup.svelte'

	import WenchScrewdriver from '$components/icon/WenchScrewdriver'
	import Square3Stack3d from '$components/icon/Square3Stack3d'
	import BookOpen from '$components/icon/BookOpen'
	import Document from '$components/icon/Document'
	import Squares2x2 from '$components/icon/Squares2x2'

	const values = [
		{ label: 'All', value: '1', icon: Squares2x2, counter: 1 },
		{ label: 'Repositories', value: '2', icon: BookOpen, counter: 2 },
		{ label: 'Templates', value: '3', icon: Document, counter: 3 },
		{ label: 'Components', value: '4', icon: WenchScrewdriver, counter: 4 },
		{ label: 'Tools', value: '6', icon: Square3Stack3d, counter: 5 }
	]
</script>

<div class="aside">
	<h2 class="title">Filters</h2>

	<RadioGroup legend="Categories" {values} />
</div>

<div>
	<h3 class="label">Last updated</h3>
</div>

<style lang="postcss">
	.aside {
		margin-top: 2rem;
		background-color: var(--color-gray-100);
	}

	.title {
		font-size: 1.25rem;
		font-weight: 600;
		margin-bottom: 1rem;
	}
</style>
