<script lang="ts">
	import { onMount } from 'svelte';
	import { hiveMessageQueue } from '$lib/store';
	import ModalHeader from './ModalHeader.svelte';
	import LowTemperature from '../cards/LowTemperature.svelte';
	import HighTemperature from '../cards/HighTemperature.svelte';
	import NoData from '../cards/NoData.svelte';
	import SegmentedControls from '../SegmentedControls.svelte';
	import HiveLogo from '$lib/icons/hive.svelte';
	import HumidityDisplay from '../displays/HumidityDisplay.svelte';
	import TemperatureDisplay from '../displays/TemperatureDisplay.svelte';
	import QueenDisplay from '../displays/QueenDisplay.svelte';
	import WeightDisplay from '../displays/WeightDisplay.svelte';
	import DateSeparator from '../DateSeparator.svelte';
	import WeightChanged from '../cards/WeightChanged.svelte';
	import BatteryDisplay from '../displays/BatteryDisplay.svelte';
	import type { IHiveTelemetry } from '$lib/interfaces/ITelemetry';

	export let data: any = {};

	let telemetry: IHiveTelemetry;
	const segments = ['general', 'activity', 'alarms'];
	let selectedSection: string = segments[0];

	function segmentSelected(event: CustomEvent) {
		selectedSection = event.detail;
	}

	onMount(() =>
		hiveMessageQueue.subscribe((msg) => {
			if (msg.hive_name === data.hive_name) telemetry = msg;
		})
	);
</script>

<div>
	<ModalHeader title={data?.hive_name} subtitle="Rosendal" icon={HiveLogo} />

	<SegmentedControls {segments} on:change={segmentSelected} />

	{#if selectedSection === segments[0]}
		<section class="display">
			<QueenDisplay />
			<WeightDisplay weight={telemetry?.weight} />
			<TemperatureDisplay temperature={telemetry?.temperature} />
			<HumidityDisplay humidity={telemetry?.humidity} />
			<BatteryDisplay battery={telemetry?.battery_level} />
		</section>
	{:else if selectedSection === segments[1]}
		<HighTemperature temperature="32" borderLess={true} />
		<DateSeparator date={new Date()} />
		<LowTemperature temperature="8" borderLess={true} />
		<DateSeparator date={new Date(1689845512000)} />
		<WeightChanged from="21" to="22" borderLess={true} />
		<DateSeparator date={new Date(1683717412000)} />
		<HighTemperature temperature="26" borderLess={true} />
		<DateSeparator date={new Date(1682580799000)} />

		<p>
			Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
			labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
			laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
			voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
			non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		</p>

		<p>
			Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
			labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
			laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
			voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
			non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		</p>

		<p>
			Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
			labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
			laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
			voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
			non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		</p>
	{:else if selectedSection === segments[2]}
		<NoData time="0.3" />
		<LowTemperature temperature="24" />
	{/if}
</div>

<style lang="scss">
	section.display {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 1rem;
	}
</style>
