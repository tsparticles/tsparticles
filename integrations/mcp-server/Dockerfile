FROM node:22-alpine AS build
# NOTE: pin this to a specific digest for fully reproducible/immutable
# builds once you've verified one for your target platform(s), e.g.:
#   docker pull node:22-alpine && docker inspect --format='{{index .RepoDigests 0}}' node:22-alpine
# then replace the line above with `FROM node:22-alpine@sha256:<digest> AS build`
# (and the second FROM below with the same digest).
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
# tini acts as a proper PID 1: reaps zombie processes and forwards
# signals (SIGTERM/SIGINT) to the Node process so graceful shutdown
# actually runs instead of the container being killed outright.
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
