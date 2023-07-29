FROM node:current-alpine3.17 as builder

WORKDIR /app

COPY package*.json .
COPY *config* .
COPY .env .
COPY src/ src
COPY static/ static

RUN npm install
RUN npm run build

FROM nginx:alpine

WORKDIR /app

COPY --from=builder /app/build .
COPY ./nginx.conf /etc/nginx/nginx.conf
