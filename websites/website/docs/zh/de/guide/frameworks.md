# Framework-Integrationen

`tsParticles` unterstutzt mehrere Wrapper, aber der Runtime-Ablauf bleibt immer gleich:

1. die Engine einmal initialisieren
2. nur die benotigten Features laden (`@tsparticles/slim`, `@tsparticles/all`, oder eigene Plugins)
3. die Wrapper-Komponente mit den eigenen Optionen rendern

## Schnelle Checkliste

- Halte alle `@tsparticles/*`-Versionen auf dem gleichen Stand.
- Fuhre den Loader nur einmal beim App-Start aus.
- Starte mit einem kleinen Optionsobjekt und erweitere schrittweise.
- Bei SSR-Frameworks nur clientseitig mounten.

## Einstieg uber den Wrapper-Guide

Die komplette Wrapper-Matrix (React, Next.js, Vue/Nuxt, Angular, Svelte, Solid und weitere) findest du hier:

- [`/guide/wrappers`](/de/guide/wrappers)

## Kernbeispiele fur Integrationen

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

## Praktische Hinweise

- Nutze `@tsparticles/slim` als Basis fur die meisten Anwendungen.
- Lege Optionen in dedizierte Konfigurationsdateien aus, sobald sie wachsen.
- Fur aufwendige Szenen: Start/Stopp-Kontrollen in der UI anbieten.

## Quellen

- Wrapper-Quellen: <https://github.com/tsparticles/tsparticles/tree/main/wrappers>
- Framework-Demos: <https://github.com/tsparticles/tsparticles/tree/main/demo>
- Engine-Paket: <https://github.com/tsparticles/tsparticles/tree/main/engine>
- Bundles: <https://github.com/tsparticles/tsparticles/tree/main/bundles>
