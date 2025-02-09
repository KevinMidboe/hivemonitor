<script lang="ts">
	const dataTypes = ["Temperature", "Pressure", "Weight", "Activity"];
	const randomOfList = (list: string[]) => list[Math.floor(Math.random() * list.length)]

	const dataType = randomOfList(dataTypes)
	const lastValue = Math.floor(((Math.random() * 30) + 10) * 10) / 10;
	const lastUpdated = Math.floor(Math.random() * 300);
</script>


<div class="badge-container">
	<div class="heading">
		<div class="metric">
			<span>{ dataType }</span>
			<b>{ lastValue }</b>
		</div>

		<span>{ lastUpdated } mins</span>
	</div>

	<div class="meta">
		<span>Up from last 2 days</span>
	</div>
</div>

<style lang="scss">

	.badge-container {
		display: flex;
		flex-direction: column;
		border-radius: 1rem;
		background-color: var(--highlight);
		padding: 0.75rem 1rem;

		.heading {
			display: flex;
			flex-direction: row;
			justify-content: space-between;

			.metric {
				display: flex;
				flex-direction: column;

				b {
					font-size: 3rem;
					font-weight: 900;
				}
			}
		}

		.meta {
			margin-top: 0.4rem;
			font-size: 0.8rem;
			opacity: 0.8;
		}
	}
</style>

