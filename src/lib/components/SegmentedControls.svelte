<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let segments: string[] = [];
	let selected: string = segments[0];

	function emitChange(event: Event) {
		const target = event.target as HTMLInputElement;
		selected = segments[Number(target.id)];

		dispatch('change', selected);
	}
</script>

<div class="segmented-controls">
	{#each segments as segment, index}
		{#if selected === segment}
			<input id={String(index)} name={segment} type="radio" on:change={emitChange} checked />
		{:else}
			<input id={String(index)} name={segment} type="radio" on:change={emitChange} />
		{/if}

		<label for={String(index)}>{segment}</label>
	{/each}
</div>

<style lang="scss">
	/* 
   * Adjust z-index of last label since that contains 
   * the paddle that needs to go beneath all other labels 
   */
	.segmented-controls label:last-of-type {
		z-index: 1;
	}

	/*
   * Paddle 
   */
	.segmented-controls label:last-of-type::after {
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: -2;
		background-color: black;
		transition: inherit;
	}

	/*
   * Move paddle depending on which option is selected
   */
	@for $i from 1 through 9 {
		.segmented-controls input:nth-last-of-type(#{$i + 1}):checked ~ label:last-of-type::after {
			transform: translateX($i * -100%);
		}
	}

	/*
   * Container
   */
	.segmented-controls {
		display: flex;
		margin: 0 auto;
		overflow: hidden;
		transition: all 0.3s ease;
		top: 67px;
		border-radius: 1rem;
		min-height: 2rem;
		padding: 0.25rem;
		margin-bottom: 2rem;
		z-index: 10;
		background-color: var(--highlight);

		/*
     * Labels 
     */
		label {
			grid-row: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			text-align: center;
			cursor: pointer;
			flex: 1 1 0px;
			position: relative;
			z-index: 2;
			transition: inherit;
			text-transform: capitalize;

			font-size: 1rem;
			font-family: -apple-system, BlinkMacSystemFont, sans-serif;
			font-weight: 500;
			line-height: 1;
			padding: 1rem;
		}

		/*
     * Dividers
     */
		label:not(:first-of-type)::before {
			content: '';
			position: absolute;
			z-index: -3;
			top: 0.5rem;
			left: 0;
			bottom: 0.5rem;
			width: 1px;
			background: rgba(0, 0, 0, 0.15);
			transition: inherit;
		}

		/*
     * Vissualy hidden radiobuttons
     */
		input {
			position: absolute !important;
			height: 1px;
			width: 1px;
			overflow: hidden;
			clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
			clip: rect(1px, 1px, 1px, 1px);
			white-space: nowrap; /* added line */
		}

		/*
     * Hide dividers before and after the selected option
     */
		input:checked + label::before,
		input:checked + label + input + label::before {
			opacity: 0;
		}

		/*
     * Focus style for keyboard navigation
     */

		input:focus + label {
			box-shadow: 0 0 0 0.2rem rgba(0, 122, 255, 0.75);
		}

		/*
     * Paddle
     */
		label:last-of-type::after {
			background: var(--background);
			border-radius: 0.92rem;
			border: 0.5px solid rgba(0, 0, 0, 0.04);
			box-shadow: 0px 2px 1px rgba(0, 0, 0, 0.04), 0px 2px 3px rgba(0, 0, 0, 0.12);
		}
	}
</style>
