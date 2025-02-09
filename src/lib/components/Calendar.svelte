<script lang="ts">
	const currentDate = new Date();
	const day = currentDate.getDay();

	const weeks = new Array(4);
	const days = new Array(7);

	const color = '#F6B139';

	function randomOpacity() {
		return `${color}${Math.floor(Math.random() * 100)}`;
	}

	let today = new Date();
	let year = today.getFullYear();
	let month = today.getMonth();

	function getDaysInMonth(year, month) {
		return new Date(year, month + 1, 0).getDate();
	}

	let daysInMonth = getDaysInMonth(year, month);
	let firstDay = new Date(year, month, 1).getDay() - 1;
</script>

<div class="calendar-container">
	<div>
		<p>January</p>
		<div class="calendar">
			{#each Array(firstDay).fill(null) as _, i}
			<div class="empty"></div>
			{/each} {#each Array(daysInMonth).fill(0).map((_, i) => i + 1) as day}
			<div class="day">
				<span style={`background: ${randomOpacity()}`}></span>
			</div>
			{/each}
		</div>
	</div>

	<div>
		<p>February</p>
		<div class="calendar">
			{#each Array(firstDay).fill(null) as _, i}
			<div class="empty"></div>
			{/each} {#each Array(daysInMonth).fill(0).map((_, i) => i + 1) as day}
			<div class="day">
				<span style={`background: ${randomOpacity()}`}></span>
			</div>
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
	.calendar-container {
		padding: 1rem;
		border-radius: 1rem;
		background-color: var(--highlight);

		@media only screen and (min-width: 768px) {
			justify-content: space-between;
		}

		p {
			text-align: center;
			margin: 0;
			margin-bottom: 0.5rem;
		}
	}

	.calendar {
		--size: calc(90vw / 8);
		display: grid;
		grid-template-columns: repeat(7, var(--size));
		gap: 5px;
		gap: 0.24rem;
		justify-content: start;

		@media only screen and (min-width: 768px) {
			--size: 28px;
		}
	}

	.day {
		background-color: #ffffff30;
		background-color: var(--highlight);
		border-radius: 50%;
	}
	.day span {
		border-radius: 50%;
		display: block;
		min-width: var(--size);
		min-height: var(--size);
		width: 100%;
		height: 100%;
		/*
				@media only screen and (min-width: 768px) {
						--size: 24px;
				}
		*/
	}
</style>
