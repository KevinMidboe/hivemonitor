<script lang="ts">
	import GatewaySummary from '$lib/components/GatewaySummary.svelte';
	import Badge from '$lib/components/Badge.svelte';
	import Graph from '$lib/components/Graph.svelte';
	import Calendar from '$lib/components/Calendar.svelte';
	import Slider from '$lib/components/Slider.svelte';
	import Dropdown from '$lib/components/Dropdown.svelte';

	let selectedDate = 'All time';
	const updateDate = (event: CustomEvent) => {
		event.preventDefault();
		selectedDate = event.detail;
	};
</script>

<main>
	<h1>Dashboard</h1>

	<span class="header">Calendar</span>
	<div class="calendars">
		<Calendar offset={0} />
		<Calendar offset={1} />
	</div>

	<span class="header">Health</span>
	<div class="slider">
		<Slider />
	</div>

	<span class="header">Updates</span>
	<div class="badges">
		<Badge />
		<Badge />
		<Badge />
		<Badge />
	</div>

	<span class="header">Activity</span>
	<Dropdown selected={selectedDate} on:date={updateDate} />
	<div class="graphs">
		<Graph date={selectedDate} />
		<Graph date={selectedDate} />
		<Graph date={selectedDate} />

		<Graph date={selectedDate} />
		<Graph date={selectedDate} />
		<Graph date={selectedDate} />
	</div>

	<span class="header">Gateways</span>
	<GatewaySummary />
</main>

<style lang="scss">
	@mixin common-grid {
		display: grid;
		gap: 1rem;
		margin-bottom: 2rem;
	}

	.calendars {
		@include common-grid;
		grid-template-columns: 1fr;

		@media only screen and (min-width: 768px) {
			grid-template-columns: repeat(auto-fit, minmax(250px, 350px));
		}
	}

	.slider {
		@media only screen and (min-width: 768px) {
			max-width: 800px;
		}
	}

	.badges {
		@include common-grid;
		grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
	}

	.graphs {
		@include common-grid;
		grid-template-columns: 1fr;

		@media only screen and (min-width: 768px) {
			grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
		}
	}
</style>
