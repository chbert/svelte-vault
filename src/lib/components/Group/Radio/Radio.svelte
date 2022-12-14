<script lang="ts">
	import { createEventDispatcher } from 'svelte'

	import { uniqueID } from '$utils'
	import Item from './Item'
	import Title from '$components/Title'

	export let values: any[]
	export let legend: string = ''
	export let selected: any = values[0]?.value
	export let orientation: 'vertical' | 'horizontal' = 'vertical'
	export let isRadioGroup: boolean = true

	const dispatch = createEventDispatcher()

	const onItemChange = () => {
		dispatch('change', selected)
	}
</script>

<section
	role={isRadioGroup ? 'radiogroup' : 'group'}
	aria-labelledby={`label-${uniqueID}`}
	id={`group-${uniqueID}`}
	class={orientation}
>
	{#if legend}
		<legend id={`label-${uniqueID}`}>
			<Title size="sm" transform="uppercase">{legend}</Title>
		</legend>
	{/if}
	{#each values as { icon, label, count, href, value }}
		<Item
			{icon}
			{label}
			{count}
			{value}
			{orientation}
			iconVariant={selected === value ? 'solid' : 'outline'}
			bind:selected
			on:change={onItemChange}
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
			margin-bottom: 0;

			& legend {
				margin: 0.5rem 1rem;
			}
		}
	}
</style>
