FROM node:22-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build
WORKDIR /app
COPY . .
RUN pnpm config set only-allow-trusted-dependencies false
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN npx prisma generate
RUN pnpm run build

EXPOSE 3000
CMD [ "node", "dist/main" ]
