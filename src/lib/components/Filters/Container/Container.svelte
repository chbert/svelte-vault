<script lang="ts">
	import '../styles.postcss'

	import { capitalize } from '$lib/utils'
	import Title from '$components/Title'

	export let category: string
</script>

<section class="filters">
	<div class="row">
		<slot />
	</div>
</section>
