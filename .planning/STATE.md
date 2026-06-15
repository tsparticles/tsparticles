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

**S4 (Solid wrapper) completed**: wrapper reactivity with `createEffect`/`on` tracking `id`/`options`/`url`; `theme` prop added; `particlesLoaded` callback signature fixed to `(container?: Container) => void`; demo aligned removing conditional mount.

**S5 (Qwik wrapper) completed**: wrapper reactivity implemented with `useVisibleTask$` + `track()` for prop changes; `theme` prop added; demo aligned (conditional removed, `initParticlesEngine` moved to module level); README fully documented with theme caveat.

**S6 (Astro wrapper) completed**: wrapper rewritten from constructor-only to `connectedCallback` + `attributeChangedCallback` + `disconnectedCallback` pattern with `observedAttributes` (`data-id`, `data-options`, `data-url`, `data-theme`). Race-condition guard via `#loadId` counter. `theme` prop added with safe `loadTheme` call. Demo has interactive "Switch Config" button demonstrating attribute-driven reactivity. README updated with `theme` prop, reactivity contract, and optional theme plugin caveat. Build passes.

**S11 (React docs) completed**: README props table updated with `particlesLoaded`, demo/template alignment verified.

**S12 (Preact wrapper) completed**: wrapper reactivity (`theme` prop, `loadTheme` in `loadParticles` + selective `componentDidUpdate` without refresh for theme-only changes), `container` ref type fixed to `Container | undefined`, `particlesLoaded` callback fixed with optional container param, demo keeps original constructor init + conditional render (module-level init + unconditional render causes Preact page freeze — Preact-specific limitation), README updated with `theme` prop and plugin caveat. Build passes.

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
4. ✅ **S4 Solid** — done
5. ✅ **S5 Qwik** — done
6. ✅ **S6 Astro** — done: wrapper rewritten from constructor-only to `connectedCallback` + `attributeChangedCallback` + `disconnectedCallback` + `observedAttributes`, `theme` prop added, demo has reactive config switch button, README has reactivity docs.
7. ✅ **S7 Inferno** — done (callback invocation + theme support)
8. ✅ **S8 Lit** — done (theme property + particlesLoaded event + selective reactivity in update())
9. ✅ **S9 Riot** — done (onUpdated/onUnmounted lifecycle hooks, theme support, loadId race guard, demo with config switch, README aligned)
10. ✅ **S10 WebComponents** — done (`data-id`/`data-theme` added to `observedAttributes`, `attributeChangedCallback` handles both, `id` setter syncs to `data-id`, deprecated `particlesInit` event removed, README documented with observed attributes table and theme caveat, build passes)
11. ✅ **S11 React docs** — README props table updated with `particlesLoaded`, demo/template check passed
12. ✅ **S12 Preact** — wrapper (theme prop, loadTheme, selective componentDidUpdate senza refresh per solo-theme), demo (constructor init + conditional render — module-level init freeze Preact, tenuto pattern originale), README aligned
13. ✅ **S13 Svelte** — wrapper reactivity (`theme` prop, `afterUpdate` → reactive `$:` statements with `loadKey`, `loadTheme` on initial load + theme change), demo alignment (`particlesInit` → `initParticlesEngine`), README with props table, reactive behavior docs, theme plugin docs. Build passes.
14. ❏ **S14–S17** — align remaining extended wrappers (Stencil, Ember, jQuery, Angular-fireworks)
15. ❏ **S18–S19** — fix Vue 3 docs in EN + 9 translations (remove stale `:init`, `@particles-init`, `particlesInit`)
16. ❏ **S20–S21** — validation and handoff
