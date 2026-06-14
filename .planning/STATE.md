## Project Reference

See: .planning/PROJECT.md (initialized)

**Core value:** Provide a small, high-performance, and extensible particle engine that developers can integrate into web projects with minimal configuration.

**Current focus:** Phase 1 — Developer Experience & Docs

## Session Status — 2026-06-14

### Objective
Plan and implement wrapper reactivity (options/url/theme prop changes) across Vue 3, Vue 2, Angular, Solid, Qwik, and Astro wrappers, plus fix Vue 3 docs describing nonexistent `:init`/`@particles-init` features.

### Outcome
**S1 (Vue 3 wrapper) completed**: wrapper reactivity implemented (`id`/`options`/`url` → destroy+reload, `theme` → safe `loadTheme`), demo aligned with reactive config switching, README fully documented. Plan remaining steps on `.planning/handovers/WRAPPER_REACTIVITY_PLAN.md`.

**S2 (Vue 2 wrapper) completed**: wrapper reactivity + `tsParticles.init()` fix in event-bus + `theme` prop + fixed `particlesLoaded` type + removed stale `IParticlesProps` export.

**S3 (Angular wrapper) completed**: added `OnChanges` for `id`/`options`/`url`/`theme` reactivity, `theme` `@Input()`, fixed `particlesLoaded` type to `Container | undefined`, added `tsParticles.init()` in service, demo has config switch button, README fully documented with API table and theme caveat.

### Key Findings
- `Container` type in `@tsparticles/engine` does not declare `loadTheme()` — it is injected at runtime by optional `@tsparticles/plugin-themes`. Any
  theme-prop implementation must use a type cast (`as unknown as { loadTheme?: ... }`) or bracket access.
- `tsParticles.load()` returns `Container | undefined`. All `particlesLoaded` callbacks and
  container-access code must guard against undefined.
- Six wrappers need modification: Vue 3 (Composition API), Vue 2 (class component + decorators), Angular (OnChanges), Solid (createEffect), Qwik (useVisibleTask$), Astro (custom element).
- Vue 3 guide (`websites/website/docs/guides/vue3.md`) references `:init`, `@particles-init`, and
  `particlesInit` that do not exist on the wrapper component — these must be removed from both the English source and all 9 translations.
- `export type IParticlesProps = ISourceOptions` in `vue-particles.vue` (Vue 2) causes `TS2528: multiple default exports` in the SFC compiler context — must be removed or inlined.

### Next Steps
1. ✅ **S1 Vue 3** — done
2. ✅ **S2 Vue 2** — done
3. ✅ **S3 Angular** — done
4. ❏ **S4–S6** — implement wrapper reactivity in Solid, Qwik, Astro
5. ❏ **S7–S17** — align extended wrappers (Inferno, Lit, Riot, WebComponents, React docs, Preact, Svelte, Stencil, Ember, jQuery, Angular-fireworks)
6. ❏ **S18–S19** — fix Vue 3 docs in EN + 9 translations (remove stale `:init`, `@particles-init`, `particlesInit`)
7. ❏ **S20–S21** — validation and handoff
