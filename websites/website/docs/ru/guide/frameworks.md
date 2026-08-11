# Framework Integrations

`tsParticles` supports multiple wrappers, but the runtime flow is always the same:

1. initialize the engine once
2. load only the features you need (`@tsparticles/slim`, `@tsparticles/all`, or custom plugins)
3. render the wrapper component with your options

## Quick checklist

- Keep all `@tsparticles/*` package versions aligned.
- Run the loader once at app startup.
- Start with a small options object and grow incrementally.
- For SSR frameworks, mount particles client-side only.

## Start from the wrapper guide

For the complete wrappers matrix (React, Next.js, Vue/Nuxt, Angular, Svelte, Solid, and others), see:

- [`/guide/wrappers`](/guide/wrappers)

## Core integration examples

### React

> [!IMPORTANT]
> Place `ParticlesProvider` at your app root (e.g., `main.tsx` or `layout.tsx`), not inside a component that may unmount.
> The `init` callback runs only once for the entire app lifecycle.

```tsx
import { useMemo } from "react";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import type { Engine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const init = async (engine: Engine): Promise<void> => {
  await loadSlim(engine);
};

export function ParticlesBackground() {
  const options = useMemo(
    () => ({
      particles: {
        move: { enable: true },
        number: { value: 60 },
      },
    }),
    [],
  );

  return (
    <ParticlesProvider init={init}>
      <Particles id="tsparticles" options={options} />
    </ParticlesProvider>
  );
}
```

### Vue 3

```ts
import { createApp } from "vue";
import Particles from "@tsparticles/vue3";
import type { Engine } from "@tsparticles/engine";
import App from "./App.vue";

async function registerParticles(engine: Engine): Promise<void> {
  const [{ loadSlim }] = await Promise.all([import("@tsparticles/slim")]);

  await loadSlim(engine);
}

const app = createApp(App);

app.use(Particles, { init: registerParticles });
app.mount("#app");
```

### Angular

```ts
import { Component, OnInit } from "@angular/core";
import type { ISourceOptions } from "@tsparticles/engine";
import { NgParticlesService } from "@tsparticles/angular";
import { loadSlim } from "@tsparticles/slim";

@Component({
  selector: "app-root",
  template: `<ngx-particles [id]="id" [options]="options"></ngx-particles>`,
})
export class AppComponent implements OnInit {
  id = "tsparticles";
  options: ISourceOptions = {
    particles: {
      move: { enable: true },
      number: { value: 70 },
    },
  };

  constructor(private readonly particlesService: NgParticlesService) {}

  ngOnInit(): void {
    void this.particlesService.init(async (engine) => {
      await loadSlim(engine);
    });
  }
}
```

## Practical guidance

- Prefer `@tsparticles/slim` as baseline for most apps.
- Keep options in dedicated config files when they grow.
- For expensive scenes, expose start/stop controls in your UI.

## Source references

- Wrappers source: <https://github.com/tsparticles/tsparticles/tree/main/wrappers>
- Framework demos source: <https://github.com/tsparticles/tsparticles/tree/main/demo>
- Engine package: <https://github.com/tsparticles/tsparticles/tree/main/engine>
- Bundles: <https://github.com/tsparticles/tsparticles/tree/main/bundles>
