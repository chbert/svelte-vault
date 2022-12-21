<script lang="ts">
	import params from '$utils/params'

	import LinkGroup from '$components/Group/Link'

	export let categories: any[] = []
	export let counts: any[] = []

	$: getCategoryValues = () => {
		const values: any = []
		for (const category of categories) {
			const { name, path, icon } = category
			const count = counts.find((count) => count.name === name).count || 0

			values.push({
				label: name,
				path: path,
				href: params.get(path),
				icon: icon,
				count: count || 0
			})
		}
		return values
	}

	$: values = getCategoryValues()
</script>

<div class="aside">
	<LinkGroup legend="Categories" {values} reload="" />
</div>

<style lang="postcss">
	.aside {
		margin-top: 3rem;
		background-color: var(--color-gray-100);
	}
</style>
