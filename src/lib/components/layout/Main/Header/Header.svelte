<script lang="ts">
	import { updateParams, resetParams } from '$utils/filter'
	import {
		getDateRange,
		getDateRangeDays,
		getDownloadsRange,
		getDownloads
	} from '$utils/rangeSlider'
	import { daysStore, downloadsStore } from '$stores'

	import RangeSlider from 'svelte-range-slider-pips'
	import Title from '$components/Title'

	const onChangeDays = (event: CustomEvent) => {
		$daysStore = getDateRangeDays(event.detail.value)
		updateParams()
	}

	const onChangeDownloads = (event: CustomEvent) => {
		$downloadsStore = getDownloads(event.detail.values[0])
		updateParams()
	}
</script>

<section>
	<div class="range-slider">
		<Title size="sm" transform="uppercase" tag="span">Last updated</Title>

		<RangeSlider
			float
			values={[$daysStore]}
			formatter={(value) => getDateRange(value)}
			min={0}
			max={15}
			on:change={(event) => onChangeDays(event)}
		/>
		<div class="labels">
			<span>Any</span>
			<span>One year +</span>
		</div>
	</div>
</section>

<section>
	<div class="range-slider">
		<Title size="sm" transform="uppercase" tag="span">Weekly downloads</Title>

		<RangeSlider
			float
			values={[$downloadsStore]}
			formatter={(value) => getDownloadsRange(value)}
			min={0}
			max={6}
			on:change={(event) => onChangeDownloads(event)}
		/>
		<div class="labels">
			<span>Any</span>
			<span>10,000,000+</span>
		</div>
	</div>
</section>

<section>
	<button on:click={resetParams}>Clear filters</button>
</section>
