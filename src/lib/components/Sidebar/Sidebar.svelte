<script lang="ts">
	import { writable, type Writable } from 'svelte/store'
	import { ListBox, ListBoxItem, RangeSlider } from '@skeletonlabs/skeleton'

	const storeSingle: Writable<number> = writable(1)
</script>

<div class="pr-6 mt-3.5 space-y-8">
	<div>
		<div class="px-4 py-2 space-y-4">
			<h2 class="text-base text-surface-600">Filters</h2>
			<h3 class="text-xs font-semibold uppercase text-slate-400">Categories</h3>
		</div>

		<ListBox
			class="text-sm"
			selected="{storeSingle}"
			padding="pl-3.5 pr-1 py-1"
			accent="bg-primary-100 text-slate-900"
			hover="hover:bg-surface-200"
		>
			<ListBoxItem value="{1}">
				<svelte:fragment slot="lead">
					<div class="flex items-center gap-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-4 h-4"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"
							></path>
						</svg>
						All
					</div>
				</svelte:fragment>
				<svelte:fragment slot="trail">
					<span class="text-white badge bg-primary-500">100</span>
				</svelte:fragment>
			</ListBoxItem>
			<ListBoxItem value="{2}">
				<svelte:fragment slot="lead">
					<div class="flex items-center gap-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-4 h-4"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
							></path>
						</svg>

						Repositories
					</div>
				</svelte:fragment>
				<svelte:fragment slot="trail">
					<span class="badge bg-surface-100">100</span>
				</svelte:fragment>
			</ListBoxItem>
			<ListBoxItem value="{3}">
				<svelte:fragment slot="lead">
					<div class="flex items-center gap-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-4 h-4"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z"
							></path>
						</svg>

						Templates
					</div>
				</svelte:fragment>
				<svelte:fragment slot="trail">
					<span class="badge bg-surface-100">100</span>
				</svelte:fragment>
			</ListBoxItem>
			<ListBoxItem value="{4}">
				<svelte:fragment slot="lead">
					<div class="flex items-center gap-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-4 h-4"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
							></path>
						</svg>

						Components
					</div>
				</svelte:fragment>
				<svelte:fragment slot="trail">
					<span class="badge bg-surface-100">100</span>
				</svelte:fragment>
			</ListBoxItem>
			<ListBoxItem value="{5}">
				<svelte:fragment slot="lead">
					<div class="flex items-center gap-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.25"
							stroke="currentColor"
							class="w-4 h-4"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
							></path>
						</svg>

						Tools
					</div>
				</svelte:fragment>
				<svelte:fragment slot="trail">
					<span class="badge bg-surface-100">100</span>
				</svelte:fragment>
			</ListBoxItem>
		</ListBox>
	</div>

	<div class="px-4 py-2 space-y-2">
		<h3 class="text-xs font-semibold uppercase text-slate-400">Last updated</h3>
		<RangeSlider value="{50}" max="{100}" step="{5}" />
	</div>
</div>

<style lang="postcss">
	.list-nav a {
		@apply px-2 py-1;
	}
</style>
