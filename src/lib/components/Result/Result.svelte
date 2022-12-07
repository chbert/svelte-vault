<script lang="ts">
	import Item from '$components/Item'
	import Title from '$components/Title'

	import { Star, Scale, XCircle } from '@steeze-ui/heroicons'
	import CopyCode from '$components/CopyCode/CopyCode.svelte'

	export let title: string
	export let url: string
	export let description: string
	export let license: string
	export let stars: number
	export let issues: number
	export let updated: string
</script>

<div class="result">
	<div class="result-main">
		<div class="start">
			<Title size="lg"><a href={url}>{title}</a></Title>
			<p>{description}</p>
		</div>

		<div class="end">
			<CopyCode>npm add -D rollup-plugin-svelte</CopyCode>
		</div>
	</div>

	<div class="result-info">
		<span>
			Last updated
			<time datetime={updated}>{updated}</time>
		</span>
		<span>
			<Item icon={Star}>{stars}</Item>
		</span>
		<span>
			<Item icon={Scale}>{license}</Item>
		</span>
		<span>
			<Item icon={XCircle}>{issues} open issues</Item>
		</span>
	</div>
</div>

<style lang="postcss">
	.result {
		padding: 1rem 1.5rem;
	}

	.result-main {
		display: flex;
		justify-content: space-between;

		& .end {
			text-align: right;
			margin-top: 0.375rem;
		}
	}

	.result-info {
		display: flex;
		align-items: center;
		color: var(--muted-color);
		& > * {
			margin-right: 2rem;
		}
	}
</style>
