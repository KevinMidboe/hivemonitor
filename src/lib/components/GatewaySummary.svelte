<script lang="ts">
	import { onMount } from 'svelte';
	import { gatewayMessageQueue } from '$lib/store';
	import { formatTemperature, formatBattery, diffTime } from '$lib/telemetryFormatters';

	import NetworkIcon from '$lib/icons/network.svelte';
	import SyncIcon from '$lib/icons/Sync.svelte';
	import ThermometerIcon from '$lib/icons/thermometer.svelte';
	import BatteryIcon from '$lib/icons/Battery.svelte';
	import Card from './Card.svelte';
	import GatewayModal from './modals/GatewayModal.svelte';
	import type { IGatewayTelemetry } from '$lib/interfaces/ITelemetry';

	let gateways: IGatewayTelemetry[] = [];
	let sinceUpdate = 0;
	let interval: number;

	function updateGateways(telemetry: IGatewayTelemetry) {
		if (interval) clearInterval(interval);
		sinceUpdate = 0;

		const hiveName = telemetry?.gateway_name;
		if (!hiveName) return;
		sinceUpdate = diffTime(new Date(telemetry?.t));

		let hiveIndex = gateways.findIndex((g) => g.gateway_name === hiveName);
		if (hiveIndex >= 0) gateways[hiveIndex] = telemetry;
		else gateways.push(telemetry);

		gateways = gateways.sort((a, b) => (a.gateway_name > b.gateway_name ? 1 : -1));
		interval = setInterval(() => (sinceUpdate = Math.floor(sinceUpdate + 1)), 1000);
	}

	onMount(() => gatewayMessageQueue.subscribe(updateGateways));
</script>

{#each gateways as gateway}
	<Card title={gateway.gateway_name} opens={GatewayModal} data={gateway}>
		<NetworkIcon slot="logo" />

		<ThermometerIcon slot="first-icon" />
		<span slot="first-value">{formatTemperature(gateway?.temperature)}°C</span>

		<SyncIcon slot="second-icon" />
		<span slot="second-value">{sinceUpdate} s</span>

		<BatteryIcon slot="third-icon" />
		<span slot="third-value">{formatBattery(gateway?.battery_level)} V</span>
	</Card>
{/each}
