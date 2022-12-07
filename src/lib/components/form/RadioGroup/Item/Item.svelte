<script lang="ts">
	import type { ComponentType } from 'svelte'
	import { slugify } from '$utils'

	export let icon: ComponentType
	export let label: string
	export let value: string
	export let counter: number
	export let selected: string
</script>

<input type="radio" id={slugify(label)} class="sr-only" {value} bind:group={selected} />

<label for={slugify(label)}>
	{#if icon}
		<span class="icon">
			<svelte:component this={icon} />
		</span>
	{/if}
	<span>
		{label}
	</span>

	{#if counter}
		<span class="badge">{counter}</span>
	{/if}
</label>

<style lang="postcss">
	input[type='radio'] {
		&:checked + label {
			background-color: var(--primary);
			color: var(--primary-inverse);
		}

		& + label {
			display: flex;
			border-radius: 999rem;
			align-items: center;
			justify-content: space-between;
			padding: 0.5rem 0.5rem;

			&:hover {
				background-color: var(--primary);
				color: var(--primary-inverse);
			}

			& .icon {
				display: flex;
				align-items: center;
				margin-right: 0.75rem;
				width: 1.25rem;
				height: 1.25rem;
			}

			& .badge {
				margin-left: auto;
				padding: 0 0.75rem;
				border-radius: 999rem;
				background-color: var(--muted-color);
				color: var(--muted-color-inverse);
			}
		}
	}
</style>
