<script lang="ts">
	import { updateParams } from '$utils/filter'
	import { sortStore } from '$stores'
	import selectedPackageManager from '$stores/packageManager'

	import RadioGroup from '$components/Group/Radio'

	const packageManagerValues = [
		{ label: 'npm', value: 'npm' },
		{ label: 'pnpm', value: 'pnpm' },
		{ label: 'yarn', value: 'yarn' }
	]

	const sortValues = [
		{ label: 'name', value: 'title' },
		{ label: 'downloads', value: 'npm_downloads_last_week' },
		{ label: 'open issues', value: 'open_issues' }
	]

	let showSortList: boolean = false
	$: selectedSort = sortValues.filter((value) => value.value === $sortStore)[0].label

	const onClickSort = (value: number) => {
		$sortStore = sortValues[value].value
		updateParams()
		showSortList = false
	}
</script>

<div class="center">
	<RadioGroup
		values={packageManagerValues}
		orientation="horizontal"
		bind:selected={$selectedPackageManager}
	/>
</div>

<div class="end">
	<details role="list">
		<summary aria-haspopup="listbox" on:click={() => (showSortList = true)}
			>Sort by {selectedSort}</summary
		>
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
