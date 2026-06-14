# Wrapper Reactivity & Vue3 Docs Plan — Enriched

> **Status**: Planning document (ready for agent execution)
> **Total wrappers in scope**: all wrappers in repository except `wordpress`
> **Previous version**: ~560 lines — this enriched version adds per-wrapper code analysis, type contracts, before/after code, and per-substep agent instructions.

---

## Execution Summary (Supervisor View)

Use this table as the single high-level progress board. Update it whenever a step changes state.

| Step | Area                      | Status  | Notes                                                                 |
|------|---------------------------|---------|-----------------------------------------------------------------------|
| S1   | Vue 3 wrapper             | Done    | Wrapper + demo + template check + README + verification               |
| S2   | Vue 2 wrapper             | Done    | Wrapper + demo + template check + README + verification               |
| S3   | Angular wrapper           | Done    | Wrapper + demo + template check + README + verification               |
| S4   | Solid wrapper             | Done    | Wrapper + demo + template check + README + verification               |
| S5   | Qwik wrapper              | Done    | Wrapper + demo + template check + README + verification               |
| S6   | Astro wrapper             | Done    | Wrapper + demo + template check + README + verification               |
| S7   | Inferno wrapper           | Done    | Wrapper + demo/template check + README + verification                 |
| S8   | Lit wrapper               | Done    | Wrapper + demo/template check + README + verification                 |
| S9   | Riot wrapper              | Done    | Wrapper + demo/template check + README + verification                 |
| S10  | WebComponents wrapper     | Pending | Wrapper + demo/template check + README + verification                 |
| S11  | React docs                | Pending | README alignment + demo/template check                                |
| S12  | Preact wrapper            | Pending | Drift found: missing `theme`, callback type strictness                |
| S13  | Svelte wrapper            | Pending | Drift found: missing `theme`, reload scope too broad                  |
| S14  | Stencil wrapper           | Pending | Drift found: missing `theme`, no loaded callback/event, init path gap |
| S15  | Ember wrapper             | Pending | Drift found: missing `theme`, update lifecycle cleanup risk           |
| S16  | jQuery wrapper            | Pending | Drift found: no `theme` handling/documentation in wrapper API         |
| S17  | Angular-fireworks wrapper | Pending | Drift found: missing `OnChanges`; input updates ignored after mount   |
| S18  | EN docs                   | Pending | Must finish before S19                                                |
| S19  | 9 translations            | Pending | Mirror S18                                                            |
| S20  | Validation                | Pending | Build + smoke + stale-pattern checks                                  |
| S21  | Final handoff             | Pending | Consolidated deltas and residual risks                                |

Status legend: `Pending`, `In progress`, `Blocked`, `Partial`, `Done`, `N/A`.

---

## ⚠️ CRITICAL: FILE TOUCH RULES FOR IMPLEMENTING AGENTS

**You must NEVER modify files outside these allowed paths.** This is enforced by design — the engine and accessory libraries are stable and must not be changed by wrapper work.

### ✅ ALLOWED (can create/edit)
| Path                                                                  | Notes                                                |
|-----------------------------------------------------------------------|------------------------------------------------------|
| `wrappers/<name>/**`                                                  | Wrapper package code, README, config                 |
| `demo/<name>/**`                                                      | Corresponding demo app                               |
| `websites/website/docs/guides/<name>.md`                              | English docs (one per wrapper)                       |
| `websites/website/docs/{zh,ja,hi,ru,pt,fr,de,es,it}/guides/<name>.md` | Translated docs (mirror EN)                          |
| `.planning/handovers/WRAPPER_REACTIVITY_PLAN.md`                      | This plan — update step statuses & execution records |
| `.planning/STATE.md`                                                  | Project state — update session outcome & next steps  |

### 🚫 FORBIDDEN (never touch)
| Path              | Reason                                  |
|-------------------|-----------------------------------------|
| `bundles/**`      | Bundle assembly — stable, out of scope  |
| `cli/**`          | CLI — stable, out of scope              |
| `effects/**`      | Effects — stable, out of scope          |
| `engine/**`       | Core runtime — stable, out of scope     |
| `integrations/**` | Integrations — stable, out of scope     |
| `interactions/**` | Interactions — stable, out of scope     |
| `palettes/**`     | Palettes — stable, out of scope         |
| `paths/**`        | Path generators — stable, out of scope  |
| `plugins/**`      | Plugin packages — stable, out of scope  |
| `presets/**`      | Preset configs — stable, out of scope   |
| `shapes/**`       | Shape presets — stable, out of scope    |
| `updaters/**`     | Updaters — stable, out of scope         |
| `utils/**`        | Utility packages — stable, out of scope |

**Violation policy**: If an agent touches a forbidden path, revert immediately and document the mistake. No exceptions.

---

## Scope

Implement reactive updates for wrapper components when `options`, `url`, or `theme` props change, and align Vue 3 guide docs with actual wrapper APIs.

### In scope
- **Core wrappers**: `vue3`, `vue2`, `angular`, `solid`, `qwik`, `astro`
- **Website docs**: update all affected wrapper guide pages so behavior/docs match implemented v4 wrapper behavior (not only Vue 3).
- **Mandatory website set**: `websites/website/docs/guides/vue3.md` + all 9 translations under `websites/website/docs/{zh,ja,hi,ru,pt,fr,de,es,it}/guides/vue3.md`.
- **Wrapper READMEs**: update README files for all touched wrappers (`vue3`, `vue2`, `angular`, `solid`, `qwik`, `astro`) when behavior text is stale.

### Extended alignment scope (mandatory audit + conditional implementation)
- Additional wrappers to audit and align when drift is found: `react`, `preact`, `svelte`, `stencil`, `lit`, `inferno`, `ember`, `riot`, `webcomponents`, `jquery`, `nextjs`, `nuxt2`, `nuxt3`, `nuxt4`, `angular-confetti`, `angular-fireworks`.
- These wrappers are not optional: each must be audited in execution, and if drift exists, implementation/demo/template/README alignment is required in-step.
- `wordpress` is explicitly excluded from this plan and is the only wrapper out of scope.

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
- Use tag **`v3.9.1` only as a comparison baseline** to understand what changed from v3 to v4.
- If memory and repository disagree, **repository wins**.

**Critical finding from v3.9.1 diff**: The `wrappers/` directory does NOT exist in v3.9.1. All wrapper files are new in v4. There is no direct v3→v4 diff for wrapper files. The engine `Container.ts` was significantly refactored (`Canvas → CanvasManager`, `Particles → ParticlesManager`, new `ContainerParams`). Engine changes that affect wrappers:
- `tsParticles.load()` returns `Container | undefined` (v4)
- `Container` no longer has `loadTheme` (moved to optional plugin)
- Engine init now requires explicit `tsParticles.init()` call

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

## `loadTheme` Typing Contract (from Engine + Plugin)

From `plugins/themes/src/types.ts`:
```ts
export type ThemesContainer = Container & {
  actualOptions: ThemesOptions;
  currentTheme?: string;
  loadTheme?: (name?: string) => Promise<void>;
  // ...
};
```

The `Container` class in `engine/src/Core/Container.ts` does NOT declare `loadTheme`. It is injected at runtime by `ThemesPluginInstance.init()` (line 55: `container.loadTheme = loadTheme`).

**Safe invocation pattern (use in ALL wrappers):**
```ts
(container as unknown as { loadTheme?: (name?: string) => Promise<void> }).loadTheme?.(theme);
```

Note: The `as unknown as` double-cast is needed because `Container` and `ThemesContainer` are in different packages. Do NOT use global declaration merging — it causes cross-package type pollution.

---

## Status Overview

| Wrapper     | Current Behavior                       | Reload `id/options/url`                       | `theme` prop               | Loaded Callback                                                 | Destroy on Teardown               | Priority |
|-------------|----------------------------------------|-----------------------------------------------|----------------------------|-----------------------------------------------------------------|-----------------------------------|----------|
| **Vue 3**   | Mount-only load via provider gate      | **Missing** (`theme` prop exists but ignored) | Prop exists, never applied | Emits `particlesLoaded` (ok)                                    | Yes (`onUnmounted`)               | **HIGH** |
| **Vue 2**   | Mount-only load via `mounted`          | **Missing**                                   | **Missing** prop entirely  | `particlesLoaded` prop (ok)                                     | Yes (`beforeDestroy`)             | **HIGH** |
| **Angular** | `ngAfterViewInit` only, no `OnChanges` | **Missing**                                   | **Missing** `@Input` prop  | `EventEmitter` (ok, but `Container` not `Container\|undefined`) | Yes (`ngOnDestroy`)               | **HIGH** |
| **Solid**   | `onMount` + `createResource`, one-shot | **Missing** (effect not tracked on props)     | **Missing** prop           | `particlesLoaded` fires (ok)                                    | `onCleanup`                       | **HIGH** |
| **Qwik**    | `useVisibleTask$`, one-shot            | **Missing** (no tracking)                     | **Missing** prop           | `loaded` QRL fires (ok)                                         | `cleanup`                         | **HIGH** |
| **Astro**   | Constructor load, one-shot             | **Missing** (no observer)                     | **Missing** attribute      | Global function call (ok)                                       | No `disconnectedCallback` cleanup | **HIGH** |

---

## Current State: Per-Wrapper Code Analysis

### Vue 3 (`wrappers/vue3/src/components/vue-particles.vue`) — 72 lines

**Current code**:
```vue
<template>
  <div :id="id" />
</template>

<script setup lang="ts">
import { type Container, type ISourceOptions, tsParticles } from "@tsparticles/engine";
import { nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import { useParticlesProvider } from "./particles-provider";

export type IParticlesProps = ISourceOptions;

let container: Container | undefined;

const props = defineProps<{
    id: string;
    options?: IParticlesProps;
    url?: string;
    theme?: string;
  }>(),
  emit = defineEmits<{
    (e: "particlesLoaded", container?: Container): void;
  }>(),
  provider = useParticlesProvider(),
  isMounted = ref(false),
  loadParticles = async () => {
    container?.destroy();
    container = await tsParticles.load({
      id: props.id,
      url: props.url,
      options: props.options,
    });
    emit("particlesLoaded", container);
  };

onMounted(() => {
  void nextTick(() => {
    if (!props.id) {
      throw new Error("Prop 'id' is required!");
    }
    isMounted.value = true;
  });
});

onUnmounted(() => {
  container?.destroy();
  container = undefined;
});

watch(() => provider.loaded, loaded => {
  if (loaded && isMounted.value) { void loadParticles(); }
}, { immediate: true });

watch(() => isMounted.value, mounted => {
  if (mounted && provider.loaded) { void loadParticles(); }
}, { immediate: true });
</script>
```

**Current Props interface** (explicit via `defineProps`):
```ts
{
  id: string;       // required
  options?: ISourceOptions;
  url?: string;
  theme?: string;   // EXISTS but NEVER USED
}
```

**Current Emits**:
```ts
{
  (e: "particlesLoaded", container?: Container): void;
}
```

**Provider**: `wrappers/vue3/src/components/particles-provider.ts` (92 lines)
- Uses `globalThis.__tsparticles_vue3_init_state__` singleton
- `initParticlesProvider()` calls `tsParticles.init()` after optional plugin registration
- `useParticlesProvider()` returns `{ loaded: boolean }` via Vue `inject`

**Package entry**: `wrappers/vue3/src/components/index.ts`
- Exports: `VueParticles` (default), `IParticlesProviderContext`, `IParticlesProviderOptions`, `ParticlesPluginRegistrar`
- Does NOT export `useParticlesProvider`

**Gaps**:
1. No watcher on `props.id` — changing id does nothing
2. No watcher on `props.options` — changing options does nothing
3. No watcher on `props.url` — changing url does nothing
4. `theme` prop exists but is never applied via `loadTheme`
5. `IParticlesProps` is `ISourceOptions` (wrong name — it shadows the props type)

---

### Vue 2 (`wrappers/vue2/src/Particles/vue-particles.vue`) — 62 lines

**Current code**:
```vue
<template>
  <div :id="id" />
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { type Container, type ISourceOptions, tsParticles } from "@tsparticles/engine";
import Vue from "vue";
import { isParticlesInitialized, waitForParticlesInitialization } from "./event-bus";

export type IParticlesProps = ISourceOptions;

async function particlesInit(component: Particles): Promise<void> {
  if (!component.id) {
    throw new Error("Prop 'id' is required!");
  }
  await waitForParticlesInitialization();
  if (!isParticlesInitialized()) {
    throw new Error("...");
  }
  const cb = (container?: Container) => {
    component.container = container;
    if (component.container && component.particlesLoaded) {
      component.particlesLoaded(component.container);
    }
  };
  const container = await tsParticles.load({
    id: component.id,
    options: component.options ?? {},
    url: component.url,
  });
  cb(container);
}

@Component
export default class Particles extends Vue {
  @Prop({ required: true }) readonly id!: string;
  @Prop() readonly options?: IParticlesProps;
  @Prop() readonly url?: string;
  @Prop() readonly particlesLoaded?: (container: Container) => void;

  container?: Container;

  mounted(): void {
    this.$nextTick(() => { void particlesInit(this); });
  }

  beforeDestroy(): void {
    this.container?.destroy();
  }
}
</script>
```

**Current props**: `id` (required), `options?`, `url?`, `particlesLoaded?`
**Missing `theme` prop**: not declared
**Gaps**:
1. No `theme` prop
2. No watchers on `id`, `options`, `url`
3. `export type IParticlesProps = ISourceOptions` — this creates `TS2528` (duplicate default export) in SFC compiler context because the component itself is the default export. Must be removed or inlined.
4. `particlesLoaded` callback type is `(container: Container) => void` but `tsParticles.load()` returns `Container | undefined` — type mismatch

**Event bus** (`wrappers/vue2/src/Particles/event-bus.ts`):
- `ensureParticlesInitialization(init?)` — runs optional init callback, sets `initialized = true`
- Does NOT call `tsParticles.init()` — this is a v3→v4 gap! In v4, `tsParticles.init()` must be called after plugin registration

---

### Angular (`wrappers/angular/projects/ng-particles/src/lib/ng-particles.component.ts`) — 55 lines

**Current code**:
```ts
import { AfterViewInit, Component, EventEmitter, Inject, Input, OnDestroy, Output, PLATFORM_ID } from "@angular/core";
import { isPlatformServer } from "@angular/common";
import { tsParticles } from "@tsparticles/engine";
import type { Container } from "@tsparticles/engine";
import { IParticlesProps } from "./ng-particles.module";
import { NgParticlesService } from "./ng-particles.service";

@Component({
  selector: "ngx-particles",
  standalone: false,
  template: '<div [id]="id"></div>',
})
export class NgxParticlesComponent implements AfterViewInit, OnDestroy {
  @Input() options?: IParticlesProps;
  @Input() url?: string;
  @Input() id = "tsparticles";
  @Output() particlesLoaded: EventEmitter<Container> = new EventEmitter<Container>();

  #container?: Container;
  #loadingPromise?: Promise<void>;
  readonly #particlesService: NgParticlesService;

  constructor(
    @Inject(PLATFORM_ID) protected platformId: string,
    particlesService: NgParticlesService,
  ) {
    this.#particlesService = particlesService;
  }

  public ngAfterViewInit(): void {
    if (isPlatformServer(this.platformId)) { return; }
    this.#loadingPromise = this.#loadParticles();
  }

  public ngOnDestroy(): void {
    this.#container?.destroy();
    this.#loadingPromise = undefined;
  }

  async #loadParticles(): Promise<void> {
    await this.#particlesService.waitForInitialization();
    this.#particlesService.assertInitialized();
    this.#container?.destroy();
    const container = await tsParticles.load({ id: this.id, options: this.options, url: this.url });
    this.#container = container;
    this.particlesLoaded.emit(container);  // BUG: emits Container | undefined as Container
  }
}
```

**Current `@Input()`**: `options?`, `url?`, `id` (default `"tsparticles"`)
**Missing `@Input()`**: `theme?`
**Missing interface**: `OnChanges` — no `ngOnChanges` implemented
**Gaps**:
1. No `ngOnChanges` — prop changes silently ignored
2. No `theme` input
3. `particlesLoaded` emitter is typed `EventEmitter<Container>` but should be `EventEmitter<Container | undefined>` (or emit guard)
4. Service (`ng-particles.service.ts`) does NOT call `tsParticles.init()` — v4 gap

**Service** (`ng-particles.service.ts`):
```ts
public async init(particlesInit?: ParticlesPluginRegistrar): Promise<void> {
  // calls particlesInit(tsParticles)
  // sets initialized = true
  // Does NOT call tsParticles.init() — MISSING in v4
}
```

---

### Solid (`wrappers/solid/src/Particles.tsx`) — 53 lines

**Current code**:
```tsx
import { tsParticles } from "@tsparticles/engine";
import { createEffect, createResource, JSX, mergeProps, on, onCleanup, onMount } from "solid-js";
import type { IParticlesProps } from "./IParticlesProps";
import { isParticlesEngineInitialized, waitForParticlesEngineInitialization } from "./initParticlesEngine";

const Particles = (props: IParticlesProps): JSX.Element => {
  const config = mergeProps({ id: "tsparticles" }, props);

  onMount(() => {
    const [container] = createResource(
      () => ({
        id: config.id,
        options: config.params ?? config.options ?? {},
        url: config.url,
      }),
      async data => {
        await waitForParticlesEngineInitialization();
        if (!isParticlesEngineInitialized()) {
          throw new Error("...");
        }
        return tsParticles.load(data);
      },
    );

    createEffect(
      on(container, container => {
        if (!container) return;
        config.particlesLoaded?.(container);
        onCleanup(() => container.destroy());
      }),
    );
  });

  return (
    <div class={config.class} id={config.id}>
      <canvas class={config.canvasClass} style={{ ...config.style, width: config.width, height: config.height }} />
    </div>
  );
};
```

**Current props** (`IParticlesProps.ts`):
```ts
export interface IParticlesProps {
  id?: string;
  width?: string;
  height?: string;
  options?: ISourceOptions;
  url?: string;
  params?: ISourceOptions;
  style?: JSX.CSSProperties;
  class?: string;
  canvasClass?: string;
  container?: { current: Container };
  particlesLoaded?: (container: Container) => Promise<void>;
}
```

**Gaps**:
1. `onMount` is one-shot — no reactivity to prop changes
2. `createResource` is not keyed on `props.id`, `props.options`, `props.url` — no reload
3. No `theme` prop in `IParticlesProps`
4. `particlesLoaded` type is `(container: Container) => Promise<void>` should be `(container?: Container) => Promise<void>`
5. Cleanup via `onCleanup` inside `createEffect` only fires when container resource changes, not on component unmount proper. Need explicit `onCleanup` at top level.

---

### Qwik (`wrappers/qwik/src/components/particles/particles.tsx`) — 63 lines

**Current code**:
```tsx
import { NoSerialize, component$, noSerialize, useVisibleTask$ } from "@builder.io/qwik";
import { Container, tsParticles } from "@tsparticles/engine";
import type { IParticlesProps } from "./IParticlesProps";
import { isParticlesEngineInitialized, waitForParticlesEngineInitialization } from "./initParticlesEngine";

const Particles = component$<IParticlesProps>(props => {
  const librarySig: { value: NoSerialize<Container | undefined> } = { value: undefined };
  const id = props.id ?? "tsparticles";
  const { class: className, canvasClassName, height, width, loaded } = props;

  useVisibleTask$(function Initializer({ cleanup }) {
    void (async () => {
      await waitForParticlesEngineInitialization();
      if (!isParticlesEngineInitialized()) {
        throw new Error("...");
      }
      const container = await tsParticles.load({
        url: props.url, id, options: props.options ?? props.params,
      });
      if (props.container) {
        props.container.value = noSerialize(container);
      }
      librarySig.value = noSerialize(container);
      if (loaded) {
        await loaded(container);
      }
    })();

    cleanup(() => {
      if (librarySig.value) {
        librarySig.value.destroy();
        librarySig.value = undefined;
      }
    });
  });

  // render...
});
```

**Current props** (`IParticlesProps.ts`):
```ts
export interface IParticlesProps {
  id?: string;
  width?: number | string;
  height?: number | string;
  options?: ISourceOptions;
  url?: string;
  params?: ISourceOptions;
  style?: CSSProperties;
  class?: ClassList | Signal<ClassList>;
  canvasClassName?: ClassList | Signal<ClassList>;
  container?: Signal<NoSerialize<Container | undefined>>;
  loaded?: QRL<(container?: Container) => Promise<void>>;
}
```

**Gaps**:
1. `useVisibleTask$` runs once when element becomes visible — does NOT re-run on prop changes
2. No `theme` prop in `IParticlesProps`
3. No tracking mechanism for `props.id`, `props.options`, `props.url` changes
4. In Qwik, signals must be tracked explicitly. Need `useVisibleTask$` with tracker function or `$track` to observe prop changes

---

### Astro (`wrappers/astro/src/Particles.astro`) — 79 lines

**Current code**:
```astro
---
import type { Container, ISourceOptions } from "@tsparticles/engine";

export interface IParticlesProps {
  id: string;
  loaded?: string;
  options?: ISourceOptions;
  url?: string;
}

const { id, loaded, options, url } = Astro.props as IParticlesProps;
---

<astro-particles data-id={id} data-options={JSON.stringify(options)} data-url={url} data-loaded={loaded}>
  <canvas></canvas>
</astro-particles>

<script>
  import { tsParticles } from "@tsparticles/engine";

  class AstroParticles extends HTMLElement {
    constructor() {
      super();
      (async () => {
        const { isParticlesEngineInitialized, waitForParticlesEngineInitialization }
          = await import("@tsparticles/astro");

        await waitForParticlesEngineInitialization();
        if (!isParticlesEngineInitialized()) {
          for (let i = 0; i < 20 && !isParticlesEngineInitialized(); i++) {
            await new Promise((resolve) => setTimeout(resolve, 0));
            await waitForParticlesEngineInitialization();
          }
        }
        if (!isParticlesEngineInitialized()) {
          throw new Error("...");
        }

        let container;
        if (this.dataset.url) {
          container = await tsParticles.load({ id: this.dataset.id, url: this.dataset.url });
        } else if (this.dataset.options) {
          container = await tsParticles.load({ id: this.dataset.id, options: JSON.parse(this.dataset.options) });
        }

        if (this.dataset.loaded && this.dataset.loaded in globalStore) {
          const loadedFn = globalStore[this.dataset.loaded];
          if (loadedFn instanceof Function) { loadedFn(container); }
        }
      })();
    }
  }

  customElements.define("astro-particles", AstroParticles);
</script>
```

**Gaps**:
1. Constructor-only load — no `connectedCallback` or `attributeChangedCallback`
2. No `observedAttributes` — Astro particles are rendered via data attributes but changes are not observed
3. No `disconnectedCallback` — no cleanup when element is removed from DOM
4. No `theme` support (no `data-theme` attribute, no `loadTheme` call)
5. `dataset.options` is a JSON string — must re-parse on every attribute change
6. Async race: multiple constructor calls could overlap (the custom element constructor runs once, but attribute changes later have no handler)
7. The `globalStore` pattern for `loaded` callback is fragile — uses `window` global

---

## Extended Wrappers: Current State (Inferno/Lit/Riot/WebComponents/React)

### Inferno (`wrappers/inferno/src/Particles.tsx`) — ALREADY has reload!

**Current state** (actually already has reactive reload via `componentDidUpdate`):
```tsx
componentDidUpdate(prevProps: IParticlesProps) {
  if (
    prevProps.id !== this.props.id ||
    prevProps.url !== this.props.url ||
    prevProps.options !== this.props.options
  ) {
    void this.reloadContainer();
  }
}
```

**But**: No `theme` prop. `loaded` callback exists in props but is NOT called after load (only `particlesLoaded` — actually neither is called in current code!). `loadContainer()` does NOT fire any callback.

**Gaps**:
1. No `loaded`/`particlesLoaded` callback invocation after `tsParticles.load`
2. No `theme` prop
3. No safe `loadTheme` apply

**Props type** (`IParticlesProps.ts`):
```ts
export interface IParticlesProps {
  id?: string; width?: string; height?: string;
  options?: ISourceOptions; url?: string; params?: ISourceOptions;
  className?: string; canvasClassName?: string; style?: Record<string, unknown>;
  container?: { current?: Container };
  loaded?: (container?: Container) => Promise<void> | void;
  particlesLoaded?: (container?: Container) => Promise<void> | void;
}
```

---

### Lit (`wrappers/lit/src/lit-tsparticles.ts`) — ALREADY has reload!

**Current state** (reload via `update()` lifecycle):
```ts
update(changedProperties: PropertyValues) {
  super.update(changedProperties);
  void this.#loadParticles(++this.#renderId);
}

async #loadParticles(currentRenderId: number): Promise<void> {
  // ... destroy old, load new, check renderId for stale race
}
```

**Gaps**:
1. No `theme` property
2. No `loadTheme` invocation
3. No loaded notification event/callback (container assigned but no event fired)

**Current properties**: `id`, `options`, `url`
**Missing**: `theme`, loaded notification

---

### Riot (`wrappers/riot/src/riot-particles.riot`) — Mount-only

**Current state**:
```riot
export default {
  async onMounted(props) {
    // ... one-shot load
  }
}
```

**Gaps**:
1. No reactivity (Riot doesn't have built-in watchers; would need manual attribute observer)
2. No `theme` prop
3. `particlesLoaded` callback uses `tsParticles.dom().find(...)` for old container cleanup (v3 pattern)
4. Teardown: no explicit container destroy on unmount

**Props**: `id`, `options`, `url`, `particlesLoaded`

---

### WebComponents (`wrappers/webcomponents/src/Particles.ts`) — Partial reload

**Current state** (has observers but incomplete):
```ts
static get observedAttributes(): string[] {
  return ["url", "options"];
}

// Has setters: this.url, this.options — but they don't reload!
// Missing: "id" in observedAttributes
// Missing: theme attribute
```

**Gaps**:
1. `id` changes are NOT observed (missing from `observedAttributes`)
2. No `theme` attribute support
3. `attributeChangedCallback` stores values but doesn't trigger reload directly for all paths — setters DO trigger reload via `#loadParticles`, but attribute changes don't always propagate
4. Constructor dispatches `particlesInit` event with engine (but that event doesn't exist in v4)
5. `connectedCallback` calls `#loadParticles` — reload works for initial render

---

### React (`wrappers/react/lib/Particles.tsx`) — Already reactive

**Current state** (reload via `useEffect` dependencies):
```tsx
useEffect(() => {
  if (!loaded) return;
  tsParticles.load({ id: particleId, url, options }).then(c => { /* ... */ });
  return () => { containerRef.current?.destroy(); };
}, [id, loaded, options, particlesLoaded, url]);
```

**Gaps**:
1. No `theme` prop or `loadTheme` support
2. `particlesLoaded` type in `IParticlesProps.ts` is `(container?: Container) => Promise<void> | void` — ok, but docs/README props table is incomplete (missing `particlesLoaded` entry)

---

## Canonical Wrapper Contract (Target Behavior)

All wrappers must implement this behavior (framework syntax differs):

### 1. Init contract
- Engine/plugin init is triggered once at app/bootstrap level.
- Wrapper components wait for init completion before loading particles.

### 2. Reactivity contract
- `id` change => destroy + reload
- `options` change => destroy + reload
- `url` change => destroy + reload
- Reload path is deterministic and idempotent

### 3. Theme contract
- `theme` prop/attribute exists in wrappers.
- `loadTheme` is optional runtime capability requiring `@tsparticles/plugin-themes`.
- Without plugin, `theme` updates are safe no-op.
- Invocation: `(container as unknown as { loadTheme?: (name?: string) => Promise<void> }).loadTheme?.(theme)`

### 4. Loaded callback contract
- Event/callback (`particlesLoaded` / `loaded` / framework equivalent) is emitted after successful `tsParticles.load` resolution.
- Callback receives `Container | undefined`.

### 5. Destroy contract
- On component teardown, wrapper calls `container.destroy()`.
- No orphan animations remain.

---

## Implementation Steps + Status

### Completion Rule (non-negotiable)

Each wrapper step is considered **Done** only when all related artifacts are aligned together:

1. Wrapper implementation (reactivity + theme + lifecycle)
2. Wrapper demo(s) aligned with final API and behavior
3. Wrapper template(s) checked and aligned (or explicitly marked N/A if none exist)
4. Wrapper README aligned with the implemented behavior

This plan therefore uses **one wrapper per step**. No multi-wrapper implementation steps.

Website docs are intentionally batched at the end for efficiency, while wrapper-specific context stays inside each wrapper step (README + demo + template checks are in-step requirements).

### Per-step substep template (apply to every wrapper step S1-S17)

- `a` Wrapper code changes (`id/options/url` reload, theme safety, teardown, init wait)
- `b` Demo alignment for that wrapper family
- `c` Template alignment check (or explicit N/A note)
- `d` Wrapper README alignment
- `e` Verification (`pnpm --filter <pkg> build` + smoke behavior checks)

No wrapper step can be marked complete unless all five substeps are complete.

### A1 audit template (special step)

`A1` is an upfront analysis step and uses this output contract:

- Wrapper audited
- Drift found: `yes/no`
- Evidence (file refs + short rationale)
- Action: `queue X-step` or `no-change`
- If `queue X-step`: list exact files likely to change

`A1` must complete before any `S12-S17` implementation step starts.

### A1 Audit Decision Matrix (completed)

| Wrapper | Drift | Evidence | Decision |
|---------|-------|----------|----------|
| preact | yes | `wrappers/preact/src/IParticlesProps.ts` callback typed `(container: Container)`; no `theme` prop | Activate `S12` |
| svelte | yes | `wrappers/svelte/src/lib/Particles.svelte` reloads on every `afterUpdate`; no `theme` handling | Activate `S13` |
| stencil | yes | `wrappers/stencil/src/components/stencil-particles/stencil-particles.tsx` has no `theme` prop and no loaded callback/event | Activate `S14` |
| ember | yes | `wrappers/ember/addon/modifiers/particles.ts` no `theme`; repeated `modify()` may stack destructors without explicit pre-destroy | Activate `S15` |
| jquery | yes | `wrappers/jquery/src/particles.ts` has `load/ajax` only, no theme pathway nor theme docs alignment | Activate `S16` |
| nextjs | no | `wrappers/nextjs/lib/index.tsx` is thin client-only re-export over `@tsparticles/react` | Close `X6` as no-change |
| nuxt2 | no | `wrappers/nuxt2/lib/index.ts` only installs Vue3 plugin via module; no direct wrapper lifecycle | Close `X7` as no-change |
| nuxt3 | no | `wrappers/nuxt3/lib/index.ts` only installs Vue3 plugin via module; no direct wrapper lifecycle | Close `X8` as no-change |
| nuxt4 | no | `wrappers/nuxt4/lib/index.ts` only installs Vue3 plugin via module; no direct wrapper lifecycle | Close `X9` as no-change |
| angular-confetti | no | `wrappers/angular-confetti/projects/ng-confetti/src/lib/ng-confetti.component.ts` is event-like fire wrapper with explicit trigger semantics | Close `X10` as no-change |
| angular-fireworks | yes | `wrappers/angular-fireworks/projects/ng-fireworks/src/lib/ng-fireworks.component.ts` lacks `OnChanges`; input changes not reapplied | Activate `S17` |

Implementation gate from A1:
- Execute: `S12`, `S13`, `S14`, `S15`, `S16`, `S17`.
- No-change (closed with evidence): `X6` (Next.js), `X7` (Nuxt 2), `X8` (Nuxt 3), `X9` (Nuxt 4), `X10` (Angular-confetti).

## No-Change Summary (A1 Audit Closure)

These wrappers were audited and require no implementation work. Evidence is documented in the A1 decision matrix above.

| Wrapper | Evidence |
|---------|----------|
| Next.js (X6) | `wrappers/nextjs/lib/index.tsx` — thin client-only re-export of `@tsparticles/react`, no direct lifecycle |
| Nuxt 2 (X7) | `wrappers/nuxt2/lib/index.ts` — module only installs Vue3 plugin, no direct wrapper lifecycle |
| Nuxt 3 (X8) | Same pattern as Nuxt 2 |
| Nuxt 4 (X9) | Same pattern as Nuxt 2 |
| Angular-confetti (X10) | `wrappers/angular-confetti/projects/ng-confetti/src/lib/ng-confetti.component.ts` — event-like fire wrapper with explicit trigger semantics, not a generic particles component |

These steps are **closed** and do not appear in any execution table.

---

## Agent Execution Protocol (mandatory)

This plan is designed for distributed execution by multiple agents. Follow this protocol to avoid drift and overlap.

### 1) Ownership model
- One agent owns exactly one step at a time.
- No agent may edit files outside its owned step, except `S20` and `S21` owner agents.
- If cross-step edits are discovered as necessary, agent must report them as "Follow-up required" instead of editing outside ownership.

### 2) Step completion contract
An agent can mark a step complete only if all are true:
- Wrapper implementation substep is complete.
- Demo alignment substep is complete (or explicit `N/A` with reason).
- Template alignment substep is complete (or explicit `N/A` with reason).
- README alignment substep is complete.
- Verification commands executed and passed (or failure documented with logs).

### 3) Standard agent handoff output
Every agent must return results in this structure:

```md
Step: Sx
Status: done | partial | blocked

Files changed:
- path/to/file1
- path/to/file2

Substep status:
- a Wrapper implementation: done/partial/blocked
- b Demo alignment: done/partial/blocked (or N/A: reason)
- c Template alignment: done/partial/blocked (or N/A: reason)
- d README alignment: done/partial/blocked
- e Verification: done/partial/blocked

Verification executed:
- <exact command>
- <exact command>

Behavior deltas:
- ...

Known risks / follow-ups:
- ...
```

### 4) Parallelization waves (recommended)
- **Wave 1**: all wrapper implementation steps in parallel — `S1-S17`.
- **Wave 2**: `S18` then `S19` (strictly sequential — EN docs first, then 9 translations).
- **Wave 3**: `S20` validation.
- **Wave 4**: `S21` final handoff.

### 5) Conflict avoidance
- `S18`/`S19` are the only steps allowed to edit `websites/website/docs/**/guides/vue3.md`.
- Each wrapper step edits only its wrapper package + mapped demo + mapped README.
- `S20` does not change implementation unless explicitly requested; it validates and reports.

### 6) Failure policy
- If verification fails, step status is `partial` (not `done`).
- If blocked by external dependency, status is `blocked` with exact blocker and next action.
- Never silently skip demo/template/README substeps.

---

## Per-Wrapper Implementation Details

---

### S1 — Vue 3 wrapper ✅ COMPLETED

**Files modified**:
| File | Change |
|------|--------|
| `wrappers/vue3/src/components/vue-particles.vue` | Added watchers for `id`/`options`/`url` → destroy+reload; added `theme` watcher + initial apply; removed stale `IParticlesProps` export |
| `demo/vue3/src/App.vue` | Rewrote with reactive config pills switching `:options` binding, `@particles-loaded` event, `:theme` prop binding |
| `wrappers/vue3/README.md` | Fully documented reactive behavior, theme plugin caveat, loaded callback, teardown |

**Files unchanged (plan candidate, not needed)**:
- `wrappers/vue3/src/components/index.ts` — no export changes needed; `IParticlesProps` removal was sufficient

**What was implemented**:

| Requirement | Implementation |
|---|---|
| `id` change → destroy + reload | `watch(() => props.id, ...)` calls `loadParticles()` |
| `options` change → destroy + reload | `watch(() => props.options, ..., { deep: true })` calls `loadParticles()` |
| `url` change → destroy + reload | `watch(() => props.url, ...)` calls `loadParticles()` |
| `theme` change → safe `loadTheme` | `watch(() => props.theme, ...)` with `(container as unknown as { loadTheme?: ... }).loadTheme?.(newTheme)` |
| Initial theme applied after load | `if (container && props.theme) { ... loadTheme?.(props.theme) }` inside `loadParticles()` |
| `particlesLoaded` emit guard | Emit signature `(e: "particlesLoaded", container?: Container)` — already correct |
| Teardown destroys container | `onUnmounted(() => { container?.destroy(); container = undefined })` — already present, unchanged |

**Substep verification**:
- a (wrapper code): ✅ — `vue-particles.vue` updated with all watchers + initial theme
- b (demo alignment): ✅ — `App.vue` rewritten with reactive pill-based config switching
- c (template check): ✅ — N/A (no Vue 3 templates exist in repo)
- d (README alignment): ✅ — full rewrite covering all contract points
- e (build): ✅ — `pnpm --filter @tsparticles/vue3 build` succeeds

---

### S2 — Vue 2 wrapper (✅ DONE)

**Files modified**:
- `wrappers/vue2/src/Particles/vue-particles.vue`
- `wrappers/vue2/src/Particles/event-bus.ts`

**What was implemented**:

| Requirement | Implementation |
|---|---|
| `id` change → destroy + reload | `@Watch("id")` calls `particlesInit(this)` when `this.container` exists |
| `options` change → destroy + reload | `@Watch("options")` calls `particlesInit(this)` when `this.container` exists |
| `url` change → destroy + reload | `@Watch("url")` calls `particlesInit(this)` when `this.container` exists |
| `theme` change → safe `loadTheme` | `@Watch("theme")` with `(this.container as unknown as { loadTheme?: ... }).loadTheme?.(newTheme)` |
| Initial theme applied after load | `if (container && component.theme) { ... loadTheme?.(component.theme) }` inside `particlesInit()` |
| `IParticlesProps` export removed | Removed `export type IParticlesProps = ISourceOptions;` — used `ISourceOptions` directly in prop type |
| `particlesLoaded` type guard | Changed prop type to `(container?: Container) => void`, cb guards `if (container && component.particlesLoaded)` |
| `tsParticles.init()` call | Added `.then(() => tsParticles.init())` in `ensureParticlesInitialization()` in event-bus.ts |
| Teardown destroys container | `beforeDestroy()` calls `this.container?.destroy()` — unchanged |

**Substep verification**:
- a (wrapper code): ✅ — `vue-particles.vue` updated with all watchers + initial theme + event-bus init fix
- b (demo alignment): ✅ — `App.vue` rewritten with reactive pill-based config switching
- c (template check): ✅ — N/A (no Vue 2 templates exist in repo)
- d (README alignment): ✅ — full rewrite covering all contract points
- e (build): ✅ — `pnpm --filter @tsparticles/vue2 build` succeeds (2 pre-existing TS warnings)

---

### S3 — Angular wrapper

**Files to modify**:
- `wrappers/angular/projects/ng-particles/src/lib/ng-particles.component.ts`
- `wrappers/angular/projects/ng-particles/src/lib/ng-particles.service.ts` (add `tsParticles.init()`)
- `wrappers/angular/projects/ng-particles/src/lib/ng-particles.module.ts` (add `theme` to `IParticlesProps` if needed — it's `ISourceOptions` which doesn't have it)

**Changes needed**:

#### 4a: Implement `OnChanges` interface

```ts
import { OnChanges, SimpleChanges } from "@angular/core";

export class NgxParticlesComponent implements AfterViewInit, OnDestroy, OnChanges {
  // ...
  public ngOnChanges(changes: SimpleChanges): void {
    if (!this.#container) {
      return; // not loaded yet; ngAfterViewInit will handle initial load
    }
    if (changes["id"] || changes["options"] || changes["url"]) {
      void this.#loadParticles();
    }
    if (changes["theme"]) {
      (this.#container as unknown as { loadTheme?: (name?: string) => Promise<void> }).loadTheme?.(changes["theme"].currentValue);
    }
  }
}
```

**Risk**: `ngOnChanges` fires before `ngAfterViewInit`. Guard with `this.#container` check — if `#container` is undefined, skip reload (initial load happens in `ngAfterViewInit`).

**Risk**: `ngOnChanges` with `options` object — Angular `OnChanges` uses reference equality for objects. This is fine IF the user provides a new options object reference. Does not support deep mutation detection.

#### 4b: Add `theme` input

```ts
@Input() theme?: string;
```

#### 4c: Fix `particlesLoaded` emitter type

```ts
@Output() particlesLoaded: EventEmitter<Container | undefined> = new EventEmitter<Container | undefined>();
```

Or guard:
```ts
const container = await tsParticles.load({ id: this.id, options: this.options, url: this.url });
this.#container = container;
if (container) {
  this.particlesLoaded.emit(container);
}
```

#### 4d: Fix service — add `tsParticles.init()`

```ts
initPromise = (async () => {
  if (particlesInit) {
    await particlesInit(tsParticles);
  }
  await tsParticles.init();  // ADD THIS for v4
  initialized = true;
})().catch(...);
```

**Verification**:
- `pnpm --filter @tsparticles/angular build`
- Manual: change options binding, verify reload

#### S3.b: Demo alignment
- Align `demo/angular/src/app/app.component.html` and `demo/angular/src/app/app.component.ts` with final behavior.
- Keep `*ngIf` only as optional visibility control (not as reactivity workaround).

#### S3.c: Template alignment
- Verify whether Angular templates/scaffolds exist for this wrapper family.
- If none exist, record explicit `N/A` in implementation notes.

#### S3.d: README alignment
- Update `wrappers/angular/README.md` with `theme` input and reload contract.

#### S3.e: Completion gate
- Mark S3 complete only when S3.a-S3.d are done and verification passes.

---

### S4 — Solid wrapper

**Files to modify**:
- `wrappers/solid/src/Particles.tsx`
- `wrappers/solid/src/IParticlesProps.ts`

**Changes needed**:

#### 5a: Track `id`, `options`, `url` reactively

```tsx
import { createEffect, createMemo, onCleanup } from "solid-js";

// Replace onMount with createEffect that tracks prop signals:
const loadParams = createMemo(() => ({
  id: props.id ?? "tsparticles",
  options: props.options ?? props.params,
  url: props.url,
  theme: props.theme,
}));

createEffect(async () => {
  const params = loadParams();

  // Clean up previous container first
  // (onCleanup runs on disposal, but we need to destroy before creating a new one)
  // Use a manual approach:

  // Actually in Solid, we need to use onCleanup inside the tracking scope
  // or manage the container lifecycle manually
});
```

**Recommended pattern** — use `on` with a merged key to observe changes:

```tsx
let container: Container | undefined;
let previousId: string | undefined;

createEffect(on(
  () => [props.id, props.options, props.url] as const,
  async ([id, options, url]) => {
    // destroy previous
    container?.destroy();

    await waitForParticlesEngineInitialization();
    if (!isParticlesEngineInitialized()) throw new Error("...");

    container = await tsParticles.load({
      id: id ?? "tsparticles",
      options: options ?? props.params,
      url,
    });

    props.particlesLoaded?.(container);
  },
  { defer: false },
));

// Theme effect
createEffect(on(
  () => props.theme,
  (theme) => {
    if (!container || !theme) return;
    (container as unknown as { loadTheme?: (name?: string) => Promise<void> }).loadTheme?.(theme);
  },
));

// Cleanup on unmount
onCleanup(() => {
  container?.destroy();
});
```

#### 5b: Add `theme` to `IParticlesProps`

```ts
export interface IParticlesProps {
  // ... existing props
  theme?: string;
}
```

#### 5c: Fix `particlesLoaded` type

```ts
particlesLoaded?: (container?: Container) => Promise<void>;
```

**Verification**:
- `pnpm --filter @tsparticles/solid build`

#### S4.b: Demo alignment
- Align `demo/solid/src/App.tsx` by removing conditional mount workaround.
- Ensure demo shows runtime config switching via prop updates.

#### S4.c: Template alignment
- Verify whether Solid templates exist for this wrapper family.
- If none exist, record explicit `N/A` in implementation notes.

#### S4.d: README alignment
- Update `wrappers/solid/README.md` (including corrected `particlesLoaded` signature).

#### S4.e: Completion gate
- Mark S4 complete only when S4.a-S4.d are done and verification passes.

---

### S5 — Qwik wrapper

**Files to modify**:
- `wrappers/qwik/src/components/particles/particles.tsx`
- `wrappers/qwik/src/components/particles/IParticlesProps.ts`

**Changes needed**:

#### 6a: Track `id`, `options`, `url` reactively in `useVisibleTask$`

In Qwik, `useVisibleTask$` runs once. To track prop changes, use the `track` function or use `useTask$` from `@builder.io/qwik` (not `useVisibleTask$` only).

```tsx
import { component$, useVisibleTask$, useTask$, $, noSerialize } from "@builder.io/qwik";

const Particles = component$<IParticlesProps>(props => {
  const librarySig = useSignal<NoSerialize<Container | undefined>>();

  // Use useTask$ to track prop changes (runs eagerly)
  useTask$(({ track, cleanup }) => {
    const id = track(() => props.id) ?? "tsparticles";
    const options = track(() => props.options);
    const url = track(() => props.url);

    cleanup(() => {
      const c = librarySig.value;
      if (c) {
        c.destroy();
        librarySig.value = undefined;
      }
    });

    // Async loading...
    const load = $(async () => {
      await waitForParticlesEngineInitialization();
      if (!isParticlesEngineInitialized()) throw new Error("...");

      // Destroy old before creating new
      const old = librarySig.value;
      if (old) {
        old.destroy();
        librarySig.value = undefined;
      }

      const container = await tsParticles.load({
        id, options: options ?? props.params, url,
      });

      librarySig.value = noSerialize(container);
      if (props.loaded) {
        await props.loaded(container);
      }
    });

    void load();
  });

  // Also track theme changes separately
  useTask$(({ track }) => {
    const theme = track(() => props.theme);
    const container = librarySig.value;

    if (!container || !theme) return;
    (container as unknown as { loadTheme?: (name?: string) => Promise<void> }).loadTheme?.(theme);
  });

  // Also do cleanup on unmount via useVisibleTask$
  useVisibleTask$(function Cleanup({ cleanup }) {
    cleanup(() => {
      const c = librarySig.value;
      if (c) {
        c.destroy();
        librarySig.value = undefined;
      }
    });
  });
});
```

**Important Qwik detail**: `useTask$` runs on the server too! Guard with `useVisibleTask$` for client-only code OR use `useTask$` with `{ eagerness: 'visible' }`. Better pattern: use `useTask$` with `{ eagerness: 'load' }` or combine strategies.

**Alternative**: `useVisibleTask$` with a tracker:

```tsx
useVisibleTask$(function Initializer({ track, cleanup }) {
  const id = track(() => props.id) ?? "tsparticles";
  const options = track(() => props.options);
  const url = track(() => props.url);
  // ... load
});
```

**But**: `useVisibleTask$` with `track()` is the correct Qwik pattern for reactive re-execution. When tracked values change, the cleanup runs, then the task re-executes.

#### 6b: Add `theme` to `IParticlesProps`

```ts
export interface IParticlesProps {
  // ... existing props
  theme?: string;
}
```

**Verification**:
- `pnpm --filter @tsparticles/qwik build`

#### S5.b: Demo alignment
- Align `demo/qwik/src/root.tsx` by removing conditional mount workaround.
- Ensure demo demonstrates reactive updates without remount.

#### S5.c: Template alignment
- Verify whether Qwik templates exist for this wrapper family.
- If none exist, record explicit `N/A` in implementation notes.

#### S5.d: README alignment
- Update `wrappers/qwik/README.md` with theme caveat and reload contract.

#### S5.e: Completion gate
- Mark S5 complete only when S5.a-S5.d are done and verification passes.

---

### S6 — Astro wrapper

**Files to modify**:
- `wrappers/astro/src/Particles.astro`

**Changes needed**:

#### 7a: Move from constructor-only to `connectedCallback` + `attributeChangedCallback`

```astro
<script>
  class AstroParticles extends HTMLElement {
    #container;
    #loadId = 0;

    static get observedAttributes() {
      return ["data-id", "data-options", "data-url", "data-theme"];
    }

    constructor() {
      super();
      // Don't load here — wait for connectedCallback
    }

    connectedCallback() {
      void this.#loadParticles(++this.#loadId);
    }

    disconnectedCallback() {
      this.#loadId++;
      this.#container?.destroy();
      this.#container = undefined;
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue === newValue) return;
      if (!this.isConnected) return;
      // Trigger reload
      this.#container?.destroy();
      void this.#loadParticles(++this.#loadId);
    }

    async #loadParticles(currentLoadId) {
      // ... existing load logic, but use currentLoadId for race guard
      await waitForParticlesEngineInitialization();

      // load with data attributes
      let container;
      if (this.dataset.url) {
        container = await tsParticles.load({ id: this.dataset.id, url: this.dataset.url });
      } else if (this.dataset.options) {
        container = await tsParticles.load({ id: this.dataset.id, options: JSON.parse(this.dataset.options) });
      }

      if (currentLoadId !== this.#loadId) {
        container?.destroy();
        return;
      }

      this.#container = container;

      // Apply theme if provided
      if (container && this.dataset.theme) {
        (container as unknown as { loadTheme?: (name?: string) => Promise<void> })
          .loadTheme?.(this.dataset.theme);
      }

      // Invoke loaded callback
      if (this.dataset.loaded && this.dataset.loaded in globalStore) {
        const loadedFn = globalStore[this.dataset.loaded];
        if (loadedFn instanceof Function) { loadedFn(container); }
      }
    }
  }

  customElements.define("astro-particles", AstroParticles);
</script>
```

#### 7b: Add `data-theme` attribute to template

```astro
<astro-particles
  data-id={id}
  data-options={JSON.stringify(options)}
  data-url={url}
  data-loaded={loaded}
  data-theme={theme}>
  <canvas></canvas>
</astro-particles>
```

#### 7c: Add `theme` to `IParticlesProps` in frontmatter

```ts
export interface IParticlesProps {
  id: string;
  loaded?: string;
  options?: ISourceOptions;
  url?: string;
  theme?: string;  // ADD
}

const { id, loaded, options, url, theme } = Astro.props as IParticlesProps;
```

**Risks**:
- `attributeChangedCallback` fires before `connectedCallback` for initial attributes. Guard with `this.isConnected`.
- `JSON.parse` on every attribute change is expensive for large options. Consider caching the parsed object.

**Verification**:
- `pnpm --filter @tsparticles/astro build`
- Smoke test: change data attributes on the custom element, verify reload

#### S6.b: Demo alignment
- Align `demo/astro/src/pages/index.astro` with attribute-driven reactivity.
- Verify connect/disconnect lifecycle behavior in navigation.

#### S6.c: Template alignment
- Verify whether Astro templates exist for this wrapper family.
- If none exist, record explicit `N/A` in implementation notes.

#### S6.d: README alignment
- Update `wrappers/astro/README.md` with `theme` prop and lifecycle/reload contract.

#### S6.e: Completion gate
- Mark S6 complete only when S6.a-S6.d are done and verification passes.

---

### S7 — Inferno wrapper

#### S7.a: Wrapper implementation

**File**: `wrappers/inferno/src/Particles.tsx`

Current `loadContainer` does NOT invoke any loaded callback after `tsParticles.load`. Fix:

```ts
async loadContainer() {
  try {
    await waitForParticlesEngineInitialization();
    if (this._cancelled) return;

    const { id, url, options, loaded, particlesLoaded } = this.props;
    this._container = await tsParticles.load({ id: id ?? "tsparticles", url, options });

    // Invoke loaded callbacks
    if (this._container) {
      await loaded?.(this._container);
      await particlesLoaded?.(this._container);
    }
  } catch (e) {
    getLogger().error("Particles: error during load", e);
  }
}
```

Also add `theme` handling:
- Add `@Prop() theme?: string` to props interface
- In `componentDidUpdate`, check for theme change
- Safe `loadTheme` call

#### S7.b: Demo alignment
- Verify inferno demo behavior (if present) is consistent with wrapper contract.
- If no inferno demo exists, record explicit `N/A`.

#### S7.c: Template alignment
- Verify whether Inferno templates exist.
- If none exist, record explicit `N/A`.

#### S7.d: README alignment
- Update `wrappers/inferno/README.md` to reflect callback semantics, optional theme plugin, and reload/teardown behavior.

#### S7.e: Completion gate
- Mark S7 complete only when S7.a-S7.d are done and verification passes.

### S8 — Lit wrapper

#### S8.a: Wrapper implementation

**File**: `wrappers/lit/src/lit-tsparticles.ts`

Current `#loadParticles` assigns `this.container = container` but fires no event. Fix:

```ts
async #loadParticles(currentRenderId: number): Promise<void> {
  // ... existing load logic ...

  this.container = container;

  if (container) {
    // Dispatch loaded event
    this.dispatchEvent(new CustomEvent("particlesLoaded", {
      detail: container,
      bubbles: true,
      composed: true,
    }));
  }
}
```

#### S8.b: Demo alignment
- Verify lit demo behavior (if present) is aligned with the event contract.
- If no lit demo exists, record explicit `N/A`.

#### S8.c: Template alignment
- Verify whether Lit templates exist.
- If none exist, record explicit `N/A`.

#### S8.d: README alignment
- Update `wrappers/lit/README.md` with `particlesLoaded` event behavior and optional theme caveat.

#### S8.e: Completion gate
- Mark S8 complete only when S8.a-S8.d are done and verification passes.

Also add `theme` property:
```ts
@property({ type: String })
theme?: string;
```

And a theme watcher in `update()`:
```ts
update(changedProperties: PropertyValues) {
  super.update(changedProperties);

  if (changedProperties.has("theme") && this.container) {
    const theme = changedProperties.get("theme") as string | undefined;
    (this.container as unknown as { loadTheme?: (name?: string) => Promise<void> })
      .loadTheme?.(theme);
  }

  if (changedProperties.has("options") || changedProperties.has("url") || changedProperties.has("id")) {
    void this.#loadParticles(++this.#renderId);
  }
}
```

### S9 — Riot wrapper

#### S9.a: Wrapper implementation

**File**: `wrappers/riot/src/riot-particles.riot`

Current: no reload, no destroy on unmount.

Fix: Riot components use `onMounted`, `onUnmounted`, `onUpdated` lifecycle hooks. The `export default { onMounted(props) { ... } }` only has `onMounted`. Need to add `onUpdated` for prop changes:

```riot
export default {
  async onMounted(props) {
    // ... initial load (unchanged, but fix teardown)
  },
  onUnmounted(props) {
    // Destroy container
    if (oldId) {
      const oldContainer = tsParticles.dom().find((c) => c.id === oldId);
      if (oldContainer) {
        oldContainer.destroy();
      }
    }
  },
  onUpdated(props) {
    // Check for prop changes and reload
    if (oldId && (props.options !== oldId._options || props.url !== oldId._url)) {
      // ... reload
    }
  }
}
```

**Riot caveat**: Riot components don't have automatic deep comparison. Manual tracking needed.

#### S9.b: Demo alignment
- Verify riot demo behavior (if present) is aligned with reload + teardown contract.
- If no riot demo exists, record explicit `N/A`.

#### S9.c: Template alignment
- Verify whether Riot templates exist.
- If none exist, record explicit `N/A`.

#### S9.d: README alignment
- Update `wrappers/riot/README.md` with reactive reload and teardown behavior.

#### S9.e: Completion gate
- Mark S9 complete only when S9.a-S9.d are done and verification passes.

### S10 — WebComponents wrapper

#### S10.a: Wrapper implementation

**File**: `wrappers/webcomponents/src/Particles.ts`

Add `"data-id"` and `"data-theme"` to `observedAttributes`:

```ts
static get observedAttributes(): string[] {
  return ["url", "options", "data-id", "data-theme"];
}
```

The setter for `id` should trigger reload:
```ts
set id(value: string) {
  this.setAttribute("data-id", value);
}
```

Or handle in `attributeChangedCallback`:
```ts
attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null): void {
  if (name === "data-id") {
    this.container.current?.destroy();
    void this.#loadParticles(++this.#loadId);
  } else if (name === "data-theme") {
    const container = this.container.current;
    if (container && newValue) {
      (container as unknown as { loadTheme?: (name?: string) => Promise<void> })
        .loadTheme?.(newValue);
    }
  }
  // ... existing options/url handling
}
```

Also remove the deprecated `particlesInit` custom event dispatch from constructor (v3 pattern).

#### S10.b: Demo alignment
- Verify webcomponents demo behavior (if present) reflects observed attribute support (`id/options/url/theme`).
- If no webcomponents demo exists, record explicit `N/A`.

#### S10.c: Template alignment
- Verify whether WebComponents templates exist.
- If none exist, record explicit `N/A`.

#### S10.d: README alignment
- Update `wrappers/webcomponents/README.md` with observed attributes and theme caveat.

#### S10.e: Completion gate
- Mark S10 complete only when S10.a-S10.d are done and verification passes.

### S11 — React docs

#### S11.a: README alignment

**File**: `wrappers/react/README.md`

Current props table lists only `id`, `options`, `url`, `style`, `className`. Missing `particlesLoaded`.

Add to the table:
```markdown
| particlesLoaded | function | Callback invoked when the container is loaded, receives `(container?: Container)` |
```

Also note: React wrapper currently has NO `theme` prop — this remains out of scope for S11 (React is docs-only in this plan). Document existing behavior only.

#### S11.b: Demo alignment check
- Verify `demo/react/src/App.jsx` remains aligned with documented API.

#### S11.c: Template alignment
- Verify `wrappers/react/templates/` status and record `N/A` if still empty.

#### S11.d: Completion gate
- Mark S11 complete only when S11.a-S11.c are done.

---

### S12 — Preact wrapper

**Files to modify**:
- `wrappers/preact/src/IParticlesProps.ts`
- `wrappers/preact/src/Particles.tsx`
- `wrappers/preact/src/IParticlesState.ts` (type fix for container)

#### S12.a: Wrapper implementation

**1. Add `theme` prop to `IParticlesProps`:**

```ts
export interface IParticlesProps {
  id?: string;
  width?: string;
  height?: string;
  options?: ISourceOptions;
  url?: string;
  params?: ISourceOptions;
  style?: CSSProperties;
  className?: string;
  canvasClassName?: string;
  container?: RefObject<Container | undefined>;  // FIX: add | undefined
  particlesLoaded?: (container?: Container) => Promise<void>;  // FIX: add ? to container
  theme?: string;  // ADD
}
```

**2. Fix `container` ref type in state:**

In `IParticlesState.ts`, the `library` type is `Container` — keep as-is (it's always assigned after successful load and is never `undefined` when set). The fix is in `IParticlesProps`.

**3. Add `loadTheme` call in `loadParticles`:**

```ts
private async loadParticles(): Promise<void> {
  if (!this.state.init) { return; }

  const cb = async (container?: Container) => {
    if (this.props.container) {
      (this.props.container as MutableRefObject<Container | undefined>).current = container;
    }

    this.setState({ library: container });

    // Apply theme after load if provided
    if (container && this.props.theme) {
      (container as unknown as { loadTheme?: (name?: string) => Promise<void> })
        .loadTheme?.(this.props.theme);
    }

    if (this.props.particlesLoaded) {
      await this.props.particlesLoaded(container);
    }
  };

  const container = await tsParticles.load({
    url: this.props.url,
    options: this.props.options,
    id: this.props.id,
  });

  await cb(container);
}
```

**4. Handle theme changes in `componentDidUpdate`:**

The existing `componentDidUpdate` calls `this.refresh()` which destroys and reloads. But for `theme` changes, we shouldn't destroy+reload — just call `loadTheme`. Add theme check:

```ts
componentDidUpdate(prevProps: Readonly<IParticlesProps>): void {
  // Theme change: apply without reload
  if (prevProps.theme !== this.props.theme && this.state.library) {
    (this.state.library as unknown as { loadTheme?: (name?: string) => Promise<void> })
      .loadTheme?.(this.props.theme);
  }
  // Other prop changes: full reload
  this.refresh();
}
```

**Verification**:
- `pnpm --filter @tsparticles/preact build`

#### S12.b: Demo alignment
- **Remove** `{this.state.particlesInitialized && <Particles .../>}` conditional in `demo/preact/src/components/app.js`
- Move `initParticlesEngine` to module level (outside component lifecycle)
- Verify `<Particles id="tsparticles" options={...} />` works standalone after init

#### S12.c: Template alignment
- Verify whether Preact templates exist (`wrappers/preact/templates/`).
- If none exist, record explicit `N/A`.

#### S12.d: README alignment
- Update `wrappers/preact/README.md` with `theme` prop documentation and optional plugin caveat.

#### S12.e: Completion gate
- Mark S12 complete only when S12.a-S12.d are done and verification passes.

---

### S13 — Svelte wrapper

**Files to modify**:
- `wrappers/svelte/src/lib/Particles.svelte`

#### S13.a: Wrapper implementation

**1. Add `theme` prop:**

```svelte
export let theme: string | undefined = undefined;
```

**2. Replace `afterUpdate` with selective reactivity:**

Current: `afterUpdate(async () => { await loadParticles(); })` — reloads on EVERY update (class, style, etc.).

Fix: use Svelte reactive statements to track only relevant props:

```svelte
$: if (mounted) {
  void loadParticles();
}
// Trigger only when id, options, url, or theme change:
$: void (id, options, url, theme, loadParticlesOnChange());
// Actually Svelte doesn't have a great pattern for selective trigger.
// Better approach: use a reactive hash and compare.
```

**Recommended pattern** — use a reactive `loadKey` that changes only when id/options/url change, and a separate reactive for theme:

```svelte
$: loadKey = `${id}|${url}|${JSON.stringify(options)}`;

$: if (mounted && loadKey) {
  void loadParticles();
}

$: if (mounted && theme && currentContainer) {
  (currentContainer as unknown as { loadTheme?: (name?: string) => Promise<void> })
    .loadTheme?.(theme);
}
```

Then remove `afterUpdate` entirely.

**3. Apply initial theme after `tsParticles.load`:**

```svelte
const container = await tsParticles.load({ id, options, url });
currentContainer = container;

// Apply theme if provided
if (container && theme) {
  (container as unknown as { loadTheme?: (name?: string) => Promise<void> })
    .loadTheme?.(theme);
}

cb(container);
```

**4. Add guard for container existence before dispatch:**

```svelte
const cb = (container?: Container) => {
  dispatch(particlesLoadedEvent, {
    particles: container  // already Container | undefined — correct
  });
  oldId = id;
};
```

**Verification**:
- `pnpm --filter @tsparticles/svelte build`

#### S13.b: Demo alignment
- Rename `particlesInit` → `initParticlesEngine` in `demo/svelte/src/App.svelte` and `demo/svelte-kit/src/routes/+page.svelte`
- Verify reactive `options` changes work via prop binding

#### S13.c: Template alignment
- Verify whether Svelte templates exist.
- If none exist, record explicit `N/A`.

#### S13.d: README alignment
- Update `wrappers/svelte/README.md` with `theme` prop and reload contract.

#### S13.e: Completion gate
- Mark S13 complete only when S13.a-S13.d are done and verification passes.

---

### S14 — Stencil wrapper

**Files to modify**:
- `wrappers/stencil/src/components/stencil-particles/stencil-particles.tsx`

#### S14.a: Wrapper implementation

**1. Add `theme` prop and loaded event:**

```ts
import { Component, type JSX, Prop, Watch, Event, EventEmitter, h } from "@stencil/core";

@Event() particlesLoaded!: EventEmitter<Container | undefined>;

@Prop() theme?: string;
```

**2. Add `@Watch("theme")` for theme changes:**

```ts
@Watch("theme")
protected async onThemeChange(): Promise<void> {
  if (!this.container) return;
  (this.container as unknown as { loadTheme?: (name?: string) => Promise<void> })
    .loadTheme?.(this.theme);
}
```

**3. Emit loaded event after successful load:**

```ts
private async loadParticles(currentRenderId: number): Promise<void> {
  // ... existing code ...
  this.container = container;

  // Emit particlesLoaded event (NEW)
  this.particlesLoaded.emit(container);

  // Apply theme if provided (NEW)
  if (container && this.theme) {
    (container as unknown as { loadTheme?: (name?: string) => Promise<void> })
      .loadTheme?.(this.theme);
  }
}
```

**4. Ensure `@Watch("theme")` doesn't fire before component is loaded:**

The `@Watch` on `theme` will fire when the prop is first set (before `componentDidLoad`). Guard with `this.container` check — already done in `onThemeChange`.

**Verification**:
- `pnpm --filter @tsparticles/stencil build`

#### S14.b: Demo alignment
- Verify stencil demo (if present) is aligned with the new `particlesLoaded` event and `theme` prop.
- If no stencil demo exists, record explicit `N/A`.

#### S14.c: Template alignment
- Verify whether Stencil templates exist.
- If none exist, record explicit `N/A`.

#### S14.d: README alignment
- Update `wrappers/stencil/README.md` with `theme` prop, `particlesLoaded` event, and optional plugin note.

#### S14.e: Completion gate
- Mark S14 complete only when S14.a-S14.d are done and verification passes.

---

### S15 — Ember wrapper

**Files to modify**:
- `wrappers/ember/addon/modifiers/particles.ts`

#### S15.a: Wrapper implementation

**1. Add `theme` to modifier signature:**

```ts
interface ParticlesModifierSignature {
  Args: {
    Positional: [];
    Named: {
      options: Options;
      url: string;
      particlesLoaded: (container?: Container) => void;  // FIX: undefined allowed
      theme?: string;  // ADD
    };
  };
}
```

**2. Fix memory leak — destroy previous container before creating new:**

The modifier's `modify()` can be called multiple times when named arguments change. Currently each call creates a new container and registers a new destructor without cleaning up the old one.

Fix: track the current container at the instance level:

```ts
export default class ParticlesModifier extends Modifier<ParticlesModifierSignature> {
  #container?: Container;
  #cleanupRegistered = false;

  async modify(
    element: Element,
    _: PositionalArgs<ParticlesModifierSignature>,
    { options, url, particlesLoaded, theme }: NamedArgs<ParticlesModifierSignature>,
  ) {
    if (!element.id) {
      throw new Error('The specified element must have an id attribute.');
    }

    await waitForParticlesEngineInitialization();
    if (!isParticlesEngineInitialized()) {
      throw new Error('...');
    }

    // Destroy previous container before creating new one (FIX: memory leak)
    this.#container?.destroy();
    this.#container = undefined;

    let container = await tsParticles.load({
      id: element.id,
      options: options ?? {},
      url,
    });

    this.#container = container;

    // Apply theme if provided
    if (container && theme) {
      (container as unknown as { loadTheme?: (name?: string) => Promise<void> })
        .loadTheme?.(theme);
    }

    if (particlesLoaded && container) {
      particlesLoaded(container);
    }

    // Register destructor only once (FIX: avoid accumulation)
    if (!this.#cleanupRegistered) {
      registerDestructor(this, () => {
        this.#container?.destroy();
        this.#container = undefined;
      });
      this.#cleanupRegistered = true;
    }
  }
}
```

**3. Fix `particlesLoaded` type:** `(container: Container) => void` → `(container?: Container) => void`

**Verification**:
- `pnpm --filter @tsparticles/ember build`

#### S15.b: Demo alignment
- Verify Ember demo (if present) is aligned with the modified modifier API.
- If no Ember demo exists, record explicit `N/A`.

#### S15.c: Template alignment
- Verify whether Ember templates exist.
- If none exist, record explicit `N/A`.

#### S15.d: README alignment
- Update `wrappers/ember/README.md` with `theme` support, reload behavior, and optional plugin note.

#### S15.e: Completion gate
- Mark S15 complete only when S15.a-S15.d are done and verification passes.

---

### S16 — jQuery wrapper

**Files to modify**:
- `wrappers/jquery/src/particles.ts`

#### S16.a: Wrapper implementation

**1. Add theme support to the jQuery API:**

The current API has `load(options)` and `ajax(jsonUrl)`. Adding a separate `setTheme` method is cleaner than modifying the existing signatures:

```ts
type ParticlesResult = {
  load: (options: ISourceOptions) => Promise<Container | undefined>;
  ajax: (jsonUrl: string) => Promise<Container | undefined>;
  setTheme: (theme: string) => Promise<void>;  // ADD
};
```

**2. Track containers per element for theme application:**

```ts
// Add a WeakMap to track containers per element
const containers = new WeakMap<Element, Container>();

// In the load function, after tsParticles.load():
return await tsParticles.load({ id: element.id, options }).then(container => {
  if (container) {
    containers.set(element, container);
  }
  return container;
});

// Add setTheme method:
const setTheme = async (theme: string): Promise<void> => {
  for (const element of this) {
    const container = containers.get(element);
    if (container) {
      await (container as unknown as { loadTheme?: (name?: string) => Promise<void> })
        .loadTheme?.(theme);
    }
  }
};
```

**3. Apply theme on initial load when passed via options?** No — jQuery's API doesn't have a `theme` parameter on `load()`/`ajax()`. The `setTheme` method is the appropriate API for theme control.

**4. Update the return object:**

```ts
return { load, ajax, setTheme };
```

**Verification**:
- `pnpm --filter @tsparticles/jquery build`

#### S16.b: Demo alignment
- Verify jQuery demo (if present) reflects the new `setTheme` API.
- If no jQuery demo exists, record explicit `N/A`.

#### S16.c: Template alignment
- Verify whether jQuery templates exist.
- If none exist, record explicit `N/A`.

#### S16.d: README alignment
- Update `wrappers/jquery/README.md` with `setTheme` method documentation and optional plugin note.

#### S16.e: Completion gate
- Mark S16 complete only when S16.a-S16.d are done and verification passes.

---

### S17 — Angular-fireworks wrapper

**Files to modify**:
- `wrappers/angular-fireworks/projects/ng-fireworks/src/lib/ng-fireworks.component.ts`

#### S17.a: Wrapper implementation

**1. Implement `OnChanges` interface:**

```ts
import { AfterViewInit, Component, Inject, Input, OnChanges, OnDestroy, PLATFORM_ID, SimpleChanges } from "@angular/core";
import { FireworkOptions, fireworks } from "@tsparticles/fireworks";

@Component({
  selector: "ngx-fireworks",
  standalone: false,
  template: ` <div [id]="id"></div>`,
})
export class NgxFireworksComponent implements AfterViewInit, OnDestroy, OnChanges {
  @Input() options?: FireworkOptions;
  @Input() id = "tsparticles";

  #fireworksInstance?: Awaited<ReturnType<typeof fireworks>>;
  #destroyed = false;

  constructor(@Inject(PLATFORM_ID) protected platformId: string) {}

  public ngAfterViewInit(): void {
    if (isPlatformServer(this.platformId)) { return; }
    void this.#startFireworks();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (isPlatformServer(this.platformId)) { return; }
    if (this.#destroyed) { return; }
    // Re-fire on options or id changes
    if (changes["options"] || changes["id"]) {
      void this.#startFireworks();
    }
    // Note: theme is not applicable — fireworks uses @tsparticles/fireworks
    // which is a standalone display, not the particles engine.
  }

  public ngOnDestroy(): void {
    this.#destroyed = true;
    this.#fireworksInstance?.stop();
    this.#fireworksInstance = undefined;
  }

  async #startFireworks(): Promise<void> {
    // Stop previous instance
    this.#fireworksInstance?.stop();
    this.#fireworksInstance = undefined;

    this.#fireworksInstance = await fireworks(this.id, this.options);
  }
}
```

**2. Note on destroy-guard**: The `#destroyed` flag prevents `ngOnChanges` from starting fireworks after the component is destroyed (since Angular can fire change detection after destroy in some edge cases).

**Verification**:
- `pnpm --filter @tsparticles/angular-fireworks build`

#### S17.b: Demo alignment
- Verify `demo/angular-fireworks/` demo reflects reactive input behavior.
- If no demo exists, record explicit `N/A`.

#### S17.c: Template alignment
- Verify whether Angular-fireworks templates exist.
- If none exist, record explicit `N/A`.

#### S17.d: README alignment
- Update `wrappers/angular-fireworks/README.md` with `OnChanges` behavior documentation.

#### S17.e: Completion gate
- Mark S17 complete only when S17.a-S17.d are done and verification passes.

---

## Docs Change Plan — Vue 3 Guide

### Stale patterns found in `websites/website/docs/guides/vue3.md` (622 lines)

| Pattern                  | Occurrences | Lines (EN)                                                                | Action                                                            |
|--------------------------|-------------|---------------------------------------------------------------------------|-------------------------------------------------------------------|
| `:init="particlesInit"`  | 10          | 141, 166, 198, 232, 266, 442, 481, 482, 595                               | Remove from ALL examples                                          |
| `particlesInit` function | 15          | 126, 135, 141, 159, 166, 185, 198, 219, 232, 253, 266, 429, 442, 584, 595 | Remove function definitions (no longer needed at component level) |
| `@particles-init` event  | 1           | 613                                                                       | Remove from API table                                             |
| `:init` prose section    | ~2          | 128-143, 477                                                              | Remove "Using particlesInit with the Component" section           |
| `useParticles()`         | 1           | 492                                                                       | Wrong function name; should be `useParticlesProvider`             |

### Required changes to ALL 10 files (EN + 9 translations)

1. **Remove lines 126-143**: Section "Using `particlesInit` with the Component"
2. **Remove `:init="particlesInit"`** from all code examples
3. **Remove `@particles-init`** from API reference table (line 613)
4. **Fix `useParticles()` → `useParticlesProvider()`** or remove if not publicly exported
5. **Remove `particlesInit` function definitions** from all code examples
6. **Ensure API table has `theme` prop** with note about optional plugin dependency
7. **Add note** about `@tsparticles/plugin-themes` requirement for `theme` prop

### Exact file list
```
websites/website/docs/guides/vue3.md                     (EN source)
websites/website/docs/zh/guides/vue3.md                   (Chinese)
websites/website/docs/ja/guides/vue3.md                   (Japanese)
websites/website/docs/hi/guides/vue3.md                   (Hindi)
websites/website/docs/ru/guides/vue3.md                   (Russian)
websites/website/docs/pt/guides/vue3.md                   (Portuguese)
websites/website/docs/fr/guides/vue3.md                   (French)
websites/website/docs/de/guides/vue3.md                   (German)
websites/website/docs/es/guides/vue3.md                   (Spanish)
websites/website/docs/it/guides/vue3.md                   (Italian)
```

### Agent execution order for S18+S19
1. Edit EN file first (S18)
2. Mirror structural + code changes in all 9 translations (S19)
3. Preserve translated prose where possible; update only code blocks and section structure
4. Run stale-pattern grep to verify: no `:init`, no `@particles-init`, no `particlesInit` remains

---

## README Changes Per Wrapper

README work is **embedded in each wrapper step** (S1-S17) and is not a standalone late phase.

For every wrapper step, the README must document:
1. `theme` support depends on optional `@tsparticles/plugin-themes` (if wrapper exposes `theme`)
2. Missing plugin ⇒ `theme` is safe no-op
3. `id`/`options`/`url` changes reload particles
4. Loaded callback/event fires only after `tsParticles.load` resolves
5. Component/element teardown destroys container

Wrapper-specific known README gaps are listed in each wrapper section and must be closed inside that wrapper step.

---

## Risk Register (Expanded)

| Risk                                                    | Impact                         | Likelihood | Mitigation                                                                                                                             |
|---------------------------------------------------------|--------------------------------|:----------:|----------------------------------------------------------------------------------------------------------------------------------------|
| `loadTheme` type mismatch across 6 wrappers             | Build failures                 |    High    | Use local cast at each call site: `(container as unknown as { loadTheme?: ... })`                                                      |
| `Container \| undefined` passed to strict callbacks     | TS errors / runtime crashes    |    High    | Guard before callback emit: `if (container) cb(container)` or type signature `(container?: Container) => void`                         |
| Over-triggered reload effects/watchers                  | Perf regression, flicker       |   Medium   | Explicit dependency tracking + destroy-before-load                                                                                     |
| Vue 3 deep watcher on `options` firing too often        | Performance                    |   Medium   | Use `{ deep: false }` and rely on reference comparison (user creates new object = good, mutation = not tracked — acceptable trade-off) |
| Angular `ngOnChanges` fires before `ngAfterViewInit`    | Double load / error            |    High    | Guard with `this.#container` check                                                                                                     |
| Vue 2 `@Watch` decorator + SFC `export type` issue      | Compile error                  |   Medium   | Remove `export type IParticlesProps = ISourceOptions` from SFC                                                                         |
| Qwik `useTask$` running on server                       | SSR crash                      |    High    | Use `useVisibleTask$` instead, or guard with `isServer`                                                                                |
| Astro attribute observer race (concurrent loads)        | Wrong config shown             |   Medium   | Use monotonic `#loadId` token (already planned)                                                                                        |
| Astro `JSON.parse` on every attribute change            | Performance                    |    Low     | Cache parsed options, only re-parse when string changes                                                                                |
| Agent applies v3 mental model on v4 code                | Wrong API/docs                 |    High    | Mandatory repository-first audit + all wrappers are v4-only (no v3 history)                                                            |
| Translation edits break code blocks                     | Docs render issues             |   Medium   | Manual spot-check after scripted edits                                                                                                 |
| `IParticlesProps` naming in Vue3 shadows props type     | Confusion / wrong usage        |   Medium   | Fix: remove standalone `export type IParticlesProps = ISourceOptions`                                                                  |
| Vue 2 event-bus missing `tsParticles.init()`            | Runtime crash (v4 requirement) |    High    | Add `tsParticles.init()` call in `ensureParticlesInitialization`                                                                       |
| Angular NgParticlesService missing `tsParticles.init()` | Runtime crash (v4 requirement) |    High    | Add `tsParticles.init()` call in `NgParticlesService.init()`                                                                           |
| Solid `onCleanup` inside `createEffect` scope removal   | Memory leak                    |   Medium   | Ensure top-level `onCleanup` for unmount, plus manual destroy in reactive effect                                                       |
| Riot `tsParticles.dom()` usage (v3 API)                 | Runtime error (v4)             |   Medium   | Track container locally instead of querying `tsParticles.dom()`                                                                        |

---

## Validation Plan

### Build validation
```bash
# Core wrappers
pnpm nx run-many -t build --projects=@tsparticles/vue3,@tsparticles/vue2,@tsparticles/angular,@tsparticles/solid,@tsparticles/qwik,@tsparticles/astro

# Extended wrappers touched in S7-S10
pnpm nx run-many -t build --projects=@tsparticles/inferno,@tsparticles/lit,@tsparticles/riot,@tsparticles/webcomponents
```

### Focused smoke checks (per wrapper)
1. Verify that changing `options` prop at runtime reloads particles without remounting component
2. Verify that changing `url` prop at runtime reloads particles
3. Verify that changing `id` prop at runtime destroys old container and creates new one with new id
4. Verify `theme` prop change is safe no-op (no crash) when `@tsparticles/plugin-themes` is NOT loaded
5. Verify `theme` prop change applies the theme when plugin IS loaded
6. Verify component unmount destroys the container (no orphan animations)
7. Verify `particlesLoaded`/`loaded` callback emits after successful load

### Docs stale-pattern validation
```bash
# Check all Vue 3 guide files for stale patterns
grep -rn ":init" websites/website/docs/*/guides/vue3.md
grep -rn "particles-init" websites/website/docs/*/guides/vue3.md
grep -rn "particlesInit" websites/website/docs/*/guides/vue3.md

# These should return NO results after S18+S19
```

### README consistency scan
- For each updated README, verify: theme plugin note, reload contract, loaded callback, destroy behavior

---

## Handoff Checklist for Implementing Agents

### Before coding:
- [ ] Read the current repository files (do not trust memory)
- [ ] Read this document's per-wrapper analysis for the target wrapper(s)
- [ ] Confirm target files and prop type declarations
- [ ] Note that the entire `wrappers/` directory is v4-only (no v3 wrapper code existed)

### During coding:
- [ ] Changes must be wrapper-local and minimal
- [ ] No engine-wide typing changes in this phase
- [ ] Safe `loadTheme` call: `(container as unknown as { loadTheme?: (name?: string) => Promise<void> }).loadTheme?.(theme)`
- [ ] Guard `tsParticles.load()` result for `undefined` before using as `Container`
- [ ] Ensure `tsParticles.init()` is called in the provider/init function (v4 requirement that some wrappers miss)

### Before handoff:
- [ ] Run wrapper build: `pnpm --filter @tsparticles/<wrapper> build`
- [ ] Run stale-pattern checks for docs (if docs touched)
- [ ] Include list of touched files and exact behavior deltas

---

## Execution Order (Recommended for Sub-Agents)

Each step below is designed to be executed by a SEPARATE agent from scratch, using only this document as context.

```
S1  Vue 3 wrapper         → Sub-agent A
S2  Vue 2 wrapper         → Sub-agent B
S3  Angular wrapper       → Sub-agent C
S4  Solid wrapper         → Sub-agent D
S5  Qwik wrapper          → Sub-agent E
S6  Astro wrapper         → Sub-agent F ✅

S7  Inferno wrapper       → Sub-agent G
S8  Lit wrapper           → Sub-agent H
S9 Riot wrapper          → Sub-agent I
S10 WebComponents wrapper → Sub-agent J
S11 React docs             → Sub-agent K

S12  Preact wrapper            → Sub-agent L
S13  Svelte wrapper            → Sub-agent M
S14  Stencil wrapper           → Sub-agent N
S15  Ember wrapper             → Sub-agent O
S16  jQuery wrapper            → Sub-agent P
S17 Angular-fireworks wrapper → Sub-agent Q

S18 EN docs               → Sub-agent X
S19 9 translations        → Sub-agent Y

S20 Validation            → Sub-agent Z (after all above)
S21 Final handoff         → Sub-agent AA
```

Note: use wave execution from the protocol section. `S18` must precede `S19`.

---

## Demo & Template Alignment

All 29 demo projects live under `demo/` at the repo root (NOT inside wrapper packages). Each wrapper we modify has a corresponding demo. Additionally, some demos use patterns that are **workarounds for missing reactivity** — these should be simplified within the corresponding wrapper step (not deferred).

Rule: if a wrapper has an associated demo/template, that wrapper step remains open until those artifacts are aligned.

### Demo inventory: conditional mounting patterns (workarounds for no reactivity)

| Demo                                                    | Pattern                                                 | Why it exists                                                        | After reactivity fix                                                                   |
|---------------------------------------------------------|---------------------------------------------------------|----------------------------------------------------------------------|----------------------------------------------------------------------------------------|
| **Solid** (`demo/solid/src/App.tsx`)                    | `{init() && <Particles />}` via `<Show>`                | `onMount` + `createResource` was one-shot; needed init gate          | Move `initParticlesEngine` to app bootstrap; remove `<Show>` gate around `<Particles>` |
| **Preact** (`demo/preact/src/app.js`)                   | `{this.state.particlesInitialized && <Particles .../>}` | Constructor via `initParticlesEngine` returns promise, no reactivity | Move init to app bootstrap; remove conditional render                                  |
| **Qwik** (`demo/qwik/src/root.tsx`)                     | `{particlesReady.value && <Particles .../>}`            | `useVisibleTask$` runs once                                          | Remove conditional; component itself waits for init                                    |
| **Angular** (`demo/angular/src/app/app.component.html`) | `*ngIf="particlesVisible"` on `<ngx-particles>`         | Visibility toggle workaround (options change required re-mount)      | Less needed now, but `*ngIf` remains valid for conditional display                     |
| **React** (`demo/react/src/App.jsx`)                    | No conditional — uses `ParticlesProvider`               | Already has proper init gate                                         | No change needed                                                                       |
| **Vue 3** (`demo/vue3/src/App.vue`)                     | No conditional — uses `app.use(Particles, { init })`    | Already has proper plugin init                                       | No change needed                                                                       |
| **Vue 2** (`demo/vue2/src/App.vue`)                     | No conditional — uses `Vue.use(Particles, { init })`    | Already has proper plugin init                                       | No change needed                                                                       |

### Demos that use stale `particlesInit` function name at component level
| Demo | Location | Pattern | Action |
|------|----------|---------|--------|
| **Svelte** (`demo/svelte/src/App.svelte`) | `particlesInit(async (engine) => { ... })` | Function named `particlesInit` | Rename to `initParticlesEngine` for clarity (not broken, just naming) |
| **Svelte Kit** (`demo/svelte-kit/src/routes/+page.svelte`) | `particlesInit(async (engine) => { ... })` | Same as above | Same action |

### Demos with `*ngIf` visibility toggle on particles (could be simplified)
| Demo | Pattern | Notes |
|------|---------|-------|
| **Angular** (`demo/angular/src/app/app.component.html:840-841`) | `*ngIf="particlesVisible"` on `<ngx-particles>` | Used for toggle button. After reactivity, options can change without re-mount. `ngIf` is still valid for hide/show. |
| **Angular-confetti** | `*ngIf="confettiVisible"` | Separate sub-component |
| **Angular-fireworks** | `*ngIf="fireworksVisible"` | Separate sub-component |

### Step-to-artifact mapping (authoritative)

Use this map to decide ownership and avoid file collisions.

| Step | Wrapper files | Demo files | README |
|------|---------------|------------|--------|
| S1 | `wrappers/vue3/**` | `demo/vue3/**` | `wrappers/vue3/README.md` |
| S2 | `wrappers/vue2/**` | `demo/vue2/**` | `wrappers/vue2/README.md` |
| S3 | `wrappers/angular/**` | `demo/angular/**` | `wrappers/angular/README.md` |
| S4 | `wrappers/solid/**` | `demo/solid/**` | `wrappers/solid/README.md` |
| S5 | `wrappers/qwik/**` | `demo/qwik/**` | `wrappers/qwik/README.md` |
| S6 | `wrappers/astro/**` | `demo/astro/**` | `wrappers/astro/README.md` |
| S7 | `wrappers/inferno/**` | `demo/inferno/**` (check + align if needed) | `wrappers/inferno/README.md` |
| S8 | `wrappers/lit/**` | lit demo if present | `wrappers/lit/README.md` |
| S9 | `wrappers/riot/**` | riot demo if present | `wrappers/riot/README.md` |
| S10 | `wrappers/webcomponents/**` | webcomponents demo if present | `wrappers/webcomponents/README.md` |
| S11 | `wrappers/react/README.md` | `demo/react/**` check only | `wrappers/react/README.md` |
| S12 | `wrappers/preact/**` | `demo/preact/**` | `wrappers/preact/README.md` |
| S13 | `wrappers/svelte/**` | `demo/svelte/**` + `demo/svelte-kit/**` | `wrappers/svelte/README.md` |
| S14 | `wrappers/stencil/**` | stencil demo if present | `wrappers/stencil/README.md` |
| S15 | `wrappers/ember/**` | ember demo if present | `wrappers/ember/README.md` |
| S16 | `wrappers/jquery/**` | jquery demo if present | `wrappers/jquery/README.md` |
| S17 | `wrappers/angular-fireworks/**` | `demo/angular-fireworks/**` if present | `wrappers/angular-fireworks/README.md` |
| S18 | `websites/website/docs/guides/vue3.md` | N/A | N/A |
| S19 | `websites/website/docs/{zh,ja,hi,ru,pt,fr,de,es,it}/guides/vue3.md` | N/A | N/A |

If a mapped demo does not exist, record explicit `N/A` in the step output.

#### S1-DEMO — Vue 3 demo
**Files**: `demo/vue3/src/App.vue`
**Actions**:
- No conditional render to remove (already clean)
- Verify `:options` binding works with reactive changes
- Optionally add a "switch config" button to demo reactivity (changing `:options` prop)
- Verify `@particles-loaded` event fires after each reload

#### S2-DEMO — Vue 2 demo
**Files**: `demo/vue2/src/App.vue`
**Actions**:
- Same as Vue 3 — verify reactive options work
- Optionally add theme toggle demo

#### S3-DEMO — Angular demo
**Files**: `demo/angular/src/app/app.component.html`, `demo/angular/src/app/app.component.ts`
**Actions**:
- The `*ngIf="particlesVisible"` pattern is a workaround that can remain for toggle functionality, but should be documented as optional
- Add `theme` input binding example if desired
- Verify `[options]` changes trigger reload via `OnChanges`
- The `particlesVisible` toggle should NOT be the only way to change config — add a "Switch config" button that changes `[options]` directly

#### S4-DEMO — Solid demo
**Files**: `demo/solid/src/App.tsx`
**Actions**:
- **Remove** the `<Show when={initialized()}>` conditional around `<Particles>`
- Move `initParticlesEngine` call to module level (not inside `onMount`)
- After reactivity: `<Particles id="tsparticles" options={configs.basic} />` works standalone
- Optionally add config switch button to demo reactive `options` change

#### S5-DEMO — Qwik demo
**Files**: `demo/qwik/src/root.tsx`
**Actions**:
- **Remove** the `{particlesReady.value && <Particles .../>}` conditional
- Move `initParticlesEngine` to module level (outside component)
- After reactivity: `<Particles id="tsparticles" options={...} />` works standalone
- Optionally add theme/config switch

#### S6-DEMO — Astro demo
**Files**: `demo/astro/src/pages/index.astro`
**Actions**:
- Verify `<Particles>` works with reactive attribute changes
- Add `disconnectedCallback` test (navigate away and back)

### Templates
- `wrappers/react/templates/` exists but is EMPTY — no CRA templates to update
- No other template directories found in the repo
- **Action**: keep explicit template check in every wrapper step and record `N/A` when applicable

### Cross-wrapper README maintenance for demos
- After any demo change, verify the demo's code example matches the corresponding wrapper README's example
- If a demo demonstrates `:init` or `@particles-init` pattern, REMOVE it (stale API)

### Add to Definition of Done
- [ ] Conditional rendering workarounds removed from Solid (S4), Preact (S12), Qwik (S5) demos
- [ ] Svelte (S13) demos use `initParticlesEngine` naming (not `particlesInit`)
- [ ] Angular demo has config switch example (not only `*ngIf` toggle)
- [ ] All demos use correct wrapper API (no `:init`, no `@particles-init`)
- [ ] Each core wrapper demo verifiably demonstrates reactive prop changes

---

## Definition of Done

Done only if all are true:
- [ ] All 6 wrappers react to `id`, `options`, and `url` updates by reloading (within each framework's API model)
- [ ] All 6 wrappers safely handle `theme` updates without plugin hard dependency
- [ ] All 6 wrappers call `tsParticles.init()` during bootstrap (v4 fix)
- [ ] Every wrapper step (S1-S17) includes aligned demo + template check + README before closure
- [ ] All touched wrapper docs/readmes explicitly document the optional theme-plugin dependency and no-op behavior without plugin
- [ ] Website docs for touched wrappers are updated and aligned with README + implementation behavior
- [ ] All wrappers emit loaded callback/event only after `tsParticles.load` resolves
- [ ] All wrappers destroy container on component teardown
- [ ] TypeScript build passes for all affected wrapper packages
- [ ] Vue 3 English guide fixed and all 9 translations aligned
- [ ] No `:init` / `@particles-init` / stale `particlesInit` in Vue 3 guides
- [ ] Inferno calls loaded callback after load
- [ ] Lit dispatches `particlesLoaded` event
- [ ] Riot has proper teardown (container destroy on unmount)
- [ ] WebComponents observes `id` attribute changes
- [x] A1 audit completed: `nextjs`, `nuxt2`, `nuxt3`, `nuxt4`, `angular-confetti` closed as no-change with evidence; `preact`, `svelte`, `stencil`, `ember`, `jquery`, `angular-fireworks` activated for implementation
