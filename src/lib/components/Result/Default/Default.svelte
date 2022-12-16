<script lang="ts">
	import '../styles.postcss'

	import type { Data } from './types'
	import { ArrowPath, ArrowDownTray, Star, Scale, XCircle } from '@steeze-ui/heroicons'
	import { Icon } from '@steeze-ui/svelte-icon'

	import formatDate from '$utils/formatDate'
	import selectedPackageManager from '$stores/packageManager'

	import Item from '$components/Item'
	import Title from '$components/Title'
	import Description from '$components/Result/Description'
	import CopyCode from '$components/CopyCode'
	import Github from '$components/icons/Github'
	import Npm from '$components/icons/Npm'
	import Badge from '$components/Badge'
	import Delete from '$components/Result/Delete'

	export let data: Data

	const orientation = 'horizontal'

	const {
		id,
		title,
		description,
		homepage,
		url,
		npm_package: npmPackage,
		npm_downloads_last_week: npmDownloads,
		license,
		stars,
		topics,
		open_issues: openIssues,
		repo_updated_at: updatedAt
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
				<a href={homepage || gitHubUrl || npmUrl}>{npmPackage || title}</a>
			</Title>
			{#if updatedAt}
				<div class="subtitle">
					<Icon src={ArrowPath} size="16" /> Last updated
					{`${formatDate(updatedAt, true)}`}
				</div>
			{/if}
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
			<Delete {id} />
		</div>
	</div>
	<div class="result-main">
		<div>
			{#if description}
				<Description>{@html description}</Description>
			{/if}
			{#if topics}
				{#each topics as topic}
					<Badge href={`https://www.github.com/topics/${topic}`}>
						{topic}
					</Badge>
				{/each}
			{/if}
		</div>
	</div>

	<div class="result-footer">
		<div class="start">
			<Item icon={Star} href={`${gitHubUrl}/stargazers`} {orientation}
				>{stars.toLocaleString()}</Item
			>
			<Item icon={XCircle} href={`${gitHubUrl}/issues`} {orientation}>
				{openIssues.toLocaleString()} issues
			</Item>
			{#if npmPackage}
				<Item icon={ArrowDownTray} href={npmUrl} {orientation}
					>{npmDownloads.toLocaleString()} last week</Item
				>
			{/if}
			{#if license?.spdx_id}
				<Item icon={Scale} href={license?.url} {orientation}>
					{license?.spdx_id}
				</Item>
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
