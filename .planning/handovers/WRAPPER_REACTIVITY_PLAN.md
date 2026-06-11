# Wrapper Reactivity & Vue3 Docs Plan

## Scope

Implement reactive updates for wrapper components when `options`, `url`, or `theme` props change, and align Vue 3 guide docs with actual wrapper APIs.

### In scope
- Wrappers: `vue3`, `vue2`, `angular`, `solid`, `qwik`, `astro`
- Docs: `websites/website/docs/guides/vue3.md` + all 9 translations under `websites/website/docs/{zh,ja,hi,ru,pt,fr,de,es,it}/guides/vue3.md`
- Wrapper READMEs for Vue 2/3 where behavior docs are stale

### Out of scope
- New wrapper APIs beyond `theme` support already implied by runtime capability
- Engine-level typing changes for `Container` in this phase
- Unrelated guide files (React/Svelte/etc.)

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
   - `options` change => destroy + reload particles
   - `url` change => destroy + reload particles
   - This rule is mandatory for all 6 wrappers in scope; no wrapper-specific exceptions

---

## Implementation Strategy

## Execution Steps + Status

| Step | Scope | Deliverable | Status |
|---|---|---|---|
| S1 | Baseline audit | Confirm current behavior in all 6 wrappers + current docs drift list | Pending |
| S2 | Vue 3 wrapper | Reactive reload on `options`/`url` + safe `theme` apply | Pending |
| S3 | Vue 2 wrapper | Reactive reload on `options`/`url` + safe `theme` apply | Pending |
| S4 | Angular wrapper | Reactive reload via `OnChanges` + safe `theme` apply | Pending |
| S5 | Solid wrapper | Reactive reload via effects + safe `theme` apply | Pending |
| S6 | Qwik wrapper | Reactive reload in `useVisibleTask$` + safe `theme` apply | Pending |
| S7 | Astro wrapper | Attribute-driven reload + safe `theme` apply + race guard | Pending |
| S8 | Wrapper docs/README | Document optional theme plugin + no-op behavior + reload contract | Pending |
| S9 | Vue 3 EN guide | Remove fake `init` API docs and align theme/reactivity docs | Pending |
| S10 | 9 translations | Mirror Vue 3 guide changes in all required locales | Pending |
| S11 | Validation | Builds, smoke checks, stale-pattern checks | Pending |
| S12 | Final handoff | Changelog of touched files + behavior deltas + residual risks | Pending |

Status values allowed:
- `Pending`: not started
- `In Progress`: currently being implemented
- `Blocked`: waiting on decision/fix/dependency
- `Done`: implemented and validated

Recommended execution order:
1. S1 baseline audit
2. S2-S7 wrappers (can run in parallel after S1)
3. S8 wrapper docs/readmes
4. S9 English guide
5. S10 translations
6. S11 validation
7. S12 handoff

## 1) Reactivity Pattern (All Wrappers)

Desired behavior:
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

### S8 - Wrapper docs/readmes
- required messaging in each touched doc/readme:
  - `theme` depends on `@tsparticles/plugin-themes`
  - missing plugin => safe no-op for `theme`
  - `options`/`url` changes reload particles

### S9 - Vue 3 EN guide
- file: `websites/website/docs/guides/vue3.md`
- remove fake component init APIs
- align examples/events/API table with actual wrapper capabilities

### S10 - Vue 3 translations
- files: `websites/website/docs/{zh,ja,hi,ru,pt,fr,de,es,it}/guides/vue3.md`
- mirror EN structural/code changes (mandatory)

### S11 - Validation
- run affected wrapper builds
- smoke-check runtime behavior (`options`/`url` reload, `theme` with/without plugin)
- verify no stale Vue 3 guide patterns remain

### S12 - Final handoff
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
- explicitly says `options` change reloads particles
- explicitly says `url` change reloads particles

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
| Translation drift | Maintainer rejection | High | Edit all 9 translation files in same change |
| Broken translated markdown blocks | Docs rendering issues | Medium | Manual spot-check after scripted edits |

---

## Handoff Checklist for Implementing Agent

Before coding:
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
- all 6 wrappers react to `options` and `url` updates by reloading
- all 6 wrappers safely handle `theme` updates without plugin hard dependency
- all touched wrapper docs/readmes explicitly document the optional theme-plugin dependency and no-op behavior without plugin
- TypeScript build passes for all affected wrapper packages
- Vue 3 English guide fixed and all 9 translations aligned
- no `:init` / `@particles-init` / stale `particlesInit` in Vue 3 guides
