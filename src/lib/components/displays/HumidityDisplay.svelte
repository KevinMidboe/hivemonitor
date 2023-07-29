<script lang="ts">
  import Display from "$lib/components/Display.svelte";
  import HumidityIcon from "$lib/icons/humidity.svelte";
	import { formatHumidity } from "$lib/telemetryFormatters";

  export let humidity: string | undefined = undefined
</script>

<Display>
 <HumidityIcon slot="icon" />

  <span slot="title">Humidity</span>
  <span slot="value">{ formatHumidity(humidity) }%</span>
  <span slot="change">Min 24 - Max 48</span>
</Display>


<style lang="scss">

</style>