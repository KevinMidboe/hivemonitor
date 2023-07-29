import { derived, writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type IModal from '$lib/interfaces/IModal';
import type { IGatewayTelemetry, IHiveTelemetry } from './interfaces/ITelemetry';

// message queues
export const hiveMessageQueue: Writable<IHiveTelemetry> = writable();
export const gatewayMessageQueue: Writable<IGatewayTelemetry> = writable();

// setters
export const addHiveMessage = (msg: IHiveTelemetry) => hiveMessageQueue.set(msg);
export const addGatewayMessageQueue = (msg: IGatewayTelemetry) => gatewayMessageQueue.set(msg);

// modal state
export const modal: Writable<IModal | null> = writable(null);
export const modalOpen = derived(modal, ($modal) => $modal != null);
export const resetModal = () => modal.set(null);
