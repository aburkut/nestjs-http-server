#
# Base stage.
# This state install dependencies and compiles our TypeScript to get the JavaScript code
#
FROM node:14-alpine as ts-builder

RUN apk add --no-cache git bash

WORKDIR /usr/src/app

COPY package*.json ./
COPY . ./
RUN npm ci && npm run build:server

#
# Production stage.
# This state copies JavaScript code from builder stage for production environment
#
FROM node:14-alpine
ENV PORT=80

WORKDIR /usr/src/app

COPY package*.json ./
COPY --from=ts-builder /usr/src/app/dist ./dist
COPY --from=ts-builder /usr/src/app/node_modules ./node_modules
