<script lang="ts">
	import '../pico.scss'
	import '../app.postcss'

	import { supabaseClient } from '$db'
	import { invalidate } from '$app/navigation'
	import { onMount } from 'svelte'

	import Footer from '$components/layout/Footer'
	import Aside from '$components/layout/Aside'
	import Header from '$components/layout/Header'
	import Main from '$components/layout/Main/Main.svelte'

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

<!-- Header -->
<div class="container">
	<header aria-labelledby="header-heading">
		<h2 id="header-heading" class="sr-only">Header</h2>
		<Header />
	</header>

	<aside aria-labelledby="aside-heading">
		<h2 id="aside-heading" class="sr-only">Aside</h2>
		<Aside />
	</aside>
	<main aria-labelledby="main-heading">
		<h2 id="main-heading" class="sr-only">Main</h2>
		<Main>
			<slot />
		</Main>
	</main>
</div>

<footer aria-labelledby="footer-heading" class="p-4">
	<h2 id="footer-heading" class="sr-only">Footer</h2>
	<Footer />
</footer>

<style lang="postcss">
	.container {
		display: grid;
		grid-template-areas:
			'header header'
			'aside  main';
		grid-auto-flow: row;
		grid-template-columns: 1fr 3fr;
		gap: 1rem 2rem;
	}

	header {
		grid-area: header;
	}

	aside {
		grid-area: aside;
	}

	main {
		grid-area: main;
	}
</style>
