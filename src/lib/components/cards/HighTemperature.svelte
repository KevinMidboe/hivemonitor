<script lang="ts">
	import Card from '../Card.svelte';
	import ThermometerHotIcon from '$lib/icons/thermometerHot.svelte';

	export let temperature: string | number;
	export let borderLess: boolean = false;
</script>

<Card title="High temperature" iconBackground="#F93131" {borderLess}>
	<ThermometerHotIcon slot="logo" fill="var(--highlight)" />

	<span slot="first-value">Over: {temperature}°C</span>
</Card>
