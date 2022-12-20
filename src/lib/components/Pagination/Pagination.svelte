<script lang="ts">
	import { ChevronLeft, ChevronRight } from '@steeze-ui/heroicons'
	import { Icon } from '@steeze-ui/svelte-icon'

	import { page as pageStore } from '$app/stores'
	import { goto } from '$app/navigation'

	export let totalPages: number = 1

	let page = Number($pageStore.url.searchParams.get('page')) || 1
	let newUrl = new URL($pageStore.url)
</script>

{#if totalPages >= 2}
	<div class="pagination">
		<button
			aria-label="Previous page"
			class="secondary"
			disabled={page <= 1}
			on:click={() => {
				page = page - 1
				newUrl?.searchParams?.set('page', String(page))
				goto(newUrl, { invalidateAll: true })
			}}
		>
			<Icon size="14" src={ChevronLeft} />
		</button>

		<span class="pagination__page">
			{page} of {totalPages}
		</span>

		<button
			aria-label="Next page"
			class="secondary"
			disabled={page >= totalPages}
			on:click={() => {
				page = page + 1
				newUrl?.searchParams?.set('page', String(page))
				goto(newUrl, { invalidateAll: true })
			}}
		>
			<Icon size="14" src={ChevronRight} />
		</button>
	</div>
{/if}

<style lang="postcss">
	.pagination {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		margin-top: 1rem;
		gap: 1rem;

		button {
			width: auto;
			display: flex;
			align-items: center;
			padding: 0.25rem 0.5rem;
		}
	}
</style>
