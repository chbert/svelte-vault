<script lang="ts">
	import Packages from '$components/Filters/Packages'
	import Repositories from '$components/Filters/Repositories'
	import Videos from '$components/Filters/Videos'

	export let category: string

	const filters = [
		{ category: 'packages', component: Packages },
		{ category: 'repositories', component: Repositories },
		{ category: 'videos', component: Videos }
	]
	const Component = filters.find((filter) => filter.category === category)?.component
</script>

<svelte:component this={Component} {category} />
