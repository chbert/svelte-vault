<script lang="ts">
	import './Sorting.postcss'

	import Packages from '$components/Sorting/Packages'
	import Repositories from '$components/Sorting/Repositories'
	import Videos from '$components/Sorting/Videos'
	import Articles from '$components/Sorting/Videos'

	export let category: string

	const sortings = [
		{ category: 'packages', component: Packages },
		{ category: 'repositories', component: Repositories },
		{ category: 'videos', component: Videos },
		{ category: 'articles', component: Articles }
	]
	const Component = sortings.find((sorting) => sorting.category === category)?.component
</script>

<svelte:component this={Component} />
