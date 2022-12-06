<script lang="ts">
	import '@skeletonlabs/skeleton/styles/all.css'
	import '../theme.postcss'
	import '../app.postcss'

	import { AppShell } from '@skeletonlabs/skeleton'

	import { supabaseClient } from '$db'
	import { invalidate } from '$app/navigation'
	import { onMount } from 'svelte'

	import Bar from '$components/Bar'
	import Footer from '$components/Footer'
	import Sidebar from '$components/Sidebar/Sidebar.svelte'

	let term = ''

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
</script>

<div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
	<AppShell slotSidebarLeft="w-56">
		<!-- Header -->
		<svelte:fragment slot="header">
			<Bar />
		</svelte:fragment>
		<svelte:fragment slot="sidebarLeft">
			<Sidebar />
		</svelte:fragment>

		<slot />

		<svelte:fragment slot="footer">
			<Footer />
		</svelte:fragment>
	</AppShell>
</div>
