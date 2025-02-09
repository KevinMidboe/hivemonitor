<script lang="ts">
	import { onMount } from 'svelte';
	import { PUBLIC_MQTT_BROKER_WS_URL } from '$env/static/public';
	import FooterNavigation from '$lib/components/FooterNavigation.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import setupMQTTClient from '$lib/mqttClient';

	onMount(() => setupMQTTClient(PUBLIC_MQTT_BROKER_WS_URL));
</script>

<div id="app">
	<slot />

	<FooterNavigation />
</div>

<Modal />
