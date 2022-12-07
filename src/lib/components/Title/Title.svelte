<script lang="ts">
	export let size: 'sm' | 'base' | 'lg' | 'xl' = 'base'
	export let tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' = 'span'
	export let transform: 'uppercase' | 'capitalize' | 'lowercase' | 'none' = 'none'
</script>

<svelte:element this={tag} class="title size-{size}" style="--transform:{transform};">
	<slot />
</svelte:element>

<style lang="postcss">
	.title {
		font-weight: 600;
		margin-bottom: 0.5rem;
		flex: 1;
		overflow: hidden;
		text-overflow: ellipsis;
		text-transform: var(--transform);
		white-space: nowrap;

		&.size-sm {
			font-size: 0.875rem;
			margin-bottom: 0.5rem;
		}

		&.size-base {
			font-size: 1rem;
			margin-bottom: 0.75rem;
		}

		&.size-lg {
			font-size: 1.5rem;
			margin-bottom: 1rem;
		}

		&.size-xl {
			font-size: 2rem;
			margin-bottom: 1.5rem;
		}
	}
</style>
