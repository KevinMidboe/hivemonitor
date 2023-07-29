<script lang="ts">
	let expand: boolean;

	const toggle = () => (expand = !expand);
</script>

<div
	class={`display ${expand ? 'expanded' : ''}`}
	on:click={toggle}
	on:keyup={(e) => e?.code === 'Enter' && toggle()}
	role="button"
	tabindex="0"
>
	<div class="icon">
		<slot name="icon" />
	</div>

	<b class="title"><slot name="title" /></b>

	<span class="value"><slot name="value" /></span>

	{#if $$slots.change != null}
		<span class="change"><slot name="change" /></span>
	{/if}
</div>

{#if expand}
	<div class="expanded">
		<p>
			Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
			labore et dolore magna aliqua. Ut enim ad minim veniam.
		</p>
	</div>
{/if}

<style lang="scss">
	.display {
		padding: 1rem;
		width: calc(100% - 2rem);
		// border: 2px solid var(--highlight);
		background-color: var(--highlight);
		border-radius: 1rem;
		cursor: pointer;
		transition: all 1s ease;
		user-select: none;
		-webkit-user-select: none;

		> * {
			display: block;
			margin-bottom: 0.66rem;
			line-height: 1;
		}

		:last-child {
			margin-bottom: 0 !important;
		}

		.icon {
			width: 1.5rem;
			height: 1.5rem;
		}

		.value {
			font-size: 1.1rem;
		}

		.change {
			font-size: 0.8rem;
		}
	}
</style>
