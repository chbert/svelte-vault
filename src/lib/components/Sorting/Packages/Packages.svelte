<script lang="ts">
	import { page } from '$app/stores'
	import { updateParams } from '$utils/filter'
	import { sortStore } from '$stores'
	import selectedPackageManager from '$stores/packageManager'

	import RadioGroup from '$components/Group/Radio'

	const category = $page.params.category

	const packageManagerValues = [
		{ label: 'npm', value: 'npm' },
		{ label: 'pnpm', value: 'pnpm' },
		{ label: 'yarn', value: 'yarn' }
	]

	const sortValues = [
		{ label: 'name', value: 'title' },
		{ label: 'stars', value: 'stars' },
		{ label: 'downloads', value: 'npm_downloads_last_week' },
		{ label: 'issues', value: 'open_issues' },
		{ label: 'last updated', value: 'repo_updated_at' }
	]

	let showSortList: boolean = false
	$: selectedSort = sortValues.filter((value) => value.value === $sortStore)[0].label

	const onClickSort = (value: number) => {
		$sortStore = sortValues[value].value
		updateParams(category)
		showSortList = false
	}
</script>

<div class="end">
	<div class="sorting">
		<div>
			<RadioGroup
				values={packageManagerValues}
				orientation="horizontal"
				bind:selected={$selectedPackageManager}
			/>
		</div>

		<div class="sorting-action">
			<details role="list">
				<summary aria-haspopup="listbox" on:click={() => (showSortList = true)}>
					Sort by {selectedSort}
				</summary>
				{#if showSortList}
					<ul role="listbox">
						{#each sortValues as value, index}
							<li on:keypress={() => onClickSort(index)} on:click={() => onClickSort(index)}>
								{value.label}
							</li>
						{/each}
					</ul>
				{/if}
			</details>
		</div>
	</div>
</div>

<style lang="postcss">
	.sorting {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
