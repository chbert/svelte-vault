<script lang="ts">
	import * as heroicons from '@steeze-ui/heroicons'
	import params from '$utils/params'

	import LinkGroup from '$components/Group/Link'

	export let categories: any[] = []

	$: getCategoryValues = () => {
		const values: any = []
		for (const category of categories) {
			const { name, path, icon } = category
			values.push({ label: name, path: path, href: params.get(path), icon: heroicons[icon] })
		}
		return values
	}

	$: values = getCategoryValues()
</script>

<div class="aside">
	<LinkGroup legend="Categories" {values} />
</div>

<style lang="postcss">
	.aside {
		margin-top: 3rem;
		background-color: var(--color-gray-100);
	}
</style>
