<section class="filters">
	<div class="row">
		<slot />
	</div>
</section>

<style lang="postcss">
	.filters {
		background-color: var(--muted-color-hover);
		border: 1px solid var(--muted-border-color);
		border-radius: 1rem;
		padding: var(--element-padding);

		& .row {
			margin-left: 0;
		}
	}

	:global(.filters-action) {
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

	:global(.filters-action button) {
		width: auto;
		margin-bottom: 0;
	}
</style>
