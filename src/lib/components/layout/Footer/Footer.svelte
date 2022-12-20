<script>
	import Github from '$components/icons/Github'
</script>

<div class="footer">
	<div class="start">
		by <a href="https://christian.bertschy.me">CB</a>
		<span class="pipe">|</span>
		original data via
		<a href="https://sveltesociety.dev/">Svelte Society</a>
		& <a href="https://svelte.substack.com/">The (Unofficial) Svelte JS Newsletter</a>
		<span class="pipe">|</span>
		data updated every 24h
	</div>

	<div class="end">
		<span class="icon-links">
			<a
				href="https://github.com/chbert/svelte-vault"
				target="_blank"
				rel="noreferrer"
				name="Github"
			>
				<Github height={24} />
			</a>
		</span>
	</div>
</div>

<style lang="postcss">
	.footer {
		padding: 1rem;
		gap: 1rem;

		border-top: 1px solid var(--muted-border-color);

		display: flex;
		justify-content: center;
		align-items: center;

		& .start {
			color: var(--muted-color);
			flex-basis: auto;
		}

		& .end {
			color: var(--muted-color);
			flex-basis: 0;
		}

		& .pipe {
			color: var(--muted-color-focus);
			margin: 0 0.5rem;
		}
	}
</style>
