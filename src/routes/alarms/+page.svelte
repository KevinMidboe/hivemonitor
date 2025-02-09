<script lang="ts">
	import HighTemperature from '$lib/components/cards/HighTemperature.svelte';
	import LowTemperature from '$lib/components/cards/LowTemperature.svelte';
	import LowBattery from '$lib/components/cards/LowBattery.svelte';
	import NoData from '$lib/components/cards/NoData.svelte';
	import WeightChanged from '$lib/components/cards/WeightChanged.svelte';
</script>

<main>
	<h1>Alarms</h1>

	<span class="header">Alerts</span>
	<HighTemperature temperature="32" />
	<LowTemperature temperature="10" />
	<LowBattery battery="19" />
	<NoData time="1" />
	<WeightChanged from="21" to="22" />

	<p class="read-the-docs">Click on the Vite and Svelte logos to learn more</p>
</main>

<style lang="scss">
</style>
