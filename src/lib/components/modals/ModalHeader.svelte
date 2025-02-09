<script lang="ts">
	import { onMount } from 'svelte';
	import { resetModal } from '$lib/store';
	import ArrowLeft from '$lib/icons/ArrowLeft.svelte';

	export let title: string;
	export let subtitle: string;
	export let icon: any; // eslint-disable-line

	let bodyTitleEl: HTMLElement;
	let headerTitleEl: HTMLElement;

	function createObserver() {
		const observer = new IntersectionObserver(handleIntersect, {
			root: null,
			rootMargin: '-20px 10000px 0px 0px',
			threshold: 1
		});
		observer.observe(bodyTitleEl);
	}

	function handleIntersect(entries: IntersectionObserverEntry[]) {
		entries.forEach((entry) => toggleTitle(!entry.isIntersecting));
	}

	function toggleTitle(show = true) {
		if (!headerTitleEl || !bodyTitleEl) return;

		if (show) {
			headerTitleEl.classList.add('show');
			bodyTitleEl.classList.add('hide');
		} else {
			headerTitleEl.classList.remove('show');
			bodyTitleEl.classList.remove('hide');
		}
	}

	onMount(() => createObserver());
</script>

<div class="top">
	<button class="back" on:click={resetModal} aria-label="Close">
		<ArrowLeft fill="var(--color)" />
	</button>
	<span id="header-title" bind:this={headerTitleEl}>{title}</span>
</div>

<div bind:this={bodyTitleEl} class="title-container">
	<div class="hive-icon">
		<div class="img">
			<svelte:component this={icon} />
		</div>
	</div>

	<div>
		<h1 id="modal-title">{title}</h1>
		<span>{subtitle}</span>
	</div>
</div>

<style lang="scss">
	.top {
		position: sticky;
		top: 0;
		display: flex;
		background-color: var(--background);
		padding: 1rem 0;
		z-index: 10;

		#header-title {
			display: block;
			width: 100%;
			text-align: center;
			align-items: center;
			line-height: 1.8;
			font-size: 1.2rem;
			text-transform: capitalize;
			font-weight: bold;
			opacity: 0;
			transition: visibility 350ms ease, opacity 350ms ease;
			visibility: hidden;
		}
	}

	button.back {
		height: 35px;
		width: 35px;
		padding: 0.2rem;

		border-radius: unset;
		border: unset;
		font-size: unset;
		font-weight: unset;
		font-family: unset;
		background-color: unset;
		transition: unset;
	}

	.title-container {
		display: flex;
		transition: opacity 350ms ease;
		opacity: 100%;
		margin-bottom: 1.75rem;
		align-items: center;

		.hive-icon {
			background-color: var(--highlight);
			display: grid;
			place-items: center;
			min-height: 65px;
			min-width: 65px;
			max-height: 65px;
			max-width: 65px;
			border-radius: 1rem;
			margin-right: 1rem;

			.img {
				height: 40px;
				width: 40px;
			}
		}

		h1 {
			font-size: 1.66rem;
			text-transform: capitalize;
			margin: 0;
			margin-bottom: 0.2rem;
		}
	}

	:global(#header-title.show) {
		visibility: visible !important;
		opacity: 100% !important;
	}

	:global(.title-container.hide) {
		opacity: 0 !important;
	}
</style>
