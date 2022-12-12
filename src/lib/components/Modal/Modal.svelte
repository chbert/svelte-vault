<script lang="ts">
	import { fade } from 'svelte/transition'
	import bodyClass from '$utils/bodyClass'

	export let open: boolean = false
	export let id: string = 'modal'
	export let hasCloseButton: boolean = true

	const onEscape = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			open = false
		}
	}

	//const modalIsOpen = bodyClass('modal-is-open')
	const modalIsOpening = bodyClass('modal-is-opening')
</script>

<svelte:window on:keyup={onEscape} />
<svelte:body use:modalIsOpening={open} />

{#if open}
	<dialog {open} {id} out:fade>
		<article>
			<header>
				{#if hasCloseButton}
					<a
						href="#close"
						data-target={id}
						aria-label="Close"
						class="close sr-only"
						on:click={() => (open = false)}
					>
						close
					</a>
				{/if}

				<slot name="title" />
			</header>

			<main>
				<slot name="content" />
			</main>

			{#if $$slots.footer}
				<footer>
					<slot name="footer" />
				</footer>
			{/if}
		</article>
	</dialog>
{/if}
