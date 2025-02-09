<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	let open = false;
	let dropdown;

	const options = ['Today', 'Yesterday', 'Last 7 Days', 'Last 30 Days', 'All time'];
	export let selected = options[options.length - 1];

	function select(option: string) {
		selected = option;
		open = false;

		dispatch('date', option);
	}

	function handleEnter(event: KeyboardEvent): boolean {
		if (!(event.code === 'Enter' || event.code === 'Space')) return false;

		event.preventDefault();
		return true;
	}
</script>

<div class="dropdown" bind:this={dropdown}>
	<button class="trigger" on:click={() => (open = !open)}>
		{selected}
		<span class="arrow">▾</span>
	</button>

	{#if open}
		<ul class="menu">
			{#each options as option}
				<li>
					<span
						tabindex="0"
						class:active={selected === option}
						on:click={() => select(option)}
						on:keydown={(event) => handleEnter(event) && select(option)}
						role="button">{option}</span
					>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	.dropdown {
		position: relative;
		display: inline-block;
		margin: 1rem 0;
	}
	.trigger {
		background-color: var(--color);
		color: var(--background);
		background-color: var(--highlight);
		color: var(--color);
		padding: 10px 15px;
		border: none;
		border-radius: 6px;
		cursor: pointer;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 150px;
	}
	.arrow {
		margin-left: auto;
	}
	.menu {
		position: absolute;
		top: 100%;
		left: 0;
		background: var(--background);
		color: var(--color);
		border-radius: 6px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
		width: 150px;
		z-index: 10;
		list-style: none;
		margin: 0.2rem 0 0 0;
		padding: 0;
		overflow: hidden;
	}
	.menu li span {
		display: block;
		width: 100%;
		padding: 10px;
		cursor: pointer;
	}
	.menu li span:hover,
	.menu li span:active {
		background: #333;
		background: var(--color);
		color: var(--background);
	}
</style>
