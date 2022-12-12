<script>
	import Github from '$components/icons/Github'
</script>

<div class="footer">
	<div class="grid gap-4">
		<div class="row gy-4">
			<div class="start col-xl">
				by <a href="https://christian.bertschy.me">CB</a>
			</div>

			<div class="end col-xl">
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
	</div>
</div>

<style lang="postcss">
	.footer {
		padding-top: 1rem;
		padding-bottom: 1rem;

		.row {
			border-top: 1px solid var(--muted-border-color);
		}
	}
</style>
