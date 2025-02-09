<script lang="ts">
	import Display from '$lib/components/Display.svelte';
	import SyncIcon from '$lib/icons/Sync.svelte';
	import { diffTime } from '$lib/telemetryFormatters';

	export let date: string | undefined = undefined;

	let interval: number;
	let sinceUpdate: number;

	function resetInterval() {
		if (interval) clearInterval(interval);

		interval = setInterval(() => (sinceUpdate = Math.floor(sinceUpdate + 1)), 1000);
	}

	$: {
		sinceUpdate = diffTime(date);
		resetInterval();
	}
</script>

<Display>
	<SyncIcon slot="icon" />

	<span slot="title">Last synced</span>
	<span slot="value">{sinceUpdate}s ago</span>
</Display>

<style lang="scss">
</style>
