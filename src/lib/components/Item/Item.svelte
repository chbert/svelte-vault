<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon'

	export let icon: any = null
	export let iconVariant: 'outline' | 'solid' | 'mini' = 'outline'
	export let count: number = 0
	export let active: boolean = false
</script>

<span class="item" class:active>
	{#if icon}
		<span class="icon">
			<Icon size="20" src={icon} theme={iconVariant} />
		</span>
	{/if}
	<div class="label">
		<slot />
	</div>

	{#if count !== 0}
		<span class="badge">{count}</span>
	{/if}
</span>

<style lang="postcss">
	.item {
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: space-between;

		& .icon {
			display: flex;
			align-items: center;
			margin-right: 0.75rem;
			width: 1.25rem;
			height: 1.25rem;
		}

		& .label {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			width: 100%;
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
