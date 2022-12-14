<script lang="ts">
	import RangeSlider from 'svelte-range-slider-pips'

	import { resetParams, updateParams } from '$utils/filter'
	import { getDateRange, getDateRangeDays } from '$utils/rangeSlider'
	import { daysStore } from '$stores'

	import Container from '$components/Filters/Container'
	import Title from '$components/Title'

	export let category: string

	const onChangeDays = (event: CustomEvent) => {
		$daysStore = getDateRangeDays(event.detail.value)
		updateParams()
	}
</script>

<Container {category}>
	<div class="range-slider col-xl">
		<Title size="sm" tag="span">Last updated</Title>

		<RangeSlider
			float
			values={[$daysStore]}
			formatter={(value) => getDateRange(value)}
			min={0}
			max={15}
			on:change={(event) => onChangeDays(event)}
		/>
	</div>

	<div class="col-xl" />

	<div class="col-xl">
		<button style="width: auto" on:click={resetParams}>Clear filters</button>
	</div>
</Container>
