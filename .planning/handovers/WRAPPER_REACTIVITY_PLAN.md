# Wrapper Reactivity & Vue3 Docs Plan — Enriched

> **Status**: Planning document (ready for agent execution)
> **Total wrappers in scope**: 6 core + ~15 extended alignment
> **Previous version**: ~560 lines — this enriched version adds per-wrapper code analysis, type contracts, before/after code, and per-substep agent instructions.

---

## Execution Summary (Supervisor View)

Use this table as the single high-level progress board. Update it whenever a step changes state.

| Step | Area                         | Owner Agent | Status  | Last update | Notes                                                   |
|------|------------------------------|-------------|---------|-------------|---------------------------------------------------------|
| S1   | Vue 3 package family         | Unassigned  | Pending | -           | Wrapper + demo + template check + README + verification |
| S2   | Vue 2 package family         | Unassigned  | Pending | -           | Wrapper + demo + template check + README + verification |
| S3   | Angular package family       | Unassigned  | Pending | -           | Wrapper + demo + template check + README + verification |
| S4   | Solid package family         | Unassigned  | Pending | -           | Wrapper + demo + template check + README + verification |
| S5   | Qwik package family          | Unassigned  | Pending | -           | Wrapper + demo + template check + README + verification |
| S6   | Astro package family         | Unassigned  | Pending | -           | Wrapper + demo + template check + README + verification |
| S7   | Inferno package family       | Unassigned  | Pending | -           | Wrapper + mapped demo alignment + README + verification |
| S8   | Lit package family           | Unassigned  | Pending | -           | Wrapper + mapped demo alignment + README + verification |
| S9   | Riot package family          | Unassigned  | Pending | -           | Wrapper + mapped demo alignment + README + verification |
| S10  | WebComponents package family | Unassigned  | Pending | -           | Wrapper + mapped demo alignment + README + verification |
| S11  | React docs-only family       | Unassigned  | Pending | -           | README alignment + demo/template check                  |
| S12  | Website docs EN              | Unassigned  | Pending | -           | Must finish before S13                                  |
| S13  | Website docs translations    | Unassigned  | Pending | -           | 9 translations, mirror S12                              |
| S14  | Validation                   | Unassigned  | Pending | -           | Build + smoke + stale-pattern checks                    |
| S15  | Final handoff                | Unassigned  | Pending | -           | Consolidated deltas and residual risks                  |

Status legend: `Pending`, `In progress`, `Blocked`, `Partial`, `Done`, `N/A`.

---

## Scope

Implement reactive updates for wrapper components when `options`, `url`, or `theme` props change, and align Vue 3 guide docs with actual wrapper APIs.

### In scope
- **Core wrappers**: `vue3`, `vue2`, `angular`, `solid`, `qwik`, `astro`
- **Website docs**: update all affected wrapper guide pages so behavior/docs match implemented v4 wrapper behavior (not only Vue 3).
- **Mandatory website set**: `websites/website/docs/guides/vue3.md` + all 9 translations under `websites/website/docs/{zh,ja,hi,ru,pt,fr,de,es,it}/guides/vue3.md`.
- **Wrapper READMEs**: update README files for all touched wrappers (`vue3`, `vue2`, `angular`, `solid`, `qwik`, `astro`) when behavior text is stale.

### Extended alignment scope (audited, not core)
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

### Ordered steps

| Step | Wrapper / Scope | Deliverable | Status |
|------|------------------|-------------|--------|
| S1 | Vue 3 package family | Wrapper + Vue 3 demo + template check + Vue 3 README aligned | Pending |
| S2 | Vue 2 package family | Wrapper + Vue 2 demo + template check + Vue 2 README aligned | Pending |
| S3 | Angular package family | Wrapper + Angular demo + template check + Angular README aligned | Pending |
| S4 | Solid package family | Wrapper + Solid demo + template check + Solid README aligned | Pending |
| S5 | Qwik package family | Wrapper + Qwik demo + template check + Qwik README aligned | Pending |
| S6 | Astro package family | Wrapper + Astro demo + template check + Astro README aligned | Pending |
| S7 | Inferno package family | Wrapper + demo/template check + Inferno README aligned | Pending |
| S8 | Lit package family | Wrapper + demo/template check + Lit README aligned | Pending |
| S9 | Riot package family | Wrapper + demo/template check + Riot README aligned | Pending |
| S10 | WebComponents package family | Wrapper + demo/template check + WebComponents README aligned | Pending |
| S11 | React docs-only family | React README alignment (+ demo/template verification if needed) | Pending |
| S12 | Website docs batch (EN first) | Vue 3 EN guide update to match shipped behavior | Pending |
| S13 | Website docs batch (9 translations) | Mirror EN update in all required translation files | Pending |
| S14 | Validation | Build + smoke + stale-pattern checks | Pending |
| S15 | Final handoff | Changelog + deltas + residual risks | Pending |

### Per-step substep template (apply to every wrapper step S1-S11)

- `a` Wrapper code changes (`id/options/url` reload, theme safety, teardown, init wait)
- `b` Demo alignment for that wrapper family
- `c` Template alignment check (or explicit N/A note)
- `d` Wrapper README alignment
- `e` Verification (`pnpm --filter <pkg> build` + smoke behavior checks)

No wrapper step can be marked complete unless all five substeps are complete.

## Agent Execution Protocol (mandatory)

This plan is designed for distributed execution by multiple agents. Follow this protocol to avoid drift and overlap.

### 1) Ownership model
- One agent owns exactly one step at a time.
- No agent may edit files outside its owned step, except `S14` and `S15` owner agents.
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
- **Wave 1**: `S1-S6` in parallel (core wrappers).
- **Wave 2**: `S7-S11` in parallel (extended wrappers/docs-only).
- **Wave 3**: `S12` then `S13` (strictly sequential).
- **Wave 4**: `S14` validation.
- **Wave 5**: `S15` final handoff.

### 5) Conflict avoidance
- `S12`/`S13` are the only steps allowed to edit `websites/website/docs/**/guides/vue3.md`.
- Each wrapper step edits only its wrapper package + mapped demo + mapped README.
- `S14` does not change implementation unless explicitly requested; it validates and reports.

### 6) Failure policy
- If verification fails, step status is `partial` (not `done`).
- If blocked by external dependency, status is `blocked` with exact blocker and next action.
- Never silently skip demo/template/README substeps.

---

## Per-Wrapper Implementation Details

---

### S1 — Vue 3 Implementation

**Files to modify**:
- `wrappers/vue3/src/components/vue-particles.vue` (main component)
- `wrappers/vue3/src/components/index.ts` (exports — possibly add `IParticlesProps` type export)

**Changes needed**:

#### 2a: Add watchers for `id`, `options`, `url` → reload

```ts
// Add AFTER existing setup code:
watch(() => props.id, () => {
  if (provider.loaded && isMounted.value) { void loadParticles(); }
});

watch(() => props.options, () => {
  if (provider.loaded && isMounted.value) { void loadParticles(); }
}, { deep: true });  // deep watch needed for object equality

watch(() => props.url, () => {
  if (provider.loaded && isMounted.value) { void loadParticles(); }
});
```

**Risk**: `{ deep: true }` on `options` could fire frequently. Consider `{ deep: false }` with structured clone comparison, or rely on the reference changing.

**Risk**: Initial double load — the existing watchers for `provider.loaded` and `isMounted` already trigger `loadParticles()` once on mount. Adding `options`/`url` watchers with `immediate: false` (default) avoids double-load at startup.

#### 2b: Add watcher for `theme` → safe `loadTheme`

```ts
watch(() => props.theme, (newTheme) => {
  if (!container) return;
  (container as unknown as { loadTheme?: (name?: string) => Promise<void> }).loadTheme?.(newTheme);
});
```

No `immediate: true` — on initial load, `theme` is not applied. The initial load should apply the theme if provided. Could do:
```ts
watch(() => props.theme, (newTheme) => {
  if (!container) return;
  (container as unknown as { loadTheme?: (name?: string) => Promise<void> }).loadTheme?.(newTheme);
});
// Apply initial theme after load:
const loadParticles = async () => {
  container?.destroy();
  container = await tsParticles.load({ id: props.id, url: props.url, options: props.options });
  // Apply theme if provided after initial load
  if (container && props.theme) {
    (container as unknown as { loadTheme?: (name?: string) => Promise<void> }).loadTheme?.(props.theme);
  }
  emit("particlesLoaded", container);
};
```

#### 2c: Fix `IParticlesProps` naming conflict

Current: `export type IParticlesProps = ISourceOptions;` — this shadows the actual props type.

Fix: Remove this line. The `defineProps` already defines the type correctly. If users need the type for external use, export it differently.

#### 2d: Ensure `particlesLoaded` guard for `Container | undefined`

Already emitting `container` which could be `undefined` — the emit signature already says `container?: Container`. This is correct.

**Verification**:
- `pnpm --filter @tsparticles/vue3 build`
- Manual smoke: change options at runtime, verify particles reload
- Manual smoke: change theme prop with and without `@tsparticles/plugin-themes`

#### S1.b: Demo alignment
- Align `demo/vue3/src/App.vue` with final reactive behavior.
- Ensure demo can show runtime `options` change without remount hacks.

#### S1.c: Template alignment
- Verify whether Vue 3 templates exist for this wrapper family.
- If none exist, record explicit `N/A` in implementation notes.

#### S1.d: README alignment
- Update `wrappers/vue3/README.md` to match shipped behavior (`id/options/url` reload, optional `theme` plugin note, loaded callback timing, teardown behavior).

#### S1.e: Completion gate
- Mark S1 complete only when S1.a-S1.d are done and verification passes.

---

### S2 — Vue 2 Implementation

**Files to modify**:
- `wrappers/vue2/src/Particles/vue-particles.vue`
- `wrappers/vue2/src/Particles/event-bus.ts` (add `tsParticles.init()` call)

**Changes needed**:

#### 3a: Add `theme` prop

```ts
@Prop() readonly theme?: string;
```

#### 3b: Add watchers for `options`, `url` → reload

In Vue 2 class components, use `@Watch` decorator:

```ts
import { Watch } from "vue-property-decorator";

@Watch("options")
@Watch("url")
@Watch("id")
onPropChange(): void {
  if (this.container) {
    void particlesInit(this);
  }
}
```

**Vue 2 Caveat**: `@Watch` with `immediate: false` prevents double-load on mount. But need to ensure `mounted()` -> `$nextTick` -> `particlesInit` is the sole initial load path.

#### 3c: Add watcher for `theme` → safe `loadTheme`

```ts
@Watch("theme")
onThemeChange(newTheme?: string): void {
  if (!this.container) return;
  (this.container as unknown as { loadTheme?: (name?: string) => Promise<void> }).loadTheme?.(newTheme);
}
```

#### 3d: Fix `IParticlesProps` export issue

Remove `export type IParticlesProps = ISourceOptions;` — causes `TS2528` in SFC compiler context. Or change to `export { type IParticlesProps };` with the import.

#### 3e: Fix `particlesLoaded` type guard

```ts
// In particlesInit() cb:
const cb = (container?: Container) => {
  this.container = container;
  if (container && this.particlesLoaded) {
    this.particlesLoaded(container);
  }
};
```

#### 3f: Fix event-bus.ts — add `tsParticles.init()` call

```ts
initCallback = init;
initPromise = Promise.resolve(init?.(tsParticles))
  .then(() => {
    return tsParticles.init();  // ADD THIS for v4
  })
  .then(() => {
    initialized = true;
  })
  .catch(error => { ... });
```

**Verification**:
- `pnpm --filter @tsparticles/vue2 build`
- Check SFC compiler errors with `export type`

#### S2.b: Demo alignment
- Align `demo/vue2/src/App.vue` with final reactive behavior.
- Ensure demo can show runtime `options` change without remount hacks.

#### S2.c: Template alignment
- Verify whether Vue 2 templates exist for this wrapper family.
- If none exist, record explicit `N/A` in implementation notes.

#### S2.d: README alignment
- Update `wrappers/vue2/README.md` with final behavior contract and optional theme-plugin caveat.

#### S2.e: Completion gate
- Mark S2 complete only when S2.a-S2.d are done and verification passes.

---

### S3 — Angular Implementation

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

### S4 — Solid Implementation

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

### S5 — Qwik Implementation

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

### S6 — Astro Implementation

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

### S7 — Inferno Implementation (package family)

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

### S8 — Lit Implementation (package family)

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

### S9 — Riot Implementation (package family)

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

### S10 — WebComponents Implementation (package family)

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

### S11 — React Docs Alignment (package family)

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

### Agent execution order for S12+S13
1. Edit EN file first (S12)
2. Mirror structural + code changes in all 9 translations (S13)
3. Preserve translated prose where possible; update only code blocks and section structure
4. Run stale-pattern grep to verify: no `:init`, no `@particles-init`, no `particlesInit` remains

---

## README Changes Per Wrapper

README work is **embedded in each wrapper step** (S1-S11) and is not a standalone late phase.

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

# These should return NO results after S12+S13
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
S6  Astro wrapper         → Sub-agent F

S7  Inferno wrapper       → Sub-agent G
S8  Lit wrapper           → Sub-agent H
S9 Riot wrapper          → Sub-agent I
S10 WebComponents wrapper → Sub-agent J
S11 React docs-only       → Sub-agent K

S12 Vue 3 EN guide        → Sub-agent L
S13 9 translations        → Sub-agent M

S14 Validation            → Sub-agent N (after all above)
S15 Final handoff         → Sub-agent O
```

Note: use wave execution from the protocol section. `S12` must precede `S13`.

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

### Demo alignment tasks per wrapper (NEW steps)

Apply these inside each wrapper step before marking it complete:

#### S7-DEMO-PR — Preact demo (extended alignment)
**Files**: `demo/preact/src/components/app.js`
**Actions**:
- **Remove** the `{this.state.particlesInitialized && <Particles .../>}` conditional
- Move `initParticlesEngine` to module level (outside component lifecycle)
- After reactivity: `<Particles id="tsparticles" options={...} />` works standalone
- This is part of S7 completion (Inferno family) and cannot be deferred

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
| S7 | `wrappers/inferno/**` | `demo/preact/**` (extended cleanup) + inferno demo if present | `wrappers/inferno/README.md` |
| S8 | `wrappers/lit/**` | lit demo if present | `wrappers/lit/README.md` |
| S9 | `wrappers/riot/**` | riot demo if present | `wrappers/riot/README.md` |
| S10 | `wrappers/webcomponents/**` | webcomponents demo if present | `wrappers/webcomponents/README.md` |
| S11 | `wrappers/react/README.md` | `demo/react/**` check only | `wrappers/react/README.md` |
| S12 | `websites/website/docs/guides/vue3.md` | N/A | N/A |
| S13 | `websites/website/docs/{zh,ja,hi,ru,pt,fr,de,es,it}/guides/vue3.md` | N/A | N/A |

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
- [ ] Conditional rendering workarounds removed from Solid, Preact, Qwik demos
- [ ] Angular demo has config switch example (not only `*ngIf` toggle)
- [ ] All demos use correct wrapper API (no `:init`, no `@particles-init`)
- [ ] Each core wrapper demo verifiably demonstrates reactive prop changes

---

## Definition of Done

Done only if all are true:
- [ ] All 6 wrappers react to `id`, `options`, and `url` updates by reloading (within each framework's API model)
- [ ] All 6 wrappers safely handle `theme` updates without plugin hard dependency
- [ ] All 6 wrappers call `tsParticles.init()` during bootstrap (v4 fix)
- [ ] Every wrapper step (S1-S11) includes aligned demo + template check + README before closure
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
