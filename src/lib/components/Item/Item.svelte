<script lang="ts">
	import type { ComponentType } from 'svelte'
	import { Icon } from '@steeze-ui/svelte-icon'

	export let icon: ComponentType
	export let iconVariant: 'outline' | 'solid' | 'mini' = 'outline'
	export let count: number
	export let active: boolean
</script>

<span class="item" class:active>
	{#if icon}
		<span class="icon">
			<Icon size="20" src={icon} theme={iconVariant} />
		</span>
	{/if}
	<span class="label">
		<slot />
	</span>

	{#if count}
		<span class="badge">{count}</span>
	{/if}
</span>

<style lang="postcss">
	.item {
		display: flex;
		align-items: center;
		justify-content: space-between;

		& .icon {
			display: flex;
			align-items: center;
			margin-right: 0.75rem;
			width: 1.25rem;
			height: 1.25rem;
		}

		& .badge {
			margin-left: auto;
			padding: 0 0.75rem;
			border-radius: 999rem;
			background-color: var(--muted-color-focus);
			color: var(--muted-color);
		}

		&.active {
			& .badge {
				background-color: var(--primary);
				color: var(--primary-inverse);
			}
		}
	}
</style>
