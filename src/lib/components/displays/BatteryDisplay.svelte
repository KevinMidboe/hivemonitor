<script lang="ts">
  import Display from "$lib/components/Display.svelte";
	import BatteryIcon from "$lib/icons/Battery.svelte";
	import { formatBattery } from "$lib/telemetryFormatters";

  export let battery: string | undefined = undefined;
</script>

<Display>
  <BatteryIcon slot="icon" />

  <span slot="title">Battery</span>
  <span slot="value">{ formatBattery(battery) }% remaining</span>
</Display>


<style lang="scss">
</style>