<script>
	// @ts-nocheck
	import './Slider.postcss'
	import RangeSlider from 'svelte-range-slider-pips'
	import Title from '$components/Title'

	export let title
	export let handleFormatter
	export let values
	export let min
	export let max
</script>

<div class="slider">
	<Title size="sm" tag="span">{title}</Title>

	<RangeSlider float {values} {handleFormatter} {min} {max} on:change on:stop on:start />
</div>

<style lang="postcss">
	:global(.rangeSlider) {
		margin-left: 0 !important;
	}
</style>
