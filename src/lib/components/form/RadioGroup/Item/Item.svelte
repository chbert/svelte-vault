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
	export let orientation: 'vertical' | 'horizontal' = 'vertical'

	$: active = value === selected
</script>

<input type="radio" id={slugify(label)} class="sr-only" {value} bind:group={selected} />

<label for={slugify(label)} class={orientation} class:active>
	<Item {icon} {iconVariant} {count} {active}>{label}</Item>
</label>

<style lang="postcss">
	label {
		border-radius: 999rem;
		transition: all var(--transition);

		&.horizontal {
			margin-right: 0.5rem;
			padding: 0.5rem 1rem;

			&:last-child {
				margin-right: 0;
			}
		}

		&.vertical {
			width: 100%;
			padding: 0.5rem 0.5rem 0.5rem 1rem;
		}

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
