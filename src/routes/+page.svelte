<script lang="ts">
	import type { PageData } from './$types'
	import selectedPackageManager from '$stores/packageManager'

	import Title from '$components/Title'
	import Stacked from '$components/list/Stacked'
	import Item from '$components/list/Stacked/Item'
	import Result from '$components/Result'
	import RadioGroup from '$components/form/RadioGroup'

	export let data: PageData

	const values = [
		{ label: 'npm', value: 'npm' },
		{ label: 'pnpm', value: 'pnpm' },
		{ label: 'yarn', value: 'yarn' }
	]
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
			<RadioGroup {values} orientation="horizontal" bind:selected={$selectedPackageManager} />
		</div>
		<div class="end">
			<details role="list">
				<summary aria-haspopup="listbox">Sort by name</summary>
				<ul role="listbox">
					<li><a>name</a></li>
					<li><a>downloads</a></li>
					<li><a>open issues </a></li>
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
</style>
