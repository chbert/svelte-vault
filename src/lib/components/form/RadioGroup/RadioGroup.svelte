<script lang="ts">
	import { uniqueID } from '$utils'
	import Item from './Item'

	export let values: any[]
	export let legend: string
	export let selected: any = values[0]?.value
</script>

<div role="radiogroup" aria-labelledby={`label-${uniqueID}`} id={`group-${uniqueID}`}>
	{#if legend}
		<legend id={`label-${uniqueID}`} class="label">{legend}</legend>
	{/if}
	{#each values as { icon, label, counter, value }}
		<Item {icon} {label} {counter} {value} bind:selected />
	{/each}
</div>
