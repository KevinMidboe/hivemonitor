<script lang="ts">
  import Display from "$lib/components/Display.svelte";
  import WeightIcon from "$lib/icons/weight.svelte";
	import { formatWeight } from "$lib/telemetryFormatters";

  export let weight: string | undefined = undefined
</script>

<Display>
  <WeightIcon slot="icon" />

  <span slot="title">Weight</span>
  <span slot="value">{ formatWeight(weight) }kg</span>
  <span slot="change">Min 22.4 - Max 24.4</span>
</Display>

<style lang="scss">

</style>