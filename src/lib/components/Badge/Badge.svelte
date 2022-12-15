<script lang="ts">
	export let href: string = ''

	const tag = href ? 'a' : 'span'
</script>

<svelte:element this={tag} class="badge" {href} target="_blank" rel="noreferrer">
	<slot />
</svelte:element>

<style lang="postcss">
	.badge {
		display: inline-block;
		padding: 0.125rem 0.375rem 0.25rem 0.375rem;
		border-radius: var(--border-radius-full);
		background-color: var(--primary-focus);
		color: var(--primary);
		font-size: 0.6125rem;
		font-weight: 500;
		text-decoration: none;
		margin-right: 0.125rem;
		&:hover {
			background-color: var(--primary-light);
		}
	}
</style>
