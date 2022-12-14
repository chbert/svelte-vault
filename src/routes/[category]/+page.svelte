<script lang="ts">
	import { quintOut } from 'svelte/easing'
	import { crossfade } from 'svelte/transition'
	import { flip } from 'svelte/animate'
	import { Turnstile } from 'svelte-turnstile'
	import { toast } from '@zerodevx/svelte-toast'

	import type { ActionData, PageData } from './$types'

	import { page } from '$app/stores'
	import { enhance } from '$app/forms'
	import {
		submissionsModalStore,
		pageSizeStore,
		totalPagesStore,
		totalEntriesStore,
		termStore
	} from '$stores'

	import { PUBLIC_TURNSTILE_SITE_KEY } from '$env/static/public'

	import Title from '$components/Title'
	import Stacked from '$components/list/Stacked'
	import Item from '$components/list/Stacked/Item'
	import DefaultResult from '$components/Result/Default'
	import ArticleResult from '$components/Result/Article'
	import VideoResult from '$components/Result/Video'
	import Modal from '$components/Modal'
	import Pagination from '$components/Pagination'
	import Filters from '$components/Filters'
	import Sorting from '$components/Sorting'

	export let data: PageData
	export let form: ActionData

	const modalId = 'modal-submission'

	const results = [
		{ category: 'packages', component: DefaultResult },
		{ category: 'repositories', component: DefaultResult },
		{ category: 'articles', component: ArticleResult },
		{ category: 'videos', component: VideoResult }
	]

	$: category = $page.params.category
	$: result = results.find((c) => c.category === category)

	$totalEntriesStore[category] = data.count
	$totalPagesStore = Math.ceil($totalEntriesStore[category] / $pageSizeStore)

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
			<Title tag="h2" size="xl" hasMargin={false}>
				Results {#if $termStore}for "{$termStore}"{/if}
			</Title>
		</div>
		<Sorting {category} />
	</div>

	<div class="page-filters">
		<Filters {category} />
	</div>

	<Stacked>
		{#await data}
			<div class="loading">
				<Title size="lg">Loading...</Title>
			</div>
		{:then data}
			{#each data?.entries as entry (entry.id)}
				<div
					in:receive={{ key: entry.id }}
					out:send={{ key: entry.id }}
					animate:flip={{ duration: duration, easing: easing }}
				>
					<Item>
						<svelte:component this={result?.component} data={entry} />
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

	<Pagination totalPages={$totalPagesStore} />
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
