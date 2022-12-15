<script lang="ts">
	import params from '$utils/params'

	let className = ''
	export { className as class }
</script>

<div class="{className} filters-action">
	<button on:click={params.reset}>Clear filters</button>
</div>
