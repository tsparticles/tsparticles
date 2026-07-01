## Project Reference

See: .planning/PROJECT.md (initialized)

**Core value:** Provide a small, high-performance, and extensible particle engine that developers can integrate into web projects with minimal configuration.

**Current focus:** Phase 2 — 4.4.0 Fluid Interaction

## Session Status — 2026-06-29

### 4.3.0 — Released ✅

All 6 features implemented and gate checks passed:
- A: GIF Shape — new `@tsparticles/shape-gif` package
- B: Background Canvas — layered background pipeline
- C: Background Mask Dynamic — `cover.element` + `cover.draw`
- D: Draw Layer System — 8 named layers replacing 11 arrays
- E: Particle Modifier System — generic `IParticleModifier` API
- F: HDR Precision — floating-point RGB pipeline

Build: 461 projects ✅ | Tests: 152/152 ✅ | No blocking issues.

### 4.4.0 — Fluid Interaction (v4 planning)

v3 implementation completed and reverted. Code did not produce fluid behavior.
See `.planning/handovers/FLUID_INTERACTION_PLAN.md` for full retrospective and v4 plan.

**v4 plan completed** (2026-06-29). Key changes from v3:
- Velocity reconstruction added (critical fix)
- Correct `q` factor in DDR displacement formula
- Explicit boundary handling (soft spring + hard clamp) instead of outModes
- Per-particle `prevPos` state for velocity reconstruction
- Confirmed ParticlesInteractorBase is the correct integration point with these fixes

### Outcome
**S1 (Vue 3 wrapper) completed**: wrapper reactivity implemented (`id`/`options`/`url` → destroy+reload, `theme` → safe `loadTheme`), demo aligned with reactive config switching, README fully documented. Plan remaining steps on `.planning/handovers/WRAPPER_REACTIVITY_PLAN.md`.

**S2 (Vue 2 wrapper) completed**: wrapper reactivity + `tsParticles.init()` fix in event-bus + `theme` prop + fixed `particlesLoaded` type + removed stale `IParticlesProps` export.

**S3 (Angular wrapper) completed**: added `OnChanges` for `id`/`options`/`url`/`theme` reactivity, `theme` `@Input()`, fixed `particlesLoaded` type to `Container | undefined`, added `tsParticles.init()` in service, demo has config switch button, README fully documented with API table and theme caveat.

**S4 (Solid wrapper) completed**: wrapper reactivity with `createEffect`/`on` tracking `id`/`options`/`url`; `theme` prop added; `particlesLoaded` callback signature fixed to `(container?: Container) => void`; demo aligned removing conditional mount.

**S5 (Qwik wrapper) completed**: wrapper reactivity implemented with `useVisibleTask$` + `track()` for prop changes; `theme` prop added; demo aligned (conditional removed, `initParticlesEngine` moved to module level); README fully documented with theme caveat.

**S6 (Astro wrapper) completed**: wrapper rewritten from constructor-only to `connectedCallback` + `attributeChangedCallback` + `disconnectedCallback` pattern with `observedAttributes` (`data-id`, `data-options`, `data-url`, `data-theme`). Race-condition guard via `#loadId` counter. `theme` prop added with safe `loadTheme` call. Demo has interactive "Switch Config" button demonstrating attribute-driven reactivity. README updated with `theme` prop, reactivity contract, and optional theme plugin caveat. Build passes.

**S11 (React docs) completed**: README props table updated with `particlesLoaded`, demo/template alignment verified.

**S12 (Preact wrapper) completed**: wrapper reactivity (`theme` prop, `loadTheme` in `loadParticles` + selective `componentDidUpdate` without refresh for theme-only changes), `container` ref type fixed to `Container | undefined`, `particlesLoaded` callback fixed with optional container param, demo keeps original constructor init + conditional render (module-level init + unconditional render causes Preact page freeze — Preact-specific limitation), README updated with `theme` prop and plugin caveat. Build passes.

### Key Findings (S22)
- `Container` type in `@tsparticles/engine` does not declare `loadTheme()` — it is injected at runtime by optional `@tsparticles/plugin-themes`. Any
  theme-prop implementation must use a type cast (`as unknown as { loadTheme?: ... }`) or bracket access.
- `tsParticles.load()` returns `Container | undefined`. All `particlesLoaded` callbacks and
  container-access code must guard against undefined.
- Six wrappers need modification: Vue 3 (Composition API), Vue 2 (class component + decorators), Angular (OnChanges), Solid (createEffect), Qwik (useVisibleTask$), Astro (custom element).
- Vue 3 guide (`websites/website/docs/guides/vue3.md`) references `:init`, `@particles-init`, and
  `particlesInit` that do not exist on the wrapper component — these must be removed from both the English source and all 9 translations.
- `export type IParticlesProps = ISourceOptions` in `vue-particles.vue` (Vue 2) causes `TS2528: multiple default exports` in the SFC compiler context — must be removed or inlined.
- **S22 findings**: All 16 wrapper guide pages lack `theme` prop documentation (even though all wrappers now support it). Reactivity contracts (id/options/url → destroy+reload) are missing from 15/16 guides. Cleanup/teardown docs missing from 15/16 guides. Nuxt guide still documents stale `@particles-init`/`@particles-destroy` events removed in S18. Solid and Svelte guides describe reactivity incorrectly (as "targeted updates" or "without recreating the instance" vs actual destroy+reload).

### Next Steps
1. ✅ **S1 Vue 3** — done
2. ✅ **S2 Vue 2** — done
3. ✅ **S3 Angular** — done
4. ✅ **S4 Solid** — done
5. ✅ **S5 Qwik** — done
6. ✅ **S6 Astro** — done: wrapper rewritten from constructor-only to `connectedCallback` + `attributeChangedCallback` + `disconnectedCallback` + `observedAttributes`, `theme` prop added, demo has reactive config switch button, README has reactivity docs.
7. ✅ **S7 Inferno** — done (callback invocation + theme support)
8. ✅ **S8 Lit** — done (theme property + particlesLoaded event + selective reactivity in update())
9. ✅ **S9 Riot** — done (onUpdated/onUnmounted lifecycle hooks, theme support, loadId race guard, demo with config switch, README aligned)
10. ✅ **S10 WebComponents** — done (`data-id`/`data-theme` added to `observedAttributes`, `attributeChangedCallback` handles both, `id` setter syncs to `data-id`, deprecated `particlesInit` event removed, README documented with observed attributes table and theme caveat, build passes)
11. ✅ **S11 React docs** — README props table updated with `particlesLoaded`, demo/template check passed
12. ✅ **S12 Preact** — wrapper (theme prop, loadTheme, selective componentDidUpdate senza refresh per solo-theme), demo (constructor init + conditional render — module-level init freeze Preact, tenuto pattern originale), README aligned
13. ✅ **S13 Svelte** — wrapper reactivity (`theme` prop, `afterUpdate` → reactive `$:` statements with `loadKey`, `loadTheme` on initial load + theme change), demo alignment (`particlesInit` → `initParticlesEngine`, Svelte 5 `mount()` API, SSR-safe dynamic imports), README with props table, reactive behavior docs, theme plugin docs. Svelte demo + SvelteKit demo both verified working by the user.
14. ✅ **S14 Stencil** — done (`theme` prop + `particlesLoaded` event + `@Watch("theme")` + demo with theme toggle + `@tsparticles/plugin-themes` installed, build passes).
15. ✅ **S15 Ember** — done (`theme` prop, `#container` instance tracking for memory leak fix, `registerDestructor` called once, `particlesLoaded` type fixed to `(container?: Container)`, template `particles.hbs` updated with `theme=@theme`, demo with config switch + theme toggle buttons, README with args table and optional plugin caveat, build passes).
16. ✅ **S16 jQuery** — done (`setTheme` method added to `ParticlesResult` type, `WeakMap<Element, Container>` for per-element container tracking, `load`/`ajax` track containers, `setTheme` method with safe `loadTheme?.()` optional plugin invocation, README updated with `setTheme` docs and theme plugin caveat, build passes).
17. ✅ **S17 Angular-fireworks** — done: `OnChanges` implemented for `id`/`options` reactivity, `#destroyed` guard prevents post-destroy execution, `#startFireworks` stops previous instance before creating new one, `ngOnDestroy` calls `.destroy()` (not `.stop()`), demo N/A (no standalone demo dir), templates N/A (no templates dir), README updated with `OnChanges` behavior docs, build passes.
18. ✅ **S18 EN docs (vue3.md)** — done: removed stale `:init`, `@particles-init`, `particlesInit` from EN guide (all examples + API table); removed Component-Level Init section; fixed `useParticles` → `useParticlesProvider`; added `theme` prop to API table with optional plugin caveat; added `theme` prop docs in Theme Switching section. File reduced from 622→575 lines.
19. ✅ **S19 9 translations (vue3.md)** — done: mirrored all S18 changes across zh, ja, hi, ru, pt, fr, de, es, it. Each file reduced from 622→~576 lines. Zero stale patterns remaining across all 10 files.
20. ✅ **S20 Validation** — done: all 13 affected wrappers build successfully, stale-pattern grep on Vue3 guides (EN + 9 translations) returns zero hits for `:init`/`@particles-init`/`particlesInit`; README consistency scan completed. All contract points documented in all 16 wrapper READMEs.
21. ✅ **S21 Final handoff** — done: README documentation gaps fixed for preact (reload contract + cleanup), stencil (safe no-op + reactivity + cleanup), ember (cleanup), jquery (reload + loaded callback + cleanup), angular-fireworks (lifecycle). All builds pass.
22. ✅ **S22 EN wrapper guide audit** — completed: all 16 EN wrapper guide pages audited against wrapper READMEs. Gap matrix produced: all 16 guides have missing `theme` prop docs, missing reactivity contracts, missing cleanup docs, or stale patterns (see S22 gap matrix in conversation). Vue3.md already clean from S18. Nuxt guide has stale `@particles-init`/`@particles-destroy` events. Solid and Svelte guides have misleading reactivity descriptions.
23. ✅ **S23 Translation alignment** — completed: all 16 EN wrapper guides fixed with `theme` prop docs, reactivity contract, cleanup docs, fixed `Container | undefined` callback types, stale Nuxt events removed, misleading Solid/Svelte descriptions corrected. Changes mirrored to all 9 translation directories (zh, ja, hi, ru, pt, fr, de, es, it) — 144 translation files updated.
