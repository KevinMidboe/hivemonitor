FROM node:current-alpine3.17 as builder

WORKDIR /app

COPY package*.json .
COPY *config* .
COPY yarn.lock .
COPY src/ src
COPY static/ static

ARG PUBLIC_MQTT_BROKER_WS_URL

RUN yarn install
RUN yarn run build

FROM nginx:alpine

WORKDIR /app

COPY --from=builder /app/build .
COPY ./nginx.conf /etc/nginx/nginx.conf

LABEL org.opencontainers.image.source=https://github.com/kevinmidboe/hivemonitor
LABEL org.opencontainers.image.license=MIT
