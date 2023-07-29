# Hive monitor

Hive monitor is a frontend for displaying data from MQTT server receiving events from bee hives. The complementary project [hivemonitor-ESP32-firmware]() reads sensor values and publishes on MQTT topic.

# Requirements

This sveltekit project requires Node.js and yarn installed:

- [node.js]()
- [yarn]()

Page requires data from MQTT topic, use a public or locally hosted MQTT broker:

- [Connect to public broker]()
- [Setup and connect to self hosted broker]()

# Config

Set `PUBLIC_MQTT_BROKER_WS_URL` environment variable for MQTT broker. Since browsers don't support MQTT natively we want to connect to MQTT over WebSockets for events.

```bash
cp .env.example .env

# edit .env in favorite text editor
```

# Run

Using docker:

```bash
docker run -d -p 8080:8080 --name hivemonitor ghcr.io/kevinmidboe/hivemonitor
```

# Setup

## Install

Clone repo, navigate into folder and install node dependencies:

```bash
git clone https://github.com/KevinMidboe/hivemonitor.git
cd hivemonitor
yarn
```

## Development

Run development server using `yarn dev` command. Add `--host` flag for allowing connections for any device on same network.

## Production

Build static files and serve them with your favorite webserver, or use included docker configuration.

Compile project into static files located at generated folder: ./build.

```bash
yarn build
```

Build and run using nginx in docker:

```bash
docker build -t hivemonitor .
docker run -p 8080:8080 --name hivemonitor-frontend hivemonitor
```
