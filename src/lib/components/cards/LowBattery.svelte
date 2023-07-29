<script lang="ts">
    import Card from "../Card.svelte";
    import BatteryLowIcon from "$lib/icons/batteryLow.svelte";

    export let battery: number | string;
    export let borderLess: boolean = false;
</script>

<!-- <Card title="Low battery" iconBackground="#FF6B00" {borderLess}> -->
<Card title="Low battery" iconBackground="#58C73A" {borderLess}>
  <BatteryLowIcon slot="logo" fill="var(--highlight)" />

  <span slot="first-value">Under: { battery }%</span>
</Card>

