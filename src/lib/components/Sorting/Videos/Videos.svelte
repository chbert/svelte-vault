<script lang="ts">
	import { page } from '$app/stores'
	import { updateParams } from '$utils/filter'
	import { sortStore } from '$stores'

	const category = $page.params.category

	const sortValues = [
		{ label: 'name', value: 'title' },
		{ label: 'publish date', value: 'published_at' }
	]

	let showSortList: boolean = false
	$: selectedSort = sortValues.filter((value) => value.value === $sortStore)[0].label

	const onClickSort = (value: number) => {
		$sortStore = sortValues[value].value
		updateParams(category)
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
