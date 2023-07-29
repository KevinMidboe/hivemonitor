<script lang="ts">
    import Card from "../Card.svelte";
    import NetworkDisconnectedIcon from "$lib/icons/networkDisconnected.svelte";

    export let time: String | Number;
    export let borderLess: boolean = false;
</script>

<Card title="no data" iconBackground="#ECECEC" {borderLess}>
  <NetworkDisconnectedIcon slot="logo" fill="#213547" />

  <span slot="first-value">More than: { time } hours</span>
</Card>

