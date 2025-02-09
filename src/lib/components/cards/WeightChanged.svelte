<script lang="ts">
	import Card from '../Card.svelte';
	import WeightIcon from '$lib/icons/weight.svelte';

	export let from: string | number;
	export let to: string | number;
	export let borderLess: boolean = false;
</script>

<Card title="Weight changed" iconBackground="#F6B138" {borderLess}>
	<WeightIcon slot="logo" fill="var(--highlight)" />

	<span slot="first-value">From {from}kg to {to}kg</span>
</Card>
