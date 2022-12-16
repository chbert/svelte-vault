<script lang="ts">
	import { Gift, BookOpen, VideoCamera, Document } from '@steeze-ui/heroicons'
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
				icon:
					icon === 'Gift'
						? Gift
						: icon === 'BookOpen'
						? BookOpen
						: icon === 'VideoCamera'
						? VideoCamera
						: icon === 'Document'
						? Document
						: null,
				count: count || 0
			})
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
