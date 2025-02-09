<script lang="ts">
	import { onMount } from 'svelte';
	import { gatewayMessageQueue } from '$lib/store';
	import ModalHeader from './ModalHeader.svelte';
	import HighTemperature from '../cards/HighTemperature.svelte';
	import LowBattery from '../cards/LowBattery.svelte';
	import NoData from '../cards/NoData.svelte';
	import SegmentedControls from '../SegmentedControls.svelte';
	import NetworkIcon from '$lib/icons/network.svelte';
	import SyncDisplay from '../displays/SyncDisplay.svelte';
	import TemperatureDisplay from '../displays/TemperatureDisplay.svelte';
	import DateSeparator from '../DateSeparator.svelte';
	import type { IGatewayTelemetry } from '$lib/interfaces/ITelemetry';

	export let data: any = {};

	let telemetry: IGatewayTelemetry;
	const segments = ['general', 'activity', 'alarms'];
	let selectedSection: string = segments[0];

	function segmentSelected(event: CustomEvent) {
		selectedSection = event.detail;
	}

	onMount(() =>
		gatewayMessageQueue.subscribe((msg) => {
			if (msg.gateway_name === data.gateway_name) telemetry = msg;
		})
	);
</script>

<div>
	<ModalHeader title={data?.gateway_name} subtitle="ID273827" icon={NetworkIcon} />

	<SegmentedControls {segments} on:change={segmentSelected} />

	{#if selectedSection === segments[0]}
		<section class="display">
			<SyncDisplay date={telemetry?.t || data?.t} />
			<TemperatureDisplay temperature={telemetry?.temperature} />
		</section>

		<p>
			Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
			labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
			laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
			voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
			non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		</p>
	{:else if selectedSection === segments[1]}
		<HighTemperature temperature="24" borderLess={true} />
		<DateSeparator date={new Date()} />
		<!-- <LowTemperature temperature="24" /> -->
		<LowBattery battery="9" borderLess={true} />
		<DateSeparator date={new Date(1689845512000)} />
		<HighTemperature temperature="23" borderLess={true} />
		<DateSeparator date={new Date(1682580799000)} />
	{:else if selectedSection === segments[2]}
		<NoData time="0.3" />
	{/if}
</div>

<style lang="scss">
	section.display {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 1rem;
	}
</style>
