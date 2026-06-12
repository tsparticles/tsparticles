## Project Reference

See: .planning/PROJECT.md (initialized)

**Core value:** Provide a small, high-performance, and extensible particle engine that developers can integrate into web projects with minimal configuration.

**Current focus:** Phase 1 — Developer Experience & Docs

## Session Status — 2026-06-11

### Objective
Plan and implement wrapper reactivity (options/url/theme prop changes) across Vue 3, Vue 2, Angular, Solid, Qwik, and Astro wrappers, plus fix Vue 3 docs describing nonexistent `:init`/`@particles-init` features.

### Outcome
**Plan created at `.planning/handovers/WRAPPER_REACTIVITY_PLAN.md`.** No source changes made; session spent on research and planning only. Wrapper code and docs remain at initial state.

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
1. Implement wrapper reactivity changes per plan.
2. Fix Vue 3 documentation (remove stale `:init`, `@particles-init`, `particlesInit` references).
3. Build and test all affected packages.
