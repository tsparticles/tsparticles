# Wrapper Reactivity & Vue3 Docs Plan

## Scope

Implement reactive updates for wrapper components when `options`, `url`, or `theme` props change, and align Vue 3 guide docs with actual wrapper APIs.

### In scope
- Wrappers: `vue3`, `vue2`, `angular`, `solid`, `qwik`, `astro`
- Website docs: update all affected wrapper guide pages so behavior/docs match implemented v4 wrapper behavior (not only Vue 3).
- Mandatory website set: `websites/website/docs/guides/vue3.md` + all 9 translations under `websites/website/docs/{zh,ja,hi,ru,pt,fr,de,es,it}/guides/vue3.md`.
- Wrapper READMEs: update README files for all touched wrappers (`vue3`, `vue2`, `angular`, `solid`, `qwik`, `astro`) when behavior text is stale.

### Extended alignment scope (audited, excluding wordpress)
- Also audited wrappers: `react`, `preact`, `svelte`, `stencil`, `lit`, `inferno`, `ember`, `riot`, `webcomponents`, `jquery`, `nextjs`, `nuxt2`, `nuxt3`, `nuxt4`, `angular-confetti`, `angular-fireworks`.
- These wrappers are included for **consistency fixes where clearly obsolete/misaligned behavior is found**.
- `wordpress` is explicitly excluded from this plan.

### Out of scope
- New wrapper APIs beyond `theme` support already implied by runtime capability
- Engine-level typing changes for `Container` in this phase
- Unrelated guide files (React/Svelte/etc.)

---

## Source of Truth (Critical)

This project is on **v4** with breaking changes vs v3.

Mandatory rules for implementing agents:
- **Do not rely on agent memory** for wrapper APIs or docs snippets.
- **Read the repository code first** (current branch state) before any change.
- Use tag **`3.9.1` only as a comparison baseline** to understand what changed from v3 to v4.
- If memory and repository disagree, **repository wins**.

Required comparison checkpoints (v4 vs `3.9.1`):
- wrapper props/events currently exposed
- engine init flow and provider/init gates
- loaded callback naming and timing
- docs examples that may still reflect v3 patterns

---

## Problem Statement

Current wrapper behavior is inconsistent:
- Some wrappers only load particles on mount and ignore later prop changes
- `theme` support depends on optional plugin runtime injection (`@tsparticles/plugin-themes`)
- Vue 3 guide documents nonexistent component-level `:init` / `@particles-init` usage

This creates broken expectations and stale examples.

---

## Critical Constraints (Do Not Violate)

1. **Theme plugin is optional (NON-NEGOTIABLE, MUST BE DOCUMENTED EVERYWHERE)**
   - `container.loadTheme` exists **only** if `@tsparticles/plugin-themes` is loaded
   - Without that plugin, `theme` must be a safe no-op (no crash, no throw)
   - Must call safely with optional chaining + type narrowing/cast
   - This caveat must be explicit in all updated docs/readmes touched by this work

2. **`tsParticles.load()` can return `Container | undefined`**
   - Must guard before emitting callbacks expecting `Container`

3. **Vue 3 docs translation rule is mandatory**
   - Any change in `websites/website/docs/guides/vue3.md` must be mirrored in all 9 translation files in the same PR

4. **No fake APIs in docs**
   - Remove `:init`, `@particles-init`, and any prose implying component-level `init` prop for Vue 3 wrapper

5. **Wrapper behavior must be aligned (NON-NEGOTIABLE)**
   - `id` change => destroy + reload particles
   - `options` change => destroy + reload particles
   - `url` change => destroy + reload particles
   - This rule is mandatory for all 6 wrappers in scope; no wrapper-specific exceptions

6. **Engine init must run once, components must wait**
   - Engine/plugin init is one-time bootstrap work
   - Particle components must wait until init is completed before calling `tsParticles.load`

7. **Loaded callback timing is fixed**
   - `particlesLoaded`/`loaded`/`onLoaded`/`onParticlesLoaded` must fire only **after** `tsParticles.load` resolves
   - Callback must receive the resolved container (guarding `undefined` where needed)

8. **Container cleanup on component destruction is mandatory**
   - Component unmount/destroy must call container `destroy()`
   - No orphan animations must remain active after component teardown

---

## Implementation Strategy

## Canonical Wrapper Contract (Target Behavior)

All wrappers should align to this behavior model (framework syntax may differ):

1. **Init contract**
   - Engine/plugin init is triggered once at app/bootstrap level.
   - Wrapper components wait for init completion before loading particles.

2. **Reload contract**
   - Changing `id`, `options`, or `url` causes destroy + reload.
   - Reload path is deterministic and idempotent.

3. **Theme contract**
   - `theme` prop may exist in wrappers.
   - `loadTheme` is optional runtime capability requiring `@tsparticles/plugin-themes`.
   - Without plugin, theme updates are safe no-op and documented as such.

4. **Loaded callback contract**
   - Event/callback (`particlesLoaded` / `loaded` / aliases by framework) is emitted after successful `tsParticles.load` resolution.

5. **Destroy contract**
   - On component teardown, wrapper calls `container.destroy()`.

## Execution Steps + Status

| Step | Scope                            | Deliverable                                                                         | Status  |
|------|----------------------------------|-------------------------------------------------------------------------------------|---------|
| S1   | Baseline audit                   | Confirm current behavior in all 6 wrappers + current docs drift list                | Pending |
| S1a  | v3-v4 diff audit                 | Compare current wrappers/docs with tag `3.9.1` and record breaking deltas           | Pending |
| S2   | Vue 3 wrapper                    | Reactive reload on `options`/`url` + safe `theme` apply                             | Pending |
| S3   | Vue 2 wrapper                    | Reactive reload on `options`/`url` + safe `theme` apply                             | Pending |
| S4   | Angular wrapper                  | Reactive reload via `OnChanges` + safe `theme` apply                                | Pending |
| S5   | Solid wrapper                    | Reactive reload via effects + safe `theme` apply                                    | Pending |
| S6   | Qwik wrapper                     | Reactive reload in `useVisibleTask$` + safe `theme` apply                           | Pending |
| S7   | Astro wrapper                    | Attribute-driven reload + safe `theme` apply + race guard                           | Pending |
| S8   | Extended wrapper alignment fixes | Fix obsolete code paths and non-aligned behavior found in audit (non-core wrappers) | Pending |
| S9   | Wrapper docs/README              | Document optional theme plugin + no-op behavior + reload contract                   | Pending |
| S10  | Vue 3 EN guide                   | Remove fake `init` API docs and align theme/reactivity docs                         | Pending |
| S11  | 9 translations                   | Mirror Vue 3 guide changes in all required locales                                  | Pending |
| S12  | Validation                       | Builds, smoke checks, stale-pattern checks                                          | Pending |
| S13  | Final handoff                    | Changelog of touched files + behavior deltas + residual risks                       | Pending |

Status values allowed:
- `Pending`: not started
- `In Progress`: currently being implemented
- `Blocked`: waiting on decision/fix/dependency
- `Done`: implemented and validated

Recommended execution order:
1. S1 baseline audit
2. S1a v3-v4 diff audit against tag `3.9.1`
3. S2-S7 wrappers (can run in parallel after S1/S1a)
4. S8 extended wrapper alignment fixes
5. S9 wrapper docs/readmes
6. S10 English guide
7. S11 translations
8. S12 validation
9. S13 handoff

## Detailed Sub-steps (1a, 1b, 2a...)

Use this checklist for execution tracking by agents.

### 1a-1d Baseline + v3/v4 audit
- **1a:** audit core wrappers (`vue3`, `vue2`, `angular`, `solid`, `qwik`, `astro`) for init/reload/theme/loaded/destroy behavior
- **1b:** audit extended wrappers (excluding wordpress) for obvious stale behavior/docs mismatches
- **1c:** diff current branch vs tag `3.9.1` for wrapper API/lifecycle changes and stale docs patterns
- **1d:** produce mismatch matrix (code vs docs) with priority labels (High/Medium/Low)

### 2a-2d Vue 3
- **2a:** implement reload on `id`/`options`/`url`
- **2b:** implement safe optional `theme` apply (`loadTheme` plugin-dependent)
- **2c:** ensure loaded event emitted after `tsParticles.load` resolution
- **2d:** ensure teardown destroys container

### 3a-3d Vue 2
- **3a:** implement reload on `id`/`options`/`url`
- **3b:** implement safe optional `theme` apply
- **3c:** guard callback typing for `Container | undefined`
- **3d:** ensure teardown destroys container

### 4a-4d Angular
- **4a:** implement reactive reload via `OnChanges` on `id`/`options`/`url`
- **4b:** implement safe optional `theme` apply
- **4c:** ensure loaded emit timing is post-load
- **4d:** ensure destroy lifecycle always tears down container

### 5a-5c Solid
- **5a:** implement reactive reload on `id`/`options`/`url`
- **5b:** implement safe optional `theme` apply
- **5c:** verify loaded + destroy lifecycle contract

### 6a-6c Qwik
- **6a:** track `id`/`options`/`url` and reload accordingly
- **6b:** implement safe optional `theme` apply
- **6c:** verify loaded + destroy lifecycle contract

### 7a-7d Astro
- **7a:** observe attributes for `id`/`options`/`url` and reload
- **7b:** implement safe optional `theme` apply
- **7c:** keep stale-load race protection (`loadId`-style)
- **7d:** ensure disconnect lifecycle destroys container

### 8a-8e Extended wrapper alignment (excluding wordpress)
- **8a:** Inferno: fix loaded callback gap
- **8b:** Lit: add/align loaded notification behavior
- **8c:** Riot/WebComponents: align reload + teardown semantics where low-risk
- **8d:** React README mismatch fix (`particlesLoaded` docs alignment)
- **8e:** verify delegated wrappers (`nextjs`, `nuxt2`, `nuxt3`, `nuxt4`) after upstream fixes

### 9a-9c Wrapper docs/readmes
- **9a:** update touched wrapper READMEs with canonical lifecycle contract
- **9b:** update touched website guides (excluding wordpress)
- **9c:** consistency pass: README vs website vs code must match

### 10a-10c Vue 3 EN guide
- **10a:** remove fake `:init` / `@particles-init` / `particlesInit` usage
- **10b:** document plugin-dependent `theme` behavior + safe no-op without plugin
- **10c:** align API/event table with real wrapper behavior

### 11a-11c Vue 3 translations
- **11a:** mirror EN structure changes in all 9 locales
- **11b:** mirror EN code example changes in all 9 locales
- **11c:** translation markdown sanity pass (no broken code blocks)

### 12a-12d Validation
- **12a:** build all affected wrappers
- **12b:** smoke test lifecycle contract (reload/theme/loaded/destroy)
- **12c:** stale-pattern scan (`:init`, `@particles-init`, stale `particlesInit`)
- **12d:** docs consistency scan across README + website

### 13a-13b Final handoff
- **13a:** final per-wrapper behavior matrix (before/after)
- **13b:** residual risks, deferred items, and follow-up proposals

## 1) Reactivity Pattern (All Wrappers)

Desired behavior:
- `id` change -> destroy old container -> reload with new id
- `options` change -> destroy old container -> reload with new options
- `url` change -> destroy old container -> reload from new URL
- `theme` change -> call optional `loadTheme` on existing container (no reload)

Mandatory alignment rule:
- All wrappers in scope must implement the same reload contract for `options`/`url`.
- Any wrapper that cannot meet this contract must be treated as a blocker, not deferred silently.

Ordering safeguards:
- destroy previous container before each reload
- avoid emitting loaded callback with `undefined`
- on unmount/destroy, always clean current container

## 2) `loadTheme` Typing Strategy

Use local type assertion where called (recommended for this phase):

```ts
(container as unknown as { loadTheme?: (name?: string) => Promise<void> }).loadTheme?.(theme)
```

Rationale:
- avoids unsafe global declaration merging in a cross-package change
- explicit at call site; no hidden type side effects
- works uniformly across Angular/Vue/Solid/Qwik/Astro

## 3) Docs Strategy

For Vue 3 guide:
- remove nonexistent component-level init section
- remove `:init` and `@particles-init` from examples and API table
- keep engine init guidance in global/provider sections only
- document two valid theme approaches:
  - reactive options updates
  - plugin-based `theme` switching (`@tsparticles/plugin-themes`)

For translations:
- mirror structure changes and code changes first
- preserve translated prose where possible
- ensure no stale `particlesInit` snippets remain in Vue 3 guide translations

Cross-wrapper documentation requirement:
- In every touched wrapper README/doc page, explicitly state:
  - `theme` support depends on optional `@tsparticles/plugin-themes`
  - if plugin is not loaded, `theme` updates are intentionally ignored (safe no-op)
  - `options`/`url` updates trigger container reload

---

## Wrapper-by-Wrapper Change Plan

## Step Details (Agent-Oriented)

### S1 - Baseline audit
- confirm current reload behavior for `options`/`url` in each wrapper
- confirm whether `theme` prop exists and how it behaves
- collect exact stale Vue 3 doc references (`:init`, `@particles-init`, `particlesInit`)

### S1a - v3-v4 diff audit (tag `3.9.1`)
- compare wrappers/docs between current branch and `3.9.1`
- extract concrete breaking changes that impact wrappers/docs behavior
- write a short "do not use v3 patterns" checklist for implementers

## Wrapper Audit Snapshot (excluding wordpress)

This snapshot comes from repository code inspection and is the baseline for S8 prioritization.

### High-priority misalignments (fix in this initiative)
- `angular`: no reactive reload on input changes (`id/options/url`), no `theme` support
- `vue2`: mount-only load, no reactive reload, no `theme` support
- `vue3`: no reload on `id/options/url`; `theme` prop exists but not applied
- `qwik`: no tracked reload for `id/options/url`; no `theme` support
- `astro`: one-shot load behavior; missing reactive reload and theme apply
- `inferno`: loaded callbacks documented in props but not invoked in component
- `lit`: loaded callback/event gap (reload exists but loaded notification missing)

### Medium-priority misalignments (fix if low-risk in same PR series)
- `riot`: mount-only behavior, teardown handling incomplete
- `webcomponents`: partial reload behavior (`id` handling not aligned)
- `react` README mismatch (code supports `particlesLoaded`, docs table incomplete)

### Delegated/adapter wrappers (follow upstream wrapper behavior)
- `nextjs`, `nuxt2`, `nuxt3`, `nuxt4`: mostly wrappers around React/Vue wrappers; verify docs consistency and delegated behavior after core fixes

### Specialized wrappers (different lifecycle model)
- `angular-confetti`, `angular-fireworks`, `jquery`: not pure prop-driven "Particles component" contract; keep out of strict reload-contract enforcement unless explicitly expanded later

### S2 - Vue 3 wrapper
- file: `wrappers/vue3/src/components/vue-particles.vue`
- implement watchers for `options`/`url` => reload
- implement safe optional `loadTheme`

### S3 - Vue 2 wrapper
- file: `wrappers/vue2/src/Particles/vue-particles.vue`
- implement watchers for `options`/`url` => reload
- implement safe optional `loadTheme`
- guard strict callback types against `Container | undefined`

### S4 - Angular wrapper
- file: `wrappers/angular/projects/ng-particles/src/lib/ng-particles.component.ts`
- implement/extend `OnChanges` for reload behavior
- implement safe optional `loadTheme`

### S5 - Solid wrapper
- files: `wrappers/solid/src/Particles.tsx`, `wrappers/solid/src/IParticlesProps.ts`
- reactive reload for `options`/`url`
- safe optional `loadTheme`

### S6 - Qwik wrapper
- files: `wrappers/qwik/src/components/particles/particles.tsx`, `wrappers/qwik/src/components/particles/IParticlesProps.ts`
- track `options`/`url` for reload
- track `theme` for safe optional `loadTheme`

### S7 - Astro wrapper
- file: `wrappers/astro/src/Particles.astro`
- attribute observers for options/url/theme
- reload on options/url
- safe `theme` apply + stale-load race guard

### S8 - Wrapper alignment fixes
- patch wrapper-specific obsolete code discovered in S1/S1a
- align event timing (`loaded` fired after load resolution)
- align teardown cleanup (`destroy()` always called)
- apply low-risk fixes for audited non-core wrappers where behavior/docs are clearly stale

S8 target set (excluding wordpress):
- `inferno`, `lit`, `riot`, `webcomponents`, and README alignment for `react`
- validate delegated wrappers (`nextjs`, `nuxt2`, `nuxt3`, `nuxt4`) after core wrapper fixes

### S9 - Wrapper docs/readmes
- required messaging in each touched doc/readme:
  - `theme` depends on `@tsparticles/plugin-themes`
  - missing plugin => safe no-op for `theme`
  - `id`/`options`/`url` changes reload particles
  - loaded callback/event fires after `tsParticles.load`
  - component destroy triggers container destroy
  - website docs and wrapper README must be aligned (same behavior contract, framework-specific syntax only)

### S10 - Vue 3 EN guide
- file: `websites/website/docs/guides/vue3.md`
- remove fake component init APIs
- align examples/events/API table with actual wrapper capabilities

### S11 - Vue 3 translations
- files: `websites/website/docs/{zh,ja,hi,ru,pt,fr,de,es,it}/guides/vue3.md`
- mirror EN structural/code changes (mandatory)

### S12 - Validation
- run affected wrapper builds
- smoke-check runtime behavior (`options`/`url` reload, `theme` with/without plugin)
- verify no stale Vue 3 guide patterns remain

### S13 - Final handoff
- provide concise implementation report with:
  - touched files
  - behavior change matrix per wrapper
  - docs updated list
  - known caveats or follow-ups

## Vue 3 (`wrappers/vue3/src/components/vue-particles.vue`)
- add watchers for `options` and `url` -> `loadParticles()`
- add watcher for `theme` -> safe `loadTheme` call
- preserve provider init gate + mount gate

Risk:
- duplicate initial loads due to watcher/immediate interactions

Mitigation:
- keep mount/provider checks as single source of initial load trigger

## Vue 2 (`wrappers/vue2/src/Particles/vue-particles.vue`)
- add `theme` prop
- add `@Watch("options")` + `@Watch("url")` -> reload method
- add `@Watch("theme")` -> safe `loadTheme`
- ensure loaded callback fires only when container exists

Risk:
- class-based SFC export/type quirks (`TS2528`)

Mitigation:
- avoid extra module exports in SFC script if compiler complains

## Angular (`wrappers/angular/projects/ng-particles/src/lib/ng-particles.component.ts`)
- implement/extend `OnChanges`
- on `options`/`url` changes -> reload
- on `theme` changes -> safe `loadTheme`
- emit loaded only when container exists

Risk:
- `ngOnChanges` firing before view init

Mitigation:
- guard for server platform + rely on existing init flow; keep load routine idempotent

## Solid (`wrappers/solid/src/Particles.tsx`, `wrappers/solid/src/IParticlesProps.ts`)
- use reactive effect for reload based on `options`/`url`
- effect for `theme` safe apply
- add `theme?: string` to props type if missing

Risk:
- effect loops / extra reloads

Mitigation:
- scope tracked dependencies explicitly

## Qwik (`wrappers/qwik/src/components/particles/particles.tsx`, `IParticlesProps.ts`)
- track `props.options`, `props.url`, `props.theme` in `useVisibleTask$`
- reload on `options`/`url`
- apply safe `loadTheme` after load
- add `theme?: string` to props type if missing

Risk:
- cleanup/recreate race with async load

Mitigation:
- destroy previous container first and keep cleanup robust

## Astro (`wrappers/astro/src/Particles.astro`)
- observe `data-options`, `data-url`, `data-theme`
- reload on options/url attribute changes
- safe `loadTheme` on theme changes
- keep custom element definition idempotent

Risk:
- concurrent async loads causing stale container assignment

Mitigation:
- use monotonic load token (`loadId`) and discard stale completions

---

## Docs Change Checklist (Vue 3)

Must be true after edits in each of 10 files (EN + 9 translations):
- no `:init` occurrences
- no `@particles-init` occurrences
- no component-level `particlesInit` snippets
- API table does not list `init`
- API table includes `theme` prop behavior note
- theme section explains optional plugin requirement

## Docs/README Checklist (Wrappers)

Must be true for each wrapper doc/README touched by implementation:
- explicitly says `loadTheme` requires `@tsparticles/plugin-themes`
- explicitly says missing plugin => `theme` is safe no-op
- explicitly says `id`/`options` change reloads particles
- explicitly says `url` change reloads particles
- explicitly says loaded callback/event fires after `tsParticles.load`
- explicitly says component teardown calls container `destroy()`

## Website Docs Checklist

Must be true before completion:
- website guides for changed wrappers are updated to match real v4 behavior
- Vue 3 English + 9 translations are aligned and free of stale API references
- website docs and wrapper README statements are consistent (no conflicting behavior claims)

## Compatibility & Lifecycle Policy

- Wrappers should maximize compatibility with supported versions of their host frameworks.
- Compatibility policy is wrapper-specific (example: Vue 3 wrapper does not target Vue 2).
- If backward compatibility is constrained (e.g., Angular major changes), evaluate dedicated legacy wrappers only when usage justifies maintenance cost.
- Nuxt-specific wrappers can remain separate for now; future consolidation is a separate decision.
- This plan does not force identical syntax across frameworks; it enforces consistent lifecycle semantics.

---

## Validation Plan

## Build validation
- `pnpm nx run-many -t build --projects=@tsparticles/vue3,@tsparticles/vue2,@tsparticles/angular,@tsparticles/solid,@tsparticles/qwik,@tsparticles/astro`

## Focused smoke checks
- verify each wrapper sample can change options at runtime without remount
- verify `theme` prop change is no-op (no crash) when themes plugin not loaded
- verify `theme` prop applies when plugin is loaded

## Docs validation
- grep (or equivalent) on Vue 3 guides for stale patterns
- manual read of EN + at least 3 translations to catch malformed block edits

---

## Risk Register

| Risk | Impact | Likelihood | Mitigation |
|---|---|---:|---|
| `loadTheme` type mismatch everywhere | Build failures across wrappers | High | Local cast at each call site |
| `Container | undefined` passed to strict callbacks | TS errors / runtime issues | High | Guard before callback emit |
| Over-triggered reload effects/watchers | Perf regression, flicker | Medium | Explicit dependency tracking + destroy-before-load |
| Async stale load wins race | Wrong config shown | Medium | `loadId` token (Astro), scoped async effects elsewhere |
| Agent applies v3 mental model on v4 code | Wrong API/docs changes | High | Mandatory repository-first audit + `3.9.1` diff step |
| Translation drift | Maintainer rejection | High | Edit all 9 translation files in same change |
| Broken translated markdown blocks | Docs rendering issues | Medium | Manual spot-check after scripted edits |

---

## Handoff Checklist for Implementing Agent

Before coding:
- read current repository files first; do not trust memory for wrapper APIs
- compare relevant files with tag `3.9.1` to spot v3 -> v4 behavior changes
- confirm all target files and prop type declarations
- confirm current wrapper APIs/events to avoid inventing new ones

During coding:
- keep changes minimal and wrapper-local
- do not add engine-wide typing changes in this phase
- ensure no docs mention nonexistent Vue 3 init APIs

Before handoff:
- run wrapper builds
- run docs stale-pattern checks
- include list of touched files and exact behavior deltas

---

## Definition of Done

Done only if all are true:
- all 6 wrappers react to `id`, `options`, and `url` updates by reloading (within each framework's API model)
- all 6 wrappers safely handle `theme` updates without plugin hard dependency
- all touched wrapper docs/readmes explicitly document the optional theme-plugin dependency and no-op behavior without plugin
- website docs for touched wrappers are updated and aligned with README + implementation behavior
- all wrappers emit loaded callback/event only after `tsParticles.load` resolves
- all wrappers destroy container on component teardown
- TypeScript build passes for all affected wrapper packages
- Vue 3 English guide fixed and all 9 translations aligned
- no `:init` / `@particles-init` / stale `particlesInit` in Vue 3 guides
