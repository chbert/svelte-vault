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
		display: grid;
		grid-template-areas: 'start center end';
		grid-auto-flow: row;
		grid-template-columns: 1fr 2fr 1fr;
		gap: 1rem 2rem;

		& .start,
		& .center,
		& .end {
			display: flex;
			align-items: center;
		}

		& .start {
			grid-area: start;
			justify-content: start;
		}

		& .center {
			grid-area: center;
			justify-content: center;
		}

		& .end {
			grid-area: end;
			justify-content: end;
		}

		& input[id='search'] {
			margin-bottom: 0;
			margin-left: 0.5rem;
			width: 100%;
		}
	}
</style>
