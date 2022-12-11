<script lang="ts">
	import '../pico.scss'
	import '../app.postcss'

	import { onMount } from 'svelte'
	import { fade } from 'svelte/transition'

	import { supabaseClient } from '$db'
	import { navigating } from '$app/stores'
	import { invalidate } from '$app/navigation'
	import navigationState from '$stores/navigation'

	import Footer from '$components/layout/Footer'
	import Aside from '$components/layout/Aside'
	import Header from '$components/layout/Header'
	import Main from '$components/layout/Main'
	import PageLoader from '$components/PageLoader'

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

<!-- Header -->
<div class="container">
	<header aria-labelledby="header-heading">
		<h2 id="header-heading" class="sr-only">Header</h2>
		<Header />
	</header>

	<div class="grid">
		<div class="row">
			<aside aria-labelledby="aside-heading" class="col-xl-3">
				<h2 id="aside-heading" class="sr-only">Aside</h2>
				<Aside />
			</aside>
			<main aria-labelledby="main-heading" class="col-xl">
				<h2 id="main-heading" class="sr-only">Main</h2>
				<Main>
					<slot />
				</Main>
			</main>
		</div>
	</div>

	<footer aria-labelledby="footer-heading" class="p-4">
		<h2 id="footer-heading" class="sr-only">Footer</h2>
		<Footer />
	</footer>
</div>
