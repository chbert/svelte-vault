<script>
	// @ts-nocheck
	import RangeSlider from 'svelte-range-slider-pips'
	import Title from '$components/Title'

	export let title
	export let formatter
	export let values
	export let min
	export let max
	export let first = null
	export let last = null
	export let pips = false
</script>

<Title size="sm" tag="span">{title}</Title>

<RangeSlider
	float
	{pips}
	{values}
	{formatter}
	{min}
	{max}
	{first}
	{last}
	springValues={{ stiffness: 1, damping: 1 }}
	on:change
	on:stop
	on:start
/>
