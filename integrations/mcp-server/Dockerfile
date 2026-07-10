FROM node:22-alpine AS build
RUN corepack enable
WORKDIR /app

# Workspace root files
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY patches/ ./patches/

# Package files
COPY integrations/mcp-server/package.json integrations/mcp-server/tsconfig.json ./integrations/mcp-server/
COPY integrations/mcp-server/src/ ./integrations/mcp-server/src/

# Install only this package's dependencies
RUN pnpm install --frozen-lockfile --filter @tsparticles/mcp-server --ignore-scripts

# Build
RUN pnpm --filter @tsparticles/mcp-server exec tsc

# Copy build output + package.json to a clean directory
RUN mkdir -p /tmp/app && \
    cp -r integrations/mcp-server/dist /tmp/app/dist && \
    cp integrations/mcp-server/package.json /tmp/app/

# Install production deps outside the workspace
WORKDIR /tmp/app
RUN npm install --omit=dev --ignore-scripts

FROM node:22-alpine
RUN apk add --no-cache tini
RUN addgroup --system --gid 1001 app && adduser --system --uid 1001 app
WORKDIR /app
COPY --from=build /tmp/app ./
USER app
EXPOSE 3000
ENV PORT=3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||3000)+'/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
ENTRYPOINT ["/sbin/tini", "--"]
CMD node dist/index.js --port $PORT
