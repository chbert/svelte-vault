<script lang="ts">
	import Title from '$components/Title'
	import Stacked from '$components/list/Stacked'
	import Item from '$components/list/Stacked/Item'
	import Result from '$components/Result/Result.svelte'

	let source = []
</script>

<svelte:head>
	<title>Svelte Vault</title>
	<meta name="description" content="All things svelte" />
</svelte:head>

<div class="container">
	<div class="page-title">
		<Title tag="h2" size="xl">Results</Title>
	</div>

	<Stacked>
		<Item>
			<Result
				title="Svelte Vault"
				description="All things svelte"
				url="https://svelte-vault.vercel.app"
				stars={1}
				issues={1}
				license="MIT"
				updated="2021-01-01"
			/>
		</Item>
	</Stacked>
</div>

<style lang="postcss">
	.page-title {
		margin-left: 1rem;
	}
</style>
