<script lang="ts">
	import type { License } from './types'
	import { ArrowPath, ArrowDownTray, Star, Scale, XCircle } from '@steeze-ui/heroicons'
	import { Icon } from '@steeze-ui/svelte-icon'

	import formatDate from '$utils/formatDate'
	import selectedPackageManager from '$stores/packageManager'

	import Item from '$components/Item'
	import Title from '$components/Title'
	import CopyCode from '$components/CopyCode'
	import Github from '$components/icons/Github'
	import Npm from '$components/icons/Npm'

	export let fullName: string
	export let homepage: string
	export let description: string
	export let githubRepo: string
	export let npmPackage: string
	export let npmDownloads: number
	export let license: License
	export let stars: number
	export let openIssues: number
	export let updated: string
</script>

<div class="result">
	<div class="result-header">
		<div class="title">
			<Title size="lg" tag="h3" hasMargin={false}>
				{#if homepage}
					<a href={homepage}>{fullName}</a>
				{:else}
					{fullName}
				{/if}
			</Title>
			<div class="subtitle">
				<Icon src={ArrowPath} size="16" /> Last updated
				{`${formatDate(updated, true)}`}
			</div>
		</div>
		<div class="external-links">
			{#if npmPackage}
				<a
					href={`https://npmjs.com/package/${npmPackage}`}
					target="_blank"
					rel="noreferrer"
					name="NPM"
				>
					<Npm />
				</a>
			{/if}
			<a href={`https://github.com/${githubRepo}`} target="_blank" rel="noreferrer" name="Github">
				<Github />
			</a>
		</div>
	</div>
	<div class="result-main">
		<p>{description}</p>
	</div>

	<div class="result-footer">
		<div class="start">
			<Item icon={Scale}>{license.spdx_id}</Item>
			<Item icon={Star}>{stars.toLocaleString()}</Item>
			<Item icon={XCircle}>{openIssues.toLocaleString()} open issues</Item>
			{#if npmPackage}
				<Item icon={ArrowDownTray}>{npmDownloads.toLocaleString()} last week</Item>
			{/if}
		</div>

		<div class="end">
			<CopyCode>
				{#if npmPackage}
					{#if $selectedPackageManager === 'npm'}
						npm install -D
					{:else}
						{$selectedPackageManager} add -D
					{/if}
					{npmPackage}
				{:else}
					git clone https://github.com/{githubRepo}.git
				{/if}
			</CopyCode>
		</div>
	</div>
</div>

<!--
	
-->
<style lang="postcss">
	.result {
		overflow: hidden;
		border-radius: var(--element-border-radius);

		& .external-links {
			display: flex;
			align-items: center;
			justify-content: flex-end;

			& > a {
				color: var(--text-color);
				flex: 0 0 auto;
				margin-right: 1rem;

				&:hover {
					color: var(--primary);
				}

				&:last-child {
					margin-right: 0;
				}
			}
		}
	}

	.result-header {
		padding: var(--element-padding);
		padding-bottom: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;

		& .subtitle {
			color: var(--muted-color);
			font-size: 0.875rem;
			margin-top: 0.125rem;
			display: flex;
			align-items: center;
			gap: 0.5rem;
		}
	}

	.result-main {
		display: flex;
		justify-content: space-between;
		padding: var(--element-padding);
	}

	.result-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: var(--element-padding);
		color: var(--muted-color);
		background: var(--muted-color-hover);

		& .start {
			margin-top: 1rem;
		}

		@media (min-width: 1200px) {
			& .start {
				margin-top: 0;
				display: flex;
				align-items: center;
				flex-basis: 0;
				gap: 1rem;
			}

			& .end {
				display: flex;
				flex-basis: 0;
				justify-content: end;
				align-items: center;
				margin-right: -0.5rem; /* compensate for the margin on the copy button */
			}
		}
	}
</style>
