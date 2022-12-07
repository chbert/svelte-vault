<script>
	import Logo from '$components/Logo'
</script>

<div class="header">
	<div class="start">
		<Logo />
	</div>

	<div class="center">
		<input type="search" id="search" name="search" placeholder="Search" />
	</div>

	<div class="end">
		<span role="button">Submit</span>
	</div>
</div>

<style lang="postcss">
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;

		& .start,
		& .center,
		& .end {
			display: flex;
			align-items: center;
		}

		& .end {
			justify-content: end;
		}

		& input[id='search'] {
			margin-bottom: 0;
		}
	}
</style>
