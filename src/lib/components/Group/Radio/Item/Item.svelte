<script lang="ts">
	import type { ComponentType } from 'svelte'
	import { slugify } from '$utils'
	import Item from '$components/Item'

	export let icon: ComponentType
	export let label: string
	export let value: string = ''
	export let href: string = ''
	export let count: number
	export let selected: string
	export let iconVariant: 'outline' | 'solid' | 'mini'
	export let orientation: 'vertical' | 'horizontal' = 'vertical'

	$: active = value === selected
</script>

{#if !href}
	<input type="radio" id={slugify(label)} class="sr-only" {value} bind:group={selected} on:change />
{/if}

<label for={slugify(label)} class={orientation} class:active>
	<Item {icon} {iconVariant} {href} {count} {active} {orientation}>{label}</Item>
</label>
