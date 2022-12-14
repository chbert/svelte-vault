<script lang="ts">
	import { goto } from '$app/navigation'

	export let icon: any = null
	export let count: number = 0
	export let showZeroCount: boolean = false
	export let active: boolean = false
	export let href: string = ''
	export let tag = href ? 'a' : 'span'
	export let orientation: 'vertical' | 'horizontal' = 'vertical'
	export let reload = 'off'

	const onClick = (e: Event) => {
		if (e.type === 'click' || (e.type === 'keypress' && e.code === 'Enter')) {
			e.preventDefault()
			e.stopPropagation()
		}

		if (href) {
			if ((reload = '')) {
				goto(href, { invalidateAll: reload === '' })
			} else {
				goto(href)
			}
		}
	}
</script>

<svelte:element
	this={tag}
	class="item {orientation}"
	href={tag === 'a' ? href : null}
	class:active
	on:click={tag === 'button' ? (e) => onClick(e) : null}
	on:keypress={tag === 'button' ? (e) => onClick(e) : null}
	data-sveltekit-reload={tag === 'a' ? reload : null}
>
	{#if icon}
		<span class="icon">
			<iconify-icon icon={`${icon}${active ? '-solid' : ''}`} />
		</span>
	{/if}

	<div class="label">
		<slot />
	</div>

	{#if showZeroCount}
		<span class="badge">{count}</span>
	{/if}
</svelte:element>

<style lang="postcss">
	a.item:hover {
		color: var(--primary);
	}

	.item {
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: space-between;

		border-radius: 999rem;
		transition: background-color var(--transition);

		color: var(--text-color);

		&.horizontal {
			padding: 0.5rem 0.75rem;

			&:last-child {
				margin-right: 0;
			}
		}

		&.vertical {
			width: 100%;
			padding: 0.5rem 0.5rem 0.5rem 1rem;

			& .icon {
				margin-right: 1rem;
			}
		}

		&:hover {
			background-color: var(--muted-color-hover);
			text-decoration: none;
		}

		&.active {
			background-color: var(--muted-color-hover);

			&:hover {
				background-color: var(--muted-color-focus);
			}
		}

		& .icon {
			display: flex;
			align-items: center;
			margin-right: 0.5rem;
			width: 1.25rem;
			height: 1.25rem;
		}

		& .label {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			width: 100%;

			& > * {
				display: inline-block;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				width: 100%;
			}
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
