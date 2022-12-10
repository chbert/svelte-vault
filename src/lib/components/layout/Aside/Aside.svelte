<script lang="ts">
	import RangeSlider from 'svelte-range-slider-pips'
	import { categoryCounts, entriesStore } from '$stores/categories'

	import {
		getDateRange,
		getDateRangeDays,
		getDownloadsRange,
		getDownloads
	} from '$utils/rangeSlider'
	import { updateUrl } from '$utils/filter'

	import { category, term, sort, downloads, days } from '$stores'

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
			count: $categoryCounts['1']
		},
		{ label: 'Templates', value: 2, icon: Document, count: $categoryCounts['2'] },
		{
			label: 'Components',
			value: 3,
			icon: Squares2x2,
			count: $categoryCounts['3']
		},
		{ label: 'Tools', value: 4, icon: WrenchScrewdriver, count: $categoryCounts['4'] }
	]

	// Update the URL with the new filters
	const onChangeCategory = (e) => {
		$category = e.detail
		updateUrl($term, $sort, $category, $days, $downloads)
	}

	const onChangeDays = (e) => {
		$days = getDateRangeDays(e.detail.value)
		updateUrl($term, $sort, $category, $days, $downloads)
	}

	const onChangeDownloads = (e) => {
		$downloads = getDownloads(e.detail.values[0])
		updateUrl($term, $sort, $category, $days, $downloads)
	}
</script>

<div class="aside">
	<section>
		<Title tag="h2" size="lg" color="muted">Filters</Title>
	</section>

	<RadioGroup legend="Categories" {values} on:change={(e) => onChangeCategory(e)} />

	<section>
		<div class="range-slider">
			<Title size="sm" transform="uppercase" tag="span">Last updated</Title>

			<RangeSlider
				float
				values={[0]}
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
				values={[0]}
				formatter={(v) => getDownloadsRange(v)}
				min={0}
				max={6}
				on:change={(e) => onChangeDownloads(e)}
			/>
			<div class="labels">
				<span>0</span>
				<span>10,000,000+</span>
			</div>
		</div>
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
