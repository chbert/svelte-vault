<script lang="ts">
	import { supabaseClient } from '$db'

	let loading = false
	let email: string

	const handleLogin = async () => {
		try {
			loading = true
			const { error } = await supabaseClient.auth.signInWithOtp({ email })
			if (error) throw error
			alert('Check your email for the login link!')
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message)
			}
		} finally {
			loading = false
		}
	}
</script>

<div class="container">
	<form on:submit|preventDefault={handleLogin}>
		<div class="form-widget">
			<h1 class="header">Login</h1>
			<p class="description">Sign in via magic link with your email below</p>
			<div>
				<input class="inputField" type="email" placeholder="Your email" bind:value={email} />
			</div>
			<div>
				<input
					type="submit"
					class="button block"
					value={loading ? 'Loading' : 'Send magic link'}
					disabled={loading}
				/>
			</div>
		</div>
	</form>
</div>

<style lang="postcss">
	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
	}
</style>
