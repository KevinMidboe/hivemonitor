<script lang="ts">
	import HiveSummary from '$lib/components/HiveSummary.svelte';
	import GatewaySummary from '$lib/components/GatewaySummary.svelte';
	import HighTemperature from '$lib/components/cards/HighTemperature.svelte';
	import LowTemperature from '$lib/components/cards/LowTemperature.svelte';
	import LowBattery from '$lib/components/cards/LowBattery.svelte';
	import NoData from '$lib/components/cards/NoData.svelte';
	import WeightChanged from '$lib/components/cards/WeightChanged.svelte';
	import Graph from '$lib/components/Graph.svelte';
</script>

<main>
	<h1>Hive monitor</h1>

	<span class="header">Hives</span>
	<div class="hive-container">
		<HiveSummary />
	</div>

	<span class="header">Graphs</span>
	<div class="graph-container">
		<Graph />
		<Graph />
	</div>

	<span class="header">Gateways</span>
	<GatewaySummary />

	<span class="header">Alerts</span>
	<HighTemperature temperature="32" />
	<LowTemperature temperature="10" />
	<LowBattery battery="19" />
	<NoData time="1" />
	<WeightChanged from="19" to="20" />
</main>

<style lang="scss">
	.graph-container {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;

		@media only screen and (min-width: 768px) {
			grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
		}
	}

	.hive-container {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
		gap: 1rem;

		@media only screen and (min-width: 768px) {
			grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
		}
	}
</style>
