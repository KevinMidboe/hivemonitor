<script lang="ts">
	import { modal } from '$lib/store';

	export let title = '';
	export let iconBackground = 'var(--background)';

	export let opens: any = null;
	export let data: any = {};
	export let borderLess = false;

	function openModal() {
		if (opens) {
			$modal = { opens, data };
		}
	}
</script>

<div
	class={`card ${borderLess ? 'border-less' : ''}`}
	on:click={openModal}
	on:keyup={(e) => e?.code === 'Enter' && openModal()}
	role="button"
	tabindex="0"
>
	<div class="hive-icon" style={`background-color: ${iconBackground}`}>
		<div class="img">
			<slot name="logo" />
		</div>
	</div>

	<div class="details">
		<div class="top-row">
			<h2>{title}</h2>
		</div>
		<div class="bottom-row">
			<div class="metric">
				<div class="icon">
					<slot name="first-icon" />
				</div>

				<span class="value"><slot name="first-value" /></span>
			</div>

			<div class="metric">
				<div class="icon">
					<slot name="second-icon" />
				</div>

				<span class="value"><slot name="second-value" /></span>
			</div>

			<div class="metric">
				<div class="icon">
					<slot name="third-icon" />
				</div>

				<span class="value"><slot name="third-value" /></span>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.card {
		display: flex;
		align-items: center;
		color: var(--color);
		background-color: var(--highlight);
		border-radius: 1rem;
		padding: 0.75rem 1rem;
		cursor: pointer;
		will-change: filter;
		transition: filter 250ms ease;
		margin-bottom: 1rem;

		&:hover {
			filter: drop-shadow(0 0 2px #646cffaa);
		}

		&.border-less {
			padding-left: 0;
			padding-right: 0;
			background-color: var(--background);
			filter: none !important;
			cursor: auto;
			margin-bottom: 0;
		}

		.hive-icon {
			background-color: var(--background);
			display: grid;
			place-items: center;
			min-height: 50px;
			min-width: 50px;
			max-height: 50px;
			max-width: 50px;
			border-radius: 1rem;
			margin-right: 1rem;

			.img {
				height: 30px;
				width: 30px;
			}
		}

		.details {
			width: 100%;
		}

		.top-row h2 {
			margin: 0 0 0.2rem 0;
			text-align: left;
			font-size: 1.1rem;
			text-transform: capitalize;
		}

		.bottom-row {
			display: flex;
			justify-content: space-between;

			.metric {
				display: flex;
				align-items: center;
			}

			.metric span {
				font-size: 0.9rem;
			}

			.metric .icon {
				max-width: 22px;
				height: 22px;
				margin-right: 0.25rem;
			}
		}
	}

	:global(.metric .icon svg) {
	}
</style>
