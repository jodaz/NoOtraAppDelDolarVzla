FROM node:20-alpine AS base

FROM base AS build
WORKDIR /app
COPY package.json package-lock.json ./
COPY . .
RUN pnpm install && pnpm run build

EXPOSE 3000
CMD [ "node", "dist/main" ]
