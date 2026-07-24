# Fix Prompt: Code Review Findings

You are fixing 6 confirmed bugs in the tsparticles monorepo. Each bug is described with the exact file, line range, what's wrong, and the fix to apply. Do NOT skip any fix. Do NOT add comments. Do NOT refactor surrounding code.

After all fixes, run `pnpm exec vitest` from the repo root to verify nothing is broken. If any test fails, fix it.

---

## Bug 1: Lit wrapper uses old theme value ✅ DONE

**File:** `wrappers/lit/src/lit-tsparticles.ts` ~line 111

**Problem:** `changedProperties.get("theme")` in Lit returns the **previous** value, not the new one. So `loadTheme(newTheme)` loads the old theme.

**Fix:** Replace `changedProperties.get("theme")` with `this.theme`:

```ts
// Before
const newTheme = changedProperties.get("theme") as string | undefined;
(this.container as unknown as { loadTheme?: (name?: string) => Promise<void> }).loadTheme?.(newTheme);

// After
(this.container as unknown as { loadTheme?: (name?: string) => Promise<void> }).loadTheme?.(this.theme);
```

Remove the `const newTheme` line entirely.

---

## Bug 2: Solid wrapper race condition on rapid prop changes ✅ DONE

**File:** `wrappers/solid/src/Particles.tsx` ~lines 17-33

**Problem:** No load ID guard. If `loadParams()` changes while `tsParticles.load()` is pending, an older promise can resolve after a newer one and overwrite `container` with a stale instance.

**Fix:** Add a `loadId` counter (like the Lit and webcomponents wrappers do). Before assigning `container`, check that the load ID still matches:

```tsx
let loadId = 0;

createEffect(() => {
  const { id, options, url } = loadParams();
  const currentLoadId = ++loadId;

  void (async () => {
    container?.destroy();

    await waitForParticlesEngineInitialization();

    if (!isParticlesEngineInitialized()) {
      throw new Error("initParticlesEngine(...) must be called once before rendering <Particles /> components.");
    }

    const newContainer = await tsParticles.load({ id, options, url });

    if (currentLoadId !== loadId) {
      newContainer?.destroy();
      return;
    }

    container = newContainer;

    props.particlesLoaded?.(container);
  })();
});
```

---

## Bug 3: Vue2 wrapper doesn't destroy container on id change ✅ DONE

**File:** `wrappers/vue2/src/Particles/vue-particles.vue` ~lines 55-62

**Problem:** When `id` changes, `particlesInit()` calls `tsParticles.load()` with the new id. The engine only finds and replaces containers with the **same** id, so the old container (old id) is never destroyed and keeps animating.

**Fix:** Destroy the existing container before reinitializing when the id changes. Since the watcher fires for options/url/id together, always destroy the old container before calling `particlesInit`:

```ts
@Watch("options")
@Watch("url")
@Watch("id")
onPropChange(): void {
  if (this.container) {
    this.container.destroy();
    void particlesInit(this);
  }
}
```

---

## Bug 4: Webcomponents wrapper ignores data-id attribute updates ✅ DONE

**File:** `wrappers/webcomponents/src/Particles.ts` ~lines 105-110

**Problem:** `attributeChangedCallback("data-id", ...)` calls `#loadParticles()` which uses `this.id` (i.e. `super.id`). But `super.id` is NOT updated when `data-id` is set via `setAttribute`. So `<web-particles data-id="foo">` loads with the empty/old id.

**Fix:** In the `data-id` attribute changed callback, update the element's id before triggering the reload:

```ts
if (name === "data-id") {
  if (this.isConnected) {
    this.container.current?.destroy();

    if (newValue) {
      super.id = newValue;
    }

    void this.#loadParticles(++this.#loadId);
  }
}
```

---

## Bug 5: Angular fireworks wrapper race condition ✅ DONE

**File:** `wrappers/angular-fireworks/projects/ng-fireworks/src/lib/ng-fireworks.component.ts` ~lines 59-67

**Problem:** No load ID guard. If `ngOnChanges` fires while a previous `fireworks()` call is still pending, both promises race. The older one can resolve last and overwrite `#fireworksInstance`.

**Fix:** Add a `#loadId` counter. Only assign `#fireworksInstance` if the load ID still matches:

```ts
#loadId = 0;

async #startFireworks(): Promise<void> {
  this.#fireworksInstance?.destroy();
  this.#fireworksInstance = undefined;

  const currentLoadId = ++this.#loadId;
  const instance = await fireworks(this.id, this.options);

  if (currentLoadId !== this.#loadId) {
    instance?.destroy();
    return;
  }

  this.#fireworksInstance = instance;
  this.#fireworksInstance?.play();
}
```

---

## Bug 6: Ribbons fire() drops create-time options ✅ DONE

**File:** `bundles/ribbons/src/ribbons.ts` ~line 132

**Problem:** When the returned function from `ribbons.create()` is called with no arguments, `subOptions = idOrOptions ?? {}` replaces the create-time options with `{}`. The string overload (`fire("id")`) correctly falls back to `options`, but the no-arg path doesn't.

**Fix:** Change `{}` to `options`:

```ts
// Before
subOptions = idOrOptions ?? {};

// After
subOptions = idOrOptions ?? options;
```

---

## Verification ✅ DONE

After applying all 6 fixes:

1. `pnpm exec vitest` — all tests must pass → **152/152 passed**
2. `pnpm nx run-many -t lint` — lint must pass (or at minimum, no new errors in the files you changed)

---

## Optional Fixes (evaluate after, not required)

These are lower-priority or edge-case findings. Do NOT include them in the main fix pass. Apply them only if the main 6 fixes all pass cleanly.

### Optional A: OffscreenCanvas guard in worker context

**File:** `engine/src/Core/RenderManager.ts` ~lines 794-797

**Problem:** In a worker context, `HTMLCanvasElement`, `HTMLVideoElement`, `HTMLImageElement` are not defined as globals. If `background.element` is an `OffscreenCanvas`, the `instanceof HTMLCanvasElement` check throws a `ReferenceError`.

**Fix:** Guard each constructor with `typeof` before `instanceof`:

```ts
} else if (
  (typeof HTMLCanvasElement !== "undefined" && background.element instanceof HTMLCanvasElement) ||
  background.element instanceof OffscreenCanvas ||
  (typeof HTMLVideoElement !== "undefined" && background.element instanceof HTMLVideoElement) ||
  (typeof HTMLImageElement !== "undefined" && background.element instanceof HTMLImageElement)
) {
```

Same pattern should be applied to the string-selector branch at ~line 779 if desired.

**Risk:** Very low — only affects worker + background.element usage.

---

### Optional B: Qwik wrapper — reject on missing init

**File:** `wrappers/qwik/src/components/particles/initParticlesEngine.ts` ~lines 59-61

**Problem:** If `initParticlesEngine()` is never called, `waitForParticlesEngineInitialization()` hangs forever. The promise never resolves or rejects.

**Fix:** Add a timeout or immediate reject if init was never triggered. Alternatively, check if `initPromise` is undefined and throw:

```ts
export async function waitForParticlesEngineInitialization(): Promise<void> {
  if (initialized) return;
  if (initPromise) {
    await initPromise;
    return;
  }
  throw new Error("initParticlesEngine(...) must be called once before rendering particles.");
}
```

**Risk:** Low — changes behavior from "silent hang" to "error", which is better but could break apps that rely on the hang to hide the misconfiguration.

---

### Optional C: Svelte wrapper — track options without JSON.stringify

**File:** `wrappers/svelte/src/lib/Particles.svelte` ~line 27

**Problem:** `JSON.stringify(options)` drops functions. If options contain non-serializable values (e.g. `background.draw` callback), changing them won't trigger a reload.

**Fix:** Use a counter or version signal instead of stringified key. This requires structural changes to the Svelte component and should be evaluated carefully.

**Risk:** Medium — structural change to the Svelte wrapper. Only worth it if non-serializable options are a supported use case.

---

### Optional D: Stencil wrapper — forward both url and options

**File:** `wrappers/stencil/src/components/stencil-particles/stencil-particles.tsx` ~line 75

**Problem:** `...(this.options ? { options: this.options } : { url: this.url! })` drops `url` when `options` is present. The engine supports `url` as primary source with `options` as fallback, but Stencil ignores this combination.

**Fix:** Include both when both are present:

```ts
...(this.options ? { options: this.options } : {}),
...(this.url ? { url: this.url } : {}),
```

**Risk:** Low — additive change, but changes behavior for users currently passing both props (which currently silently ignores url).
