<script lang="ts">
	import params from '$utils/params'
	import { convertDaysToValue, getDateRange, getDateRangeDays } from '$utils/rangeSlider'
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
	<div class="col-xl">
		<Slider
			title="Published"
			values={[convertDaysToValue($daysStore)]}
			handleFormatter={getDateRange(value)}
			min={0}
			max={15}
			on:stop={(event) => onChangeDays(event)}
		/>
	</div>

	<div class="col-xl" />

	<ClearButton class="col-xl" />
</Container>
