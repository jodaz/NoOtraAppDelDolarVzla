FROM node:22-alpine AS base

FROM base AS build
WORKDIR /app
COPY package.json package-lock.json ./
COPY . .
RUN npm install 


RUN npx prisma generate
RUN npm run build

EXPOSE 3000
CMD [ "node", "dist/src/main" ]
