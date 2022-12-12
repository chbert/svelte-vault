<script lang="ts">
	import { updateParams } from '$utils/filter'
	import { termStore, submissionsModalStore } from '$stores'

	import Logo from '$components/Logo'

	let search = ''

	const onTermChange = (event: Event & { currentTarget: EventTarget & HTMLInputElement }) => {
		// @ts-ignore
		$termStore = event?.target?.value
		updateParams()
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
					on:change={(event) => onTermChange(event)}
				/>
			</div>

			<div class="end col-xl-3">
				<a
					href="#modal"
					role="button"
					data-target="modal-submit"
					on:click={() => ($submissionsModalStore = true)}
				>
					Submit
				</a>
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
			gap: 1rem;
		}

		& .end {
			justify-content: flex-end;
		}

		& input[id='search'] {
			width: 100%;
			margin: 0;
		}
	}
</style>
