<script lang="ts">
	import params from '$utils/params'
	import {
		getDateRange,
		getDateRangeDays,
		getDownloadsRange,
		getDownloads,
		convertDaysToValue,
		convertDownloadsToValue
	} from '$utils/rangeSlider'
	import { daysStore, downloadsStore } from '$stores'

	import Container from '$components/Filters/Container'
	import ClearButton from '$components/Filters/ClearButton'
	import Slider from '$components/Slider'

	export let category: string

	const onChangeDays = (event: CustomEvent) => {
		$daysStore = getDateRangeDays(event.detail.value)
		params.update(category)
	}

	const onChangeDownloads = (event: CustomEvent) => {
		$downloadsStore = getDownloads(event.detail.values[0])
		params.update(category)
	}
</script>

<Container>
	<div class="col-xl">
		<Slider
			title="Last updated"
			values={[convertDaysToValue($daysStore)]}
			handleFormatter={(value) => getDateRange(value)}
			min={0}
			max={15}
			on:stop={(event) => onChangeDays(event)}
		/>
	</div>

	<div class="col-xl">
		<Slider
			title="Weekly downloads"
			values={[convertDownloadsToValue($downloadsStore)]}
			handleFormatter={(value) => getDownloadsRange(value)}
			min={0}
			max={6}
			on:stop={(event) => onChangeDownloads(event)}
		/>
	</div>

	<ClearButton class="col-xl" />
</Container>
