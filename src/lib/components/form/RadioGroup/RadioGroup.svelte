<script lang="ts">
	import { uniqueID } from '$utils'
	import Item from './Item'
	import Title from '$components/Title'

	export let values: any[]
	export let legend: string = ''
	export let selected: any = values[0]?.value
	export let orientation: 'vertical' | 'horizontal' = 'vertical'
</script>

<section
	role="radiogroup"
	aria-labelledby={`label-${uniqueID}`}
	id={`group-${uniqueID}`}
	class={orientation}
>
	{#if legend}
		<legend id={`label-${uniqueID}`}>
			<Title size="sm" transform="uppercase">{legend}</Title>
		</legend>
	{/if}
	{#each values as { icon, label, count, value }}
		<Item
			{icon}
			{label}
			{count}
			{value}
			{orientation}
			iconVariant={selected === value ? 'solid' : 'outline'}
			bind:selected
		/>
	{/each}
</section>

<style lang="postcss">
	section {
		&.vertical {
			margin-bottom: var(--block-spacing-vertical);

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

			& legend {
				margin: 0.5rem 1rem;
			}
		}
	}
</style>
