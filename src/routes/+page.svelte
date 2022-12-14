<script>
	import { browser } from '$app/environment'
	import { goto } from '$app/navigation'

	browser ? goto('/packages') : null
</script>

<slot />
