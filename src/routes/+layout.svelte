<script lang="ts">
	import { onMount } from 'svelte';
	import FooterNavigation from '$lib/components/FooterNavigation.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import setupMQTTClient from '$lib/mqttClient';

	onMount(setupMQTTClient);
</script>

<div id="app">
	<slot />

	<FooterNavigation />
</div>

<Modal />
