<script lang="ts">
	import Packages from '$components/Sorting/Packages'

	export let category: string

	const sortings = [{ category: 'packages', component: Packages }]
	const Component = sortings.find((sorting) => sorting.category === category)?.component
</script>

<svelte:component this={Component} />
