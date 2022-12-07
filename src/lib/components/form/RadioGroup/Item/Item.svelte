<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon'

	import type { ComponentType } from 'svelte'
	import { slugify } from '$utils'

	export let icon: ComponentType
	export let label: string
	export let value: string
	export let counter: number
	export let selected: string
	export let iconVariant: 'outline' | 'solid' | 'mini'
</script>

<input type="radio" id={slugify(label)} class="sr-only" {value} bind:group={selected} />

<label for={slugify(label)}>
	{#if icon}
		<span class="icon">
			<Icon src={icon} theme={iconVariant} />
		</span>
	{/if}
	<span class="label">
		{label}
	</span>

	{#if counter}
		<span class="badge">{counter}</span>
	{/if}
</label>

<style lang="postcss">
	input[type='radio'] {
		&:checked + label {
			background-color: var(--muted-color-hover);

			& .label {
				font-weight: 600;
			}

			& .badge {
				background-color: var(--primary);
				color: var(--primary-inverse);
			}

			&:hover {
				background-color: var(--muted-color-focus);
			}
		}

		& + label {
			display: flex;
			border-radius: 999rem;
			align-items: center;
			justify-content: space-between;
			padding: 0.5rem 0.5rem 0.5rem 1rem;

			&:hover {
				background-color: var(--muted-color-hover);
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
				background-color: var(--muted-color-focus);
				color: var(--muted-color);
			}
		}
	}
</style>
