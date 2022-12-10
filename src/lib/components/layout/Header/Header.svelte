<script>
	import { updateUrl } from '$utils/filter'

	import { term, sort, category, downloads, days } from '$stores'
	import Logo from '$components/Logo'

	let search = ''

	const onTermChange = (e) => {
		$term = e.target.value
		updateUrl($term, $sort, $category, $downloads, $days)
	}
</script>

<div class="header">
	<div class="grid gap-4">
		<div class="row gy-4">
			<div class="start col-xl-3">
				<Logo />
			</div>

			<div class="center col-xl">
				<input
					type="search"
					id="search"
					name="search"
					placeholder="Search"
					bind:value={search}
					on:change={(e) => onTermChange(e)}
				/>
			</div>

			<div class="end col-xl-3">
				<span role="button">Submit</span>
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	.header {
		margin-top: 1rem;

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
			width: 100%;
			margin: 0;
		}
	}
</style>
