<script lang="ts">
	import params from '$utils/params'

	import { getDateRange, getDateRangeDays } from '$utils/rangeSlider'
	import { daysStore } from '$stores'

	import Container from '$components/Filters/Container'
	import ClearButton from '$components/Filters/ClearButton'
	import Slider from '$components/Slider'

	export let category: string

	const onChangeDays = (event: CustomEvent) => {
		$daysStore = getDateRangeDays(event.detail.value)
		params.update(category)
	}
</script>

<Container>
	<div class="range-slider col-xl">
		<Slider
			title="Last updated"
			values={[$daysStore]}
			formatter={(value) => getDateRange(value)}
			min={0}
			max={15}
			on:stop={(event) => onChangeDays(event)}
		/>
	</div>

	<div class="col-xl" />

	<ClearButton class="col-xl" />
</Container>
