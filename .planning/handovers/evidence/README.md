# V5 execution evidence

`e0/` records the baseline at revision
`1944fa0f5c202b8af82841b5de9b2315f758a258`. Runtime sources are unchanged;
`baseline.patch` records the prerequisite import-order correction in an existing
test. Logs with `initial` or `retry` names preserve failed attempts and must not
be mistaken for passing final verification.

Run commands from the repository root. Do not clean/rebuild package output while
running consumers, tests or benchmarks against it.

```sh
NX_DAEMON=false NX_ISOLATE_PLUGINS=false NX_NO_CLOUD=true pnpm nx run @tsparticles/engine:build --configuration=ci --skipNxCache
NX_DAEMON=false NX_ISOLATE_PLUGINS=false NX_NO_CLOUD=true pnpm nx run-many -t build --projects=@tsparticles/basic,@tsparticles/slim,tsparticles,@tsparticles/all --configuration=ci --skipNxCache --output-style=static
node .planning/handovers/evidence/tools/measure-bundles.mjs .planning/handovers/evidence/e0
node .planning/handovers/evidence/tools/measure-runtime.mjs .planning/handovers/evidence/e0
NX_DAEMON=false NX_ISOLATE_PLUGINS=false NX_NO_CLOUD=true pnpm nx run @tsparticles/tests:test --output-style=static
```

The runtime harness uses installed Google Chrome with a new temporary profile.
It requires browser process permission in environments that restrict macOS
Chromium IPC. No user's browser profile is opened. The bundled Puppeteer browser
failed to launch/respond in this execution; installed Chrome worked.

`measure-bundles.mjs` resolves actual package exports via Rollup's node-resolve,
with and without the browser condition, and rejects unresolved imports. It keeps
raw/minified graphs, module identities, static/dynamic edges, per-chunk compressed
sizes, and totals including dynamic chunks. Compression is per file, modeling
separate compressed responses. These are consumer build measurements, not browser
request traces. Distribution root files are recorded individually; selecting and
validating a complete CDN page graph is a separate open gate.

`measure-runtime.mjs` uses seeded v4 RNG through the bundle's internal namespace
solely as benchmark instrumentation (not an endorsed public consumer API). It
loads all plugins explicitly, disables autoplay, and advances fixed 60 Hz ticks.
The results retain per-run median/p95/min/max, random call counts, initialization
and teardown. Wrapping update adds profiling overhead; draw is total submission
minus measured update, not GPU completion. See the result limitations before
using the numbers. Adapt the harness to public engine services in E2 and retain
the old baseline implementation for comparison.

`inventory.py` is the E0 inventory generator, not a source-review tool. Running it
again overwrites the initial matrices; do not run it over completed audit rows.
Its baseline revision and ownership assignments describe this checkpoint.

A failed or missing measurement is never zero. See `V5-BUNDLE-REPORT.md` for gate
status and numeric budgets; no savings have yet been claimed.
