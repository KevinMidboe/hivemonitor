<script lang="ts">
	import { onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import { swipe } from 'svelte-gestures';
	import { modal, modalOpen, resetModal } from '$lib/store';

	import type { Unsubscriber } from 'svelte/store';

	let isOpenSubscription: Unsubscriber;
	let modalElement: HTMLElement;

	function swipeHandler(event: CustomEvent) {
		if (event.detail.direction === 'right') resetModal();
	}

	function toggleHandler(isOpen: boolean) {
		if (!browser || !modalElement) return;
		const app = document.getElementById('app');
		if (!app) return

		if (isOpen) {
			app.classList.add('no-scroll');
			app.inert = true;
			app.setAttribute('aria-hidden', 'true')
		} else {
			setTimeout(() => (modalElement.scrollTop = 0), 500);
			app.classList.remove('no-scroll');
			app.inert = false;
			app.setAttribute('aria-hidden', 'false')
		}
	}

	isOpenSubscription = modalOpen.subscribe(toggleHandler);
	onDestroy(() => isOpenSubscription());
</script>

<svelte:body aria-haspopup="dialog" />
<div
	class={`modal ${$modalOpen ? 'open' : ''}`}
	use:swipe={{ timeframe: 1000, minSwipeDistance: 1, touchAction: 'pan-right' }}
	on:swipe={swipeHandler}
	bind:this={modalElement}
	role="dialog"
	aria-modal="true"
	aria-live="assertive"
	aria-labelledby="modal-title"
>
	{#if $modal?.opens}
		<svelte:component this={$modal?.opens} data={$modal?.data} />
	{/if}
</div>

<style lang="scss">
	.modal {
		position: fixed;
		top: 0;
		left: 100vw;
		background-color: var(--background);
		height: 100vh;
		height: -webkit-fill-available;
		width: calc(100vw - 2rem);
		transition: left 400ms ease;
		padding: 0 1rem;
		overflow-y: scroll;

		&.open {
			left: 0;
		}
	}
</style>
