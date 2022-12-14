<script lang="ts">
	import '../pico.scss'
	import '../app.postcss'

	import { onMount } from 'svelte'
	import { fade } from 'svelte/transition'
	import { SvelteToast } from '@zerodevx/svelte-toast'

	import { supabaseClient } from '$db'
	import { navigating } from '$app/stores'
	import { invalidate } from '$app/navigation'
	import navigationState from '$stores/navigation'

	import PageLoader from '$components/PageLoader'

	export let data: any

	onMount(() => {
		const {
			data: { subscription }
		} = supabaseClient.auth.onAuthStateChange(() => {
			invalidate('supabase:auth')
		})

		return () => {
			subscription.unsubscribe()
		}
	})

	$: $navigating ? ($navigationState = 'loading') : ($navigationState = 'loaded')
</script>

{#if $navigationState === 'loading'}
	<div out:fade={{ delay: 500 }}>
		<PageLoader />
	</div>
{/if}

<slot />

<SvelteToast />
