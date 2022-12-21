<script lang="ts">
	import { copy, type CopyDetail } from '@svelte-put/copy'

	let copied = ''

	function handleCopy(event: CustomEvent<CopyDetail>) {
		copied = event.detail.text
	}
</script>

<div class="copy-code" use:copy on:copy={handleCopy}>
	<code class="truncate">
		<slot />
	</code>

	<iconify-icon icon="heroicons:square-2-stack" />
</div>

<style lang="postcss">
	.copy-code {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		cursor: pointer;

		background-color: var(--primary-focus);
		color: var(--primary);
		white-space: nowrap;

		border-color: var(--primary-focus);
		border-radius: 999rem;

		padding: 0.5rem 0.75rem 0.625rem 1rem;

		transition-property: all;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 300ms;

		&:hover {
			background-color: var(--primary-light);
			border-color: var(--primary-light);
		}

		code {
			display: block;
			background-color: transparent;
			border-radius: 0;
			color: inherit;
			padding: 0;
			margin-right: 0.5rem;
			line-height: 1.25rem;
			max-width: 20rem;
		}
	}
</style>
