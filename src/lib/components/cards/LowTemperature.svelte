<script lang="ts">
    import Card from "../Card.svelte";
    import ThermometerColdIcon from "$lib/icons/thermometerCold.svelte";

    export let temperature: number | string;
    export let borderLess: boolean = false;
</script>

<Card title="low temperature" iconBackground="#05B4EC" {borderLess}>
  <ThermometerColdIcon slot="logo" fill="var(--highlight)" />

  <span slot="first-value">Under: { temperature }°C</span>
</Card>

