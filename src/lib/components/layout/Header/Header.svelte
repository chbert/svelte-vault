<script lang="ts">
	import { page } from '$app/stores'
	import { termStore, submissionsModalStore } from '$stores'
	import params from '$utils/params'

	import Logo from '$components/Logo'

	let search = decodeURI($page.url.searchParams.get('term') || '')
	const category = $page.params.category

	const onTermChange = (event: Event & { currentTarget: EventTarget & HTMLInputElement }) => {
		// @ts-ignore
		search = event?.target?.value
		$termStore = search

		params.update(category)
	}

	const onClick = () => {
		$termStore = ''
		search = ''

		params.update(category)
	}
</script>

<div class="header">
	<div class="grid gap-4">
		<div class="row gy-4">
			<div class="start col-xl-3">
				<Logo />
			</div>

			<div class="center col-xl">
				<div class="searchbar">
					<input
						type="search"
						id="search"
						name="search"
						placeholder="Search"
						bind:value={search}
						on:change={(event) => onTermChange(event)}
					/>

					<!-- svelte-ignore a11y-click-events-have-key-events -->
					{#if search}
						<div class="clear" on:click={onClick}>
							<iconify-icon icon="heroicons:x-mark" />
						</div>
					{/if}
				</div>
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

		.searchbar {
			position: relative;
			width: 100%;

			& .clear {
				cursor: pointer;
				position: absolute;
				top: 0.5rem;
				right: 0.5rem;
				width: 1.5rem;
				height: 1.5rem;
			}
		}
	}
</style>
