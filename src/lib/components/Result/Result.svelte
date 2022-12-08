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
			<Title size="lg" tag="h3" hasMargin={false}><a href={homepage}>{fullName}</a></Title>
			<div class="subtitle">
				<Icon src={ArrowPath} size="16" /> Last updated
				{`${formatDate(updated, true)}`}
			</div>
		</div>
		<div class="external-links">
			<a href="#" name="NPM"><Npm /></a>
			<a href="#" name="Github"><Github /></a>
		</div>
	</div>
	<div class="result-main">
		<p>{description}</p>
	</div>

	<div class="result-footer">
		<div class="row">
			<div class="start col-xl">
				<div>
					<Item icon={Scale}>{license.spdx_id}</Item>
				</div>
				<div>
					<Item icon={Star}>{stars}</Item>
				</div>
				<div>
					<Item icon={XCircle}>{openIssues}</Item>
				</div>
				<div>
					<Item icon={ArrowDownTray}>{npmDownloads.toLocaleString()} last week</Item>
				</div>
			</div>

			<div class="end col-xl">
				<CopyCode>
					{#if $selectedPackageManager === 'npm'}
						npm install -D
					{:else if $selectedPackageManager === 'pnpm'}
						pnpm add -D
					{:else if $selectedPackageManager === 'yarn'}
						yarn add -D
					{/if}
					{npmPackage}
				</CopyCode>
			</div>
		</div>
	</div>
</div>

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
		padding: var(--element-padding);
		color: var(--muted-color);
		background: var(--muted-color-hover);

		& .end {
			margin-top: 1rem;
		}

		@media (min-width: 1200px) {
			& .start {
				margin-top: 0;
				display: flex;
				align-items: center;
				flex-basis: 1;
			}
			& .end {
				display: block;
				text-align: right;
				margin-top: 0;
				margin-right: -1rem; /* HACK: to align with the start */
				padding: 0;
			}
		}
	}
</style>
