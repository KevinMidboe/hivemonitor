// NB! mqtt package is imported in <head> from CDN

import { addHiveMessage, addGatewayMessageQueue } from './store';
import type { IClientOptions, MqttClient } from 'mqtt';
import type { IGatewayTelemetry, IHiveTelemetry } from './interfaces/ITelemetry';

const options: IClientOptions = {
  port: 80,
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

function setupMQTTClient(host: string) {
  const mqttClient: MqttClient = mqtt.connect(host, options);

  mqttClient.on('connect', () => {
    console.log(`connected to mqtt  ${new Date()}`);
    mqttClient.subscribe('telemetry/hive/+', { qos: 0 });
    mqttClient.subscribe('telemetry/gateway/+', { qos: 0 });
  });

  mqttClient.on('error', (err) => {
    console.log(err);
  });

  // For every message received, check if topic matches any of the message queues
  mqttClient.on('message', (topic: string, message: string) => {
    if (topic.includes('/hive/')) {
      const json = parseJSONMessage(message);
      if (!json) return;
      addHiveMessage(json as IHiveTelemetry);
    } else if (topic.includes('/gateway/')) {
      const json = parseJSONMessage(message);
      if (!json) return;
      addGatewayMessageQueue(json as IGatewayTelemetry);
    } else {
      console.warn('got message for unexpected topic:', topic);
      console.warn('unexpected message:', message);
    }
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
