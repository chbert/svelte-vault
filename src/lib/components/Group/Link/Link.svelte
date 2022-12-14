<script lang="ts">
	import { page } from '$app/stores'

	import Item from '$components/Item'
	import Title from '$components/Title'

	export let values: any[]
	export let legend: string = ''
	export let orientation: 'vertical' | 'horizontal' = 'vertical'
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
			<Item tag="a" {icon} {count} {active} {href} iconVariant={active ? 'solid' : 'outline'}>
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
