<script lang="ts">
	import { quintOut } from 'svelte/easing'
	import { crossfade } from 'svelte/transition'
	import { flip } from 'svelte/animate'
	import { Turnstile } from 'svelte-turnstile'
	import { toast } from '@zerodevx/svelte-toast'

	import type { ActionData, PageData } from './$types'
	import { enhance } from '$app/forms'
	import { sortStore, submissionsModalStore, pageSizeStore, totalEntriesStore } from '$stores'
	import selectedPackageManager from '$stores/packageManager'
	import { updateParams } from '$utils/filter'

	import Title from '$components/Title'
	import Stacked from '$components/list/Stacked'
	import Item from '$components/list/Stacked/Item'
	import Result from '$components/Result'
	import RadioGroup from '$components/form/RadioGroup'
	import Modal from '$components/Modal'
	import Pagination from '$components/Pagination'
	import { PUBLIC_TURNSTILE_SITE_KEY } from '$env/static/public'

	export let data: PageData
	export let form: ActionData

	const modalId = 'modal-submission'

	$: totalPages = Math.ceil($totalEntriesStore / $pageSizeStore)

	// List animations
	const duration = 300
	const easing = quintOut

	const [send, receive] = crossfade({
		duration: (d) => Math.sqrt(d * 200),

		fallback() {
			return {
				duration: duration,
				easing: easing,
				css: (t) => `
					opacity: ${t}
				`
			}
		}
	})

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

	let showSortList: boolean = false
	$: selectedSort = sortValues.filter((value) => value.value === $sortStore)[0].label

	const onClickSort = (value: number) => {
		$sortStore = sortValues[value].value
		updateParams()
		showSortList = false
	}

	$: formValue = ''
	const onFormSuccess = () => {
		$submissionsModalStore = false
		toast.push('Successfully submitted!')
	}

	const resetForm = () => {
		// BUG: Once the form is submitted, the form is reset, but the error message is still shown
		form = null
		$submissionsModalStore = false
	}

	$: form?.success ? onFormSuccess() : null
</script>

<svelte:head>
	<title>Svelte Vault</title>
	<meta name="description" content="All things svelte" />
	<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
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
	</div>

	<Stacked>
		{#await data}
			<div class="loading">
				<Title size="lg">Loading...</Title>
			</div>
		{:then data}
			{#each data?.entries as entry (entry.id)}
				{@const {
					github_repo,
					github_updated_at,
					full_name,
					description,
					homepage,
					open_issues,
					stars,
					license,
					npm_package,
					npm_downloads_last_week
				} = entry}
				{@const _license = JSON.parse(license)}

				<div
					in:receive={{ key: entry.id }}
					out:send={{ key: entry.id }}
					animate:flip={{ duration: duration, easing: easing }}
				>
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
				</div>
			{:else}
				<div class="no-results">
					<Title size="lg">No results found</Title>
					<a href="/">Reset filters and search</a>
				</div>
			{/each}
		{/await}
	</Stacked>

	<Pagination {totalPages} />
</div>

<Modal id={modalId} bind:open={$submissionsModalStore} hasCloseButton={false}>
	<svelte:fragment slot="title"
		><Title size="lg" hasMargin={false}>Submit a new resource</Title></svelte:fragment
	>
	<svelte:fragment slot="content">
		<form id="submissionForm" method="POST" use:enhance>
			<label for="url">
				<Title size="sm" transform="uppercase">URL</Title>
				<input
					aria-invalid={form?.message ? 'true' : null}
					id="url"
					type="text"
					name="url"
					placeholder="e.g. https://svelte.dev"
					bind:value={formValue}
				/>

				{#if form && form.message}
					<p class="error">
						{form.message}
					</p>
				{/if}
			</label>

			<Turnstile siteKey={PUBLIC_TURNSTILE_SITE_KEY} />

			<div class="form-actions">
				<button class="secondary" data-target={modalId} on:click={() => resetForm()}>
					Cancel
				</button>
				<input type="submit" value="Submit" />
			</div>
		</form>
	</svelte:fragment>
</Modal>

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
		border-radius: var(--border-radius);
	}

	form#submissionForm {
		margin-bottom: 0;
		.form-actions {
			display: flex;
			justify-content: space-between;
			margin-top: 2rem;

			& button,
			& input[type='submit'] {
				width: auto;
			}
		}

		.error {
			color: var(--error-color);
		}
	}
</style>
