<script lang="ts">
	import { onMount } from 'svelte';
	import { hiveMessageQueue } from '$lib/store';
	import {
		formatWeight,
		formatTemperature,
		formatHumidity,
		diffTime
	} from '$lib/telemetryFormatters';

	import HiveLogo from '$lib/icons/hive.svelte';
	import WeightLogo from '$lib/icons/weight.svelte';
	import ThermometerIcon from '$lib/icons/thermometer.svelte';
	import HumidityLogo from '$lib/icons/humidity.svelte';
	import Card from './Card.svelte';
	import HiveModal from './modals/HiveModal.svelte';
	import type { IHiveTelemetry } from '$lib/interfaces/ITelemetry';

	let sinceUpdate = 0;
	let interval: number;
	let hives: IHiveTelemetry[] = [];

	function updateHives(telemetry: IHiveTelemetry) {
		if (interval) clearInterval(interval);

		const hiveName = telemetry?.hive_name;
		if (!hiveName) return;
		sinceUpdate = diffTime(new Date(telemetry?.t));

		let hiveIndex = hives.findIndex((h) => h.hive_name === hiveName);
		if (hiveIndex >= 0) hives[hiveIndex] = telemetry;
		else hives.push(telemetry);

		hives = hives.sort((a, b) => (a.hive_name > b.hive_name ? 1 : -1));
		interval = setInterval(() => (sinceUpdate = Number((sinceUpdate + 0.1).toFixed(1))), 100);
	}

	onMount(() => hiveMessageQueue.subscribe(updateHives));
</script>

{#each hives as hive}
	<Card title={hive.hive_name} opens={HiveModal} data={hive}>
		<HiveLogo slot="logo" />

		<WeightLogo slot="first-icon" />
		<span slot="first-value">{formatWeight(hive?.weight)}kg</span>

		<ThermometerIcon slot="second-icon" />
		<span slot="second-value">{formatTemperature(hive?.temperature)}°C</span>

		<HumidityLogo slot="third-icon" />
		<span slot="third-value">{formatHumidity(hive?.humidity)}%</span>
	</Card>
{/each}

<!--
<p style="text-align: right; margin-top: 0">{sinceUpdate} s since last update</p>
-->
