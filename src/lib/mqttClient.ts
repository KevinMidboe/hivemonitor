// NB! mqtt package is imported in <head> from CDN

import { addHiveMessage, addGatewayMessageQueue } from './store';
import type { IClientOptions, MqttClient } from 'mqtt';
import type { IGatewayTelemetry, IHiveTelemetry } from './interfaces/ITelemetry';

function buildOptions(host: string) {
  const hostUrlPort = new URL(host).port;

  const options: IClientOptions = {
    port: hostUrlPort ? Number(hostUrlPort) : 80,
    protocolVersion: 5,
    keepalive: 60,
    clean: true,
    reconnectPeriod: 1000,
    connectTimeout: 30 * 1000,
    properties: {
      requestResponseInformation: true,
      requestProblemInformation: true
    }
  };

  return options;
}

function messageForwarder(topic: string) {
  if (topic.includes('/hive/')) {
    return (d: object) => addHiveMessage(d as IHiveTelemetry);
  } else if (topic.includes('/gateway/')) {
    return (d: object) => addGatewayMessageQueue(d as IGatewayTelemetry);
  }

  return () => console.log('WARN! No handler for topic:', topic);
}

function setupMQTTClient(host: string) {
  const options = buildOptions(host);
  const mqttClient: MqttClient = mqtt.connect(host, options);

  mqttClient.on('connect', () => {
    console.log(`connected to mqtt  ${new Date()}`);
    mqttClient.subscribe('telemetry/hive/+', { qos: 0 });
    mqttClient.subscribe('telemetry/gateway/+', { qos: 0 });
  });

  mqttClient.on('error', (err) => {
    console.log('mqtt client error:');
    console.log(err);
  });

  // For every message received, check if topic matches any of the message queues
  mqttClient.on('message', (topic: string, message: string) => {
    const func = messageForwarder(topic);
    const json = parseJSONMessage(message);
    if (!json) return;

    func(json);
  });
}

function parseJSONMessage(message: string): IHiveTelemetry | IGatewayTelemetry | null {
  try {
    return JSON.parse(message);
  } catch (error) {
    console.error('Unable to parse mqtt message:');
    console.error(error);
    return null;
  }
}

export default setupMQTTClient;
