<script lang="ts">
	import RangeSlider from 'svelte-range-slider-pips'
	import { entriesStore } from '$stores'
	import { categoryCountsStore } from '$stores/categories'

	import {
		getDateRange,
		getDateRangeDays,
		getDownloadsRange,
		getDownloads
	} from '$utils/rangeSlider'
	import { updateParams, resetParams } from '$utils/filter'
	import { categoryStore, downloadsStore, daysStore } from '$stores'

	import Title from '$components/Title'
	import RadioGroup from '$components/form/RadioGroup'

	import {
		WrenchScrewdriver,
		BookOpen,
		Document,
		Squares2x2,
		Square3Stack3d
	} from '@steeze-ui/heroicons'

	// Radio group categories values
	const values = [
		{ label: 'All', value: 0, icon: Square3Stack3d, count: $entriesStore?.length },
		{
			label: 'Repositories',
			value: 1,
			icon: BookOpen,
			count: $categoryCountsStore['1']
		},
		{ label: 'Templates', value: 2, icon: Document, count: $categoryCountsStore['2'] },
		{
			label: 'Components',
			value: 3,
			icon: Squares2x2,
			count: $categoryCountsStore['3']
		},
		{ label: 'Tools', value: 4, icon: WrenchScrewdriver, count: $categoryCountsStore['4'] }
	]

	// Update the URL with the new filters
	const onChangeCategory = (e) => {
		$categoryStore = e.detail
		updateParams()
	}

	const onChangeDays = (e) => {
		$daysStore = getDateRangeDays(e.detail.value)
		updateParams()
	}

	const onChangeDownloads = (e) => {
		$downloadsStore = getDownloads(e.detail.values[0])
		updateParams()
	}
</script>

<div class="aside">
	<section>
		<Title tag="h2" size="lg" color="muted">Filters</Title>
	</section>

	<RadioGroup
		legend="Categories"
		{values}
		on:change={(e) => onChangeCategory(e)}
		bind:selected={$categoryStore}
	/>

	<section>
		<div class="range-slider">
			<Title size="sm" transform="uppercase" tag="span">Last updated</Title>

			<RangeSlider
				float
				values={[$daysStore]}
				formatter={(v) => getDateRange(v)}
				min={0}
				max={15}
				on:change={(e) => onChangeDays(e)}
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
				formatter={(v) => getDownloadsRange(v)}
				min={0}
				max={6}
				on:change={(e) => onChangeDownloads(e)}
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
</div>

<style lang="postcss">
	:global(.rangeSlider) {
		margin-left: 0 !important;
		margin-right: 0 !important;
	}

	.aside {
		margin-top: 1rem;
		background-color: var(--color-gray-100);

		& section {
			padding: 0.5rem 1rem;
		}

		& .range-slider {
			& .labels {
				display: flex;
				color: var(--muted-color);
				justify-content: space-between;
				margin-top: 0.5rem;
			}
		}
	}
</style>
