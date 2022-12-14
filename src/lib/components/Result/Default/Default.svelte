<script lang="ts">
	import '../styles.postcss'

	import type { License, Data } from './types'
	import { ArrowPath, ArrowDownTray, Star, Scale, XCircle } from '@steeze-ui/heroicons'
	import { Icon } from '@steeze-ui/svelte-icon'

	import formatDate from '$utils/formatDate'
	import selectedPackageManager from '$stores/packageManager'

	import Item from '$components/Item'
	import Title from '$components/Title'
	import CopyCode from '$components/CopyCode'
	import Github from '$components/icons/Github'
	import Npm from '$components/icons/Npm'

	export let data: Data

	const {
		title,
		description,
		homepage,
		url,
		npm_package: npmPackage,
		npm_downloads_last_week: npmDownloads,
		license,
		stars,
		open_issues: openIssues,
		updated
	} = data

	// Check if url is a github url
	const isGithub = url?.includes('github.com')
	const gitHubUrl = isGithub ? url : ''

	const npmUrl = `https://npmjs.com/package/${npmPackage}`
</script>

<div class="result">
	<div class="result-header">
		<div class="title">
			<Title size="lg" tag="h3" hasMargin={false}>
				<a href={url || npmUrl || homepage}>{npmPackage || title}</a>
			</Title>
			<div class="subtitle">
				<Icon src={ArrowPath} size="16" /> Last updated
				{`${formatDate(updated, true)}`}
			</div>
		</div>
		<div class="icon-links">
			{#if npmPackage}
				<a href={npmUrl} target="_blank" rel="noreferrer" name="NPM">
					<Npm />
				</a>
			{/if}
			<a href={url} target="_blank" rel="noreferrer" name="Github">
				<Github />
			</a>
		</div>
	</div>
	<div class="result-main">
		<p>{@html description}</p>
	</div>

	<div class="result-footer">
		<div class="start">
			<Item icon={Star}>{stars.toLocaleString()}</Item>
			<Item icon={XCircle}>{openIssues.toLocaleString()} open issues</Item>
			{#if npmPackage}
				<Item icon={ArrowDownTray}>{npmDownloads.toLocaleString()} last week</Item>
			{/if}
			{#if license?.spdx_id}
				<Item icon={Scale}>{license?.spdx_id}</Item>
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
				{:else if gitHubUrl}
					{@const owner = gitHubUrl.split('/')[3]}
					{@const repo = gitHubUrl.split('/')[4]}
					git clone https://github.com/{owner}/{repo}.git
				{/if}
			</CopyCode>
		</div>
	</div>
</div>
