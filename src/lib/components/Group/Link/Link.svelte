<script lang="ts">
	import { browser } from '$app/environment'
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'

	import Item from '$components/Item'
	import Title from '$components/Title'
	import { getParams } from '$utils/filter'

	export let values: any[]
	export let legend: string = ''
	export let orientation: 'vertical' | 'horizontal' = 'vertical'

	const onItemClick = async (href: string) => {
		const url = await getParams(href)
		goto(url)
	}
</script>

<section class={orientation}>
	{#if legend}
		<legend>
			<Title size="sm" transform="uppercase">{legend}</Title>
		</legend>
	{/if}
	{#each values as { icon, label, count, path, href }}
		{@const active = $page.params.category === path}
		<span class="item">
			<Item
				tag="a"
				{icon}
				{count}
				{active}
				iconVariant={active ? 'solid' : 'outline'}
				on:click={() => onItemClick(href)}
			>
				{label}
			</Item>
		</span>
	{/each}
</section>

<style lang="postcss">
	section {
		&.vertical {
			margin-bottom: var(--block-spacing-vertical);
			cursor: pointer;

			& legend {
				margin: 0.5rem 1rem;
			}
		}

		&.horizontal {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: flex-start;
			align-items: center;
			align-content: center;
			margin-bottom: 0;

			& legend {
				margin: 0.5rem 1rem;
			}
		}
	}
</style>
