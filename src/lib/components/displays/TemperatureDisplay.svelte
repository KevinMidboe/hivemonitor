<script lang="ts">
  import Display from "$lib/components/Display.svelte";
  import ThermometerIcon from "$lib/icons/thermometer.svelte";
	import { formatTemperature } from "$lib/telemetryFormatters";

  export let temperature: string | undefined = undefined
  export let change: string | null = '';
</script>

<Display>
  <ThermometerIcon slot="icon" />

  <span slot="title">Temperature</span>
  <span slot="value">{ formatTemperature(temperature) }°C</span>

  <span slot="change">{change}</span>
</Display>


<style lang="scss">

</style>