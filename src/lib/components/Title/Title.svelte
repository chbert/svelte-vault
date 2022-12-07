<script lang="ts">
	export let size: 'sm' | 'base' | 'lg' | 'xl' = 'base'
	export let tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' = 'span'
	export let transform: 'uppercase' | 'capitalize' | 'lowercase' | 'none' = 'none'
	export let color: 'primary' | 'secondary' | 'muted' | 'color' = 'color'
</script>

<svelte:element this={tag} class="title size-{size} text-{color}" style="--transform:{transform};">
	<slot />
</svelte:element>

<style lang="postcss">
	.title {
		font-weight: 400;
		margin-bottom: 0.5rem;
		flex: 1;
		overflow: hidden;
		text-overflow: ellipsis;
		text-transform: var(--transform);
		white-space: nowrap;

		&.size-sm {
			font-size: 0.875rem;
			margin-bottom: 0.375rem;
		}

		&.size-base {
			font-size: 1rem;
			margin-bottom: 0.5rem;
		}

		&.size-lg {
			font-size: 1.25rem;
			font-weight: 600;
			margin-bottom: 0.75rem;
		}

		&.size-xl {
			font-size: 1.75rem;
			font-weight: 500;
			margin-bottom: 1rem;
		}

		&.text-primary {
			color: var(--primary);
		}

		&.text-secondary {
			color: var(--secondary);
		}

		&.text-muted {
			color: var(--muted-color);
		}

		&.text-color {
			color: var(--color);
		}
	}
</style>
