<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon'
	import { Trash } from '@steeze-ui/heroicons'

	import { page } from '$app/stores'
	import { goto } from '$app/navigation'
	import { toast } from '@zerodevx/svelte-toast'

	export let id: number

	let category = $page.params.category
	let shift = false

	const onClick = async () => {
		if (!shift) {
			return
		}

		const response = await fetch(`/api/categories/${category}/${id}/delete`)
		if (response.status === 200) {
			toast.push('Successfully deleted.', { duration: 3000 })
		} else {
			toast.push('Something went wrong.', { duration: 3000 })
		}

		goto($page.url.href, { invalidateAll: true })
	}
</script>

<svelte:window
	on:keydown={(event) => {
		if (event.key === 'Shift') {
			shift = true
		}
	}}
	on:keyup={(event) => {
		if (event.key === 'Shift') {
			shift = false
		}
	}}
/>

{#if $page.data.session}
	<button on:click={onClick} class:shift>
		<Icon src={Trash} size="16" />
	</button>
{/if}

<style lang="postcss">
	button {
		display: none;
		background: var(--error-color);
		border: none;
		padding-left: 0.5rem;
		padding-right: 0.5rem;
		cursor: pointer;
		width: auto;

		align-items: center;
		justify-content: center;

		&.shift {
			display: flex;
		}
	}
</style>
