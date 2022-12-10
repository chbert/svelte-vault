<script lang="ts">
	import type { PageData } from './$types'
	import { term, sort, category, downloads, days } from '$stores'
	import selectedPackageManager from '$stores/packageManager'
	import { updateUrl } from '$utils/filter'

	import Title from '$components/Title'
	import Stacked from '$components/list/Stacked'
	import Item from '$components/list/Stacked/Item'
	import Result from '$components/Result'
	import RadioGroup from '$components/form/RadioGroup'

	export let data: PageData

	const packageManagerValues = [
		{ label: 'npm', value: 'npm' },
		{ label: 'pnpm', value: 'pnpm' },
		{ label: 'yarn', value: 'yarn' }
	]

	const sortValues = [
		{ label: 'name', value: 'full_name' },
		{ label: 'downloads', value: 'npm_downloads_last_week' },
		{ label: 'open issues', value: 'open_issues' }
	]

	$: selectedSort = sortValues.filter((value) => value.value === $sort)[0].label

	const onClickSort = (value: number) => {
		$sort = sortValues[value].value
		updateUrl($term, $sort, $category, $days, $downloads)
	}
</script>

<svelte:head>
	<title>Svelte Vault</title>
	<meta name="description" content="All things svelte" />
</svelte:head>

<div class="container">
	<div class="page-header">
		<div class="start">
			<Title tag="h2" size="xl" hasMargin={false}>Results</Title>
		</div>
		<div class="center">
			<RadioGroup
				values={packageManagerValues}
				orientation="horizontal"
				bind:selected={$selectedPackageManager}
			/>
		</div>
		<div class="end">
			<details role="list">
				<summary aria-haspopup="listbox">Sort by {selectedSort}</summary>
				<ul role="listbox">
					{#each sortValues as value, index}
						<li on:keypress={() => onClickSort(index)} on:click={() => onClickSort(index)}>
							{value.label}
						</li>
					{/each}
				</ul>
			</details>
		</div>
	</div>

	<Stacked>
		{#each data?.entries as { github_repo, github_updated_at, full_name, description, homepage, open_issues, stars, license, npm_package, npm_downloads_last_week }}
			{@const _license = JSON.parse(license)}
			<Item>
				<Result
					fullName={full_name}
					{description}
					{homepage}
					{stars}
					openIssues={open_issues}
					githubRepo={github_repo}
					license={_license}
					updated={github_updated_at}
					npmPackage={npm_package}
					npmDownloads={npm_downloads_last_week}
				/>
			</Item>
		{:else}
			<div class="no-results">
				<Title size="lg">No results found</Title>
				<a href="/">Reset filters and search</a>
			</div>
		{/each}
	</Stacked>
</div>

<style lang="postcss">
	:root {
		--padding: 0 0 1rem 1rem;
	}

	.page-header {
		padding: var(--padding);
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: column;
		gap: 1rem;

		@media (min-width: 1200px) {
			flex-direction: row;

			& .start {
				display: flex;
				align-items: center;
				justify-content: flex-start;
			}

			& .center {
				display: flex;
				align-items: center;
				justify-content: center;
			}

			& .end {
				display: flex;
				align-items: center;
				justify-content: flex-end;
			}
		}
	}

	.no-results {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
		padding: 2rem;
		overflow: hidden;
		border: var(--border-width) solid var(--muted-border-color);
		border-radius: var(--element-border-radius);
	}
</style>
