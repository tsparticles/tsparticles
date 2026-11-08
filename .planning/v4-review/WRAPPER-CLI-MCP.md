# v4 review of wrappers, the CLI, and the MCP server

The second pass reviewed the same commit, `5d59d1dbbd`. It followed wrapper mount, update, and teardown paths and SSR integrations, the CLI build pipeline and generators, and the MCP server's catalog, code generation, and stdio/HTTP entrypoints. The isolated checks below use source files. The final gate uses built packages installed outside the monorepo.

## Wrappers

### V4-W01 · P1 · jQuery loses the reference to elements without IDs

**Reproduced with jQuery, jsdom, and the real engine.** Select two `<div class="particles">` elements without an `id` attribute and call `$(".particles").particles().load(options)`. Neither selected div contains a canvas. A fallback canvas appears in the document, and the public promise can return `undefined` because the first load is superseded. The wrapper checks `element.id === undefined`, although a missing ID is `""`, then passes only the ID to the engine. `ajax()` follows the same path. [jQuery load](../../wrappers/jquery/src/particles.ts#L85), [ajax](../../wrappers/jquery/src/particles.ts#L127).

**Patch.** Pass the selected element and use stable internal identities for anonymous hosts in coordination with V4-B07. Preserve replacement per host, explicit IDs, the jQuery API, the return value for the first element, and the mapping used by `setTheme()`.

**Acceptance.** Test single and multiple selections without IDs, explicit IDs, URLs, repeated calls, and themes. Verify each host's canvas and container with the real engine. Include an older load that completes after a newer one.

### V4-W02 · P1 · Load errors become unhandled rejections

**Reproduced in React.** Mount the component and make `tsParticles.load()` reject with a controlled error. An `unhandledRejection` occurs because the component calls `.then()` without an error handler. Next.js delegates rendering to React. Angular and Svelte have similar async startup paths that warrant the same regression test. Vue 3 already catches errors and checks the request generation. [React](../../wrappers/react/lib/Particles.tsx#L20), [Next.js](../../wrappers/nextjs/lib/index.tsx), [Angular](../../wrappers/angular/projects/ng-particles/src/lib/ng-particles.component.ts#L45), [Svelte](../../wrappers/svelte/src/lib/Particles.svelte#L20), [Vue 3](../../wrappers/vue3/src/components/vue-particles.vue#L25).

**Patch.** After V4-B02, handle errors at the boundary of components that start a load, using the wrapper's existing logger or reporting channel and checking that the request is current. Handle engine rejections separately from exceptions in consumer callbacks. Preserve public props, events, and bootstrap behavior.

**Acceptance.** For each affected wrapper, test rejection before and after unmount, recovery on a later load, and two loads that resolve in reverse order. Verify SSR/hydration where applicable and check for late events. For components with a default ID, also test two instances and a shadow DOM host before changing lookup. Any fix for instances without explicit IDs must preserve public IDs used by CSS and v4 consumers.

## CLI

### V4-C01 · P1 · The TypeScript build rejects valid JSONC configuration

**Reproduced.** A comment in `tsconfig.json` triggers a `SyntaxError` in `buildTS()` because `compile()` calls `JSON.parse` before handing the configuration to TypeScript. Valid tsconfig trailing commas follow the same path. [CLI compilation](../../cli/commands/build-tsc/src/utils.ts#L90).

**Patch.** Use the TypeScript configuration parser with diagnostics, the correct file, and the correct base path. Preserve fallbacks for all four formats, custom options, quiet mode, and the boolean result. Profile the cost of the four compilation passes separately in CLI and workspace builds. Prioritize acceptance of valid configurations in this patch.

**Acceptance.** Cover comments, a trailing comma, relative `extends`, and a syntax error with a diagnostic. Check all four outputs and the existing CJS fallback when there are no inputs.

### V4-C02 · P2 · Generators rewrite absolute destinations

**Reproduced in a temporary directory.** `getDestinationDir(absolutePath)` prepends the working directory to an absolute path. The generator writes to a different directory from the one requested. `create app` and the other creation prompts use this helper. [Destination resolution](../../cli/commands/create-utils/src/file-utils.ts#L66), [app prompt](../../cli/commands/create-app/src/prompts.ts#L87), [shared prompts](../../cli/commands/create-utils/src/prompt-utils.ts#L37).

**Patch.** Resolve relative paths against the working directory and honor absolute paths. Preserve the check for nonempty destinations. Keep this separate from the `build` argument, which currently specifies a source path for Prettier.

**Acceptance.** Run the CLI from a separate working directory and cover relative and absolute paths, spaces, and nonempty destinations. Exercise at least one app generator and one feature generator, with automatic installation disabled in the fixture.

### V4-C03 · P2 · The dist build can alter assets and documentation

**Reproduced.** In a test dist directory, the build alters a binary file containing the bytes of `__VERSION__` and replaces a literal placeholder in the README. The command reports success. The scan reads every file as UTF-8 and performs a text replacement. It also updates the source `package.dist.json` when the version or dependencies differ, including when the build invokes it with `--ci`. [Manifest](../../cli/commands/build-distfiles/src/utils.ts#L55), [replacement](../../cli/commands/build-distfiles/src/utils.ts#L118), [CI build](../../cli/commands/build/src/build.ts#L155).

**Patch.** Limit replacement to JS outputs and any other artifacts that use the token by contract. Preserve package versioning and check whether release scripts rely on synchronizing the template. In CI, produce the same dist manifest without rewriting the tracked template, or report the discrepancy according to the release policy. Selective scanning may also reduce build I/O. Measure files and bytes read and elapsed time for engine, All, and a package with assets.

**Acceptance.** Check matching hashes for binary assets and a README containing the literal token, JS constants substituted in CJS/ESM/browser/chunks, an equivalent dist manifest, an idempotent second pass, and a clean source tree after CI builds.

## MCP server

### V4-M01 · P1 · Plugin selection misses valid configurations

**Reproduced.** `suggestPlugins({ particles: { groups: { one: { shape: { type: "heart" } } } } })` returns zero packages. An emitter without `shape.type` yields a circle recommendation, although the runtime default is square. A configuration with an implicit emitter and a polygon emitter still omits square. [Particles and emitters](../../integrations/mcp-server/src/tools/suggestPlugins.ts#L212), [fallback](../../integrations/mcp-server/src/tools/suggestPlugins.ts#L256), [runtime default](../../plugins/emitters/src/Options/Classes/EmitterShape.ts#L5).

**Patch.** Reuse the particle options walker for groups and resolve the default separately for each emitter without a type. Preserve deduplication, response field names, and dependency registration order. Verify the suggested bundle and `alreadyInBundle` against actual transitive coverage. The suggestion can grow when it previously omitted a required loader.

**Acceptance.** Cover groups with shapes, effects, and interactions, configurations mixing implicit and explicit emitters, and a smoke test using the suggested loaders. Use the same cases to verify parity between selective loaders and the recommended bundle.

### V4-M02 · P2 · Inherited keys break plugin suggestions

**Reproduced.** `{ particles: { effect: { type: "constructor" } } }` passes validation of the options object and throws while reading `loadFunction`. Maps indexed with user-provided values can return inherited properties where the code expects a package name. Shape options, emitters, and modes use the same pattern. [Effect lookup](../../integrations/mcp-server/src/tools/suggestPlugins.ts#L193), [emitter and mode lookup and import assembly](../../integrations/mcp-server/src/tools/suggestPlugins.ts#L221), [input schema](../../integrations/mcp-server/src/validation.ts#L12).

**Patch.** Look up own properties only or use explicit maps. Treat unknown names like other uncataloged values and keep third-party plugin options open. Preserve response format and the order of valid loaders.

**Acceptance.** Test JSON options containing `constructor`, `__proto__`, `toString`, and custom names outside the catalog, including configurations with known features. Verify equivalent tool behavior over stdio and HTTP.

### V4-M03 · P2 · Installation instructions differ from generated imports

**Reproduced in the generator.** For a vanilla `particle animation`, the code imports `@tsparticles/engine` directly, but the installation list contains only `@tsparticles/slim`. The example relies on a transitive dependency being exposed, which affects consumers with isolated layouts. Existing tests primarily check strings. [Vanilla template](../../integrations/mcp-server/src/tools/generateCode.ts#L918), [installPackages assembly](../../integrations/mcp-server/src/tools/generateCode.ts#L1359), [tests](../../integrations/mcp-server/src/tools/generateCode.test.ts#L349).

**Patch.** Align direct dependencies with imports, including TypeScript types, using matching v4-compatible versions of the engine and loaders. Check the React, Vue, Svelte, and Angular templates, including Angular module imports and host-project prerequisites. Preserve response format, bundle selection, and specialized entries.

**Acceptance.** Install the generated package list in clean consumer projects with an isolated layout, compile JS/TS for each framework, and run at least one scene per format. Record framework peers separately from packages supplied by the command. Verify that compact examples retain the minimum loaders they require.

## Test results and work order

- Two Nx runs covered 50 distinct CLI, wrapper, and MCP targets. Forty passed, including every selected CLI target. Nine wrapper targets stopped because `@tsparticles/engine` could not resolve in the checkout: Angular, jQuery, Lit, React, Riot, Solid, Svelte, Vue 2, and Vue 3. Passing targets include mocked suites and still require smoke tests against built packages.
- The MCP server passed 187 tests. The only HTTP test stopped at socket creation with `listen EPERM`. The HTTP gate remains open. Rerun in CI and cover sessions, termination, invalid requests, and body size limits.
- Isolated checks used Node 26.13.0 and esbuild 0.28.2. CLI fixtures ran in temporary directories. Template and build results require packaged smoke tests through the public commands. Export-presence tests and monorepo layouts do not cover real consumers.
- Suggested order is V4-C01/C03 and V4-M01/M02 alongside the core, V4-W01 after V4-B07, and V4-W02 after V4-B02. V4-C02 and V4-M03 are independent patches. Before release, build and test affected wrappers, run CLI build/pack/create in a fixture outside the monorepo, and smoke-test MCP tools with installed packages.
