FROM node:17-alpine3.12

RUN npm install canvas-sketch-cli -g

COPY . /app
WORKDIR /app
