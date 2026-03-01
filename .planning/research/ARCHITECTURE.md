# Research — Architecture (synthesized)

**Analysis Date:** 2026-03-01

Component boundaries (based on repo layout):

- Core Engine (`engine/`) — runtime, utilities, public exports.
- Feature packages (`shapes/`, `updaters/`, `plugins/`) — independent packages that register with engine hooks.
- Bundles (`bundles/*/`) — assembly layer that composes engine + features into publishable artifacts.
- Demos (`demo/`) — example apps and demo server.

Data flow & build order

1. Feature packages implement a registration contract and export entry files (`src/index.ts`).
2. Bundles import and register selected features during bundle assembly (`bundles/*/src/bundle.ts`).
3. CI builds packages (nx run-many) and publishes via publish scripts.

Where to extend

- Add features as top-level packages following the established `src/index.ts` pattern and register them in `bundles/*/src/bundle.ts` when publishing.
