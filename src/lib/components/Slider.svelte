<script lang="ts">
	const percent = Math.floor(Math.random() * 100);

	const health = () => {
		if (percent > 66) {
			return 'bad';
		} else if (percent > 33) {
			return 'good';
		}
		return 'amazing';
	};
</script>

<div class="slider-container">
	<p>
		<span>Hive health</span>
		<b>{health()}</b>
	</p>

	<div class="slider">
		<div />
		<div />
		<div />

		<span style={`left: ${percent}%`} />
	</div>
</div>

<style lang="scss">
	.slider-container {
		border-radius: 1rem;
		background-color: var(--highlight);
		padding: 1rem;

		p {
			display: flex;
			justify-content: space-between;
			margin-top: 0;
		}
	}

	.slider {
		position: relative;
		display: grid;
		grid-template-columns: repeat(3, 1fr);

		div {
			width: 100%;
			height: 2rem;
		}

		div:nth-of-type(1) {
			background-color: #23c45e; // green
			border-top-left-radius: 0.5rem;
			border-bottom-left-radius: 0.5rem;
		}
		div:nth-of-type(2) {
			background-color: #e8b306; // yellow
		}
		div:nth-of-type(3) {
			background-color: #ee4443; // red
			border-top-right-radius: 0.5rem;
			border-bottom-right-radius: 0.5rem;
		}

		span {
			position: absolute;
			top: -1rem;
			height: 3rem;
			margin-top: 0.5rem;
			width: 0.8rem;
			border-radius: 0.5rem;
			background-color: var(--color);
		}
	}
</style>
