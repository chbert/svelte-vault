<script lang="ts">
	import { uniqueID } from '$utils'
	import Item from './Item'
	import Title from '$components/Title'

	export let values: any[]
	export let legend: string
	export let selected: any = values[0]?.value
</script>

<section role="radiogroup" aria-labelledby={`label-${uniqueID}`} id={`group-${uniqueID}`}>
	{#if legend}
		<legend id={`label-${uniqueID}`}>
			<Title size="sm" transform="uppercase">{legend}</Title>
		</legend>
	{/if}
	{#each values as { icon, label, counter, value }}
		<Item
			{icon}
			{label}
			{counter}
			{value}
			iconVariant={selected === value ? 'solid' : 'outline'}
			bind:selected
		/>
	{/each}
</section>

<style lang="postcss">
	section {
		margin-bottom: var(--block-spacing-vertical);

		& legend {
			margin: 2rem 1rem 0.5rem 1rem;
		}
	}
</style>
