<script lang="ts">
	export let date: Date;

	function convertDate() {
		let [_, time] = date.toLocaleString('nb-NO').split(', '); // eslint-disable-line
		time = time.slice(0, time.length - 3);

		const diffDays = Math.floor((new Date().getTime() - date.getTime()) / 86400000);
		const d = diffDays == 0 ? 'Today' : String(diffDays) + ' days ago';
		return `${d} at ${time}`;
	}

	const dateString = convertDate();
</script>

<div class="step">
	<div class="sep" />

	<span class="date">{dateString}</span>
</div>

<style lang="scss">
	.step {
		display: flex;
		margin: 0;
		height: 2rem;
		align-items: center;

		.sep {
			margin: 0 1rem 0 1.5rem;
			width: 2px;
			height: 100%;
			background-color: var(--highlight);
		}

		span.date {
			font-size: 0.85rem;
			color: var(--color-dim);
		}
	}
</style>
