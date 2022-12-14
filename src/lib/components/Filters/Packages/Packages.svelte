<script lang="ts">
	import RangeSlider from 'svelte-range-slider-pips'

	import { resetParams, updateParams } from '$utils/filter'
	import {
		getDateRange,
		getDateRangeDays,
		getDownloadsRange,
		getDownloads
	} from '$utils/rangeSlider'
	import { daysStore, downloadsStore } from '$stores'

	import Container from '$components/Filters/Container'
	import Title from '$components/Title'

	export let category: string

	const onChangeDays = (event: CustomEvent) => {
		$daysStore = getDateRangeDays(event.detail.value)
		updateParams(category)
	}

	const onChangeDownloads = (event: CustomEvent) => {
		$downloadsStore = getDownloads(event.detail.values[0])
		updateParams(category)
	}
</script>

<Container>
	<div class="range-slider col-xl">
		<Title size="sm" tag="span">Last updated</Title>

		<RangeSlider
			float
			values={[$daysStore]}
			formatter={(value) => getDateRange(value)}
			min={0}
			max={15}
			on:stop={(event) => onChangeDays(event)}
		/>
	</div>

	<div class="range-slider col-xl">
		<Title size="sm" tag="span">Weekly downloads</Title>

		<RangeSlider
			float
			values={[$downloadsStore]}
			formatter={(value) => getDownloadsRange(value)}
			min={0}
			max={6}
			on:stop={(event) => onChangeDownloads(event)}
		/>
	</div>

	<div class="col-xl filters-action">
		<button on:click={resetParams}>Clear filters</button>
	</div>
</Container>
