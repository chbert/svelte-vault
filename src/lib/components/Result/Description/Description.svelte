<p class="prose">
	<slot />
</p>

<style lang="postcss">
	.prose {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
