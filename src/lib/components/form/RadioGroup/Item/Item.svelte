<script lang="ts">
	import type { ComponentType } from 'svelte'
	import { slugify } from '$utils'
	import Item from '$components/Item'

	export let icon: ComponentType
	export let label: string
	export let value: string
	export let count: number
	export let selected: string
	export let iconVariant: 'outline' | 'solid' | 'mini'

	$: active = value === selected
</script>

<input type="radio" id={slugify(label)} class="sr-only" {value} bind:group={selected} />

<label for={slugify(label)} class:active>
	<Item {icon} {iconVariant} {count} {active}>{label}</Item>
</label>

<style lang="postcss">
	label {
		width: 100%;
		border-radius: 999rem;
		padding: 0.5rem 0.5rem 0.5rem 1rem;

		&:hover {
			background-color: var(--muted-color-hover);
		}

		&.active {
			background-color: var(--muted-color-hover);

			& .label {
				font-weight: 600;
			}

			&:hover {
				background-color: var(--muted-color-focus);
			}
		}
	}
</style>
