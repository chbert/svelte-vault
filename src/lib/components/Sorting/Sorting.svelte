<script lang="ts">
	import './styles.postcss'

	import Packages from '$components/Sorting/Packages'
	import Repositories from '$components/Sorting/Repositories'

	export let category: string

	const sortings = [
		{ category: 'packages', component: Packages },
		{ category: 'repositories', component: Repositories }
	]
	const Component = sortings.find((sorting) => sorting.category === category)?.component
</script>

<svelte:component this={Component} />
