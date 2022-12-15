<script lang="ts">
	import { page } from '$app/stores'
	import { sortStore } from '$stores'
	import params from '$utils/params'

	const category = $page.params.category

	const sortValues = [
		{ label: 'name', value: 'title' },
		{ label: 'stars', value: 'stars' },
		{ label: 'issues', value: 'open_issues' },
		{ label: 'last updated', value: 'repo_updated_at' }
	]

	let showSortList: boolean = false
	$: selectedSort = sortValues.filter((value) => value.value === $sortStore)[0].label

	const onClickSort = (value: number) => {
		$sortStore = sortValues[value].value
		params.update(category)
		showSortList = false
	}
</script>

<div class="end sorting-action">
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
