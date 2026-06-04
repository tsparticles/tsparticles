FROM node:22-alpine AS build
RUN corepack enable
WORKDIR /app

# Workspace root files
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./

# Package files
COPY integrations/mcp-server/package.json integrations/mcp-server/tsconfig.json ./integrations/mcp-server/
COPY integrations/mcp-server/src/ ./integrations/mcp-server/src/

# Install only this package's dependencies
RUN pnpm install --frozen-lockfile --filter @tsparticles/mcp-server

# Build
RUN pnpm --filter @tsparticles/mcp-server exec tsc

# Prune to production deps only
RUN pnpm --filter @tsparticles/mcp-server deploy --prod /tmp/app

FROM node:22-alpine
RUN addgroup --system --gid 1001 app && adduser --system --uid 1001 app
WORKDIR /app
COPY --from=build /tmp/app ./
USER app
EXPOSE 3000
ENV PORT=3000
CMD ["node", "dist/index.js", "--port", "3000"]
