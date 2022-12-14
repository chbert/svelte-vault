<script lang="ts">
	export let size: 'sm' | 'base' | 'lg' | 'xl' = 'base'
	export let tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' = 'span'
	export let transform: 'uppercase' | 'capitalize' | 'lowercase' | 'none' = 'none'
	export let weight: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 = 400
	export let color: 'primary' | 'secondary' | 'muted' | 'color' = 'color'
	export let hasMargin: boolean = true
</script>

<svelte:element
	this={tag}
	class="title size-{size} text-{color}"
	class:no-margin={!hasMargin}
	style="--transform:{transform}; --weight:{weight};"
>
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
		font-weight: var(--weight);
		white-space: nowrap;

		&.no-margin {
			margin-bottom: 0 !important;
		}

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
