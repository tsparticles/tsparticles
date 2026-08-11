# Integrazioni Framework

`tsParticles` supporta molti wrapper, ma il flusso runtime resta sempre lo stesso:

1. inizializza il motore una sola volta
2. carica solo le funzionalita di cui hai bisogno (`@tsparticles/slim`, `@tsparticles/all` o plugin custom)
3. renderizza il componente wrapper con le tue opzioni

## Checklist rapida

- Mantieni allineate le versioni di tutti i pacchetti `@tsparticles/*`.
- Esegui il loader una sola volta all'avvio dell'app.
- Parti con un oggetto opzioni piccolo e fai crescere la configurazione in modo incrementale.
- Nei framework SSR, monta le particelle solo lato client.

## Parti dalla guida wrapper

Per la matrice completa dei wrapper (React, Next.js, Vue/Nuxt, Angular, Svelte, Solid e altri), vedi:

- [`/guide/wrappers`](/it/guide/wrappers)

## Esempi base di integrazione

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

## Linee guida pratiche

- Usa `@tsparticles/slim` come baseline per la maggior parte delle app.
- Quando le opzioni crescono, spostale in file di configurazione dedicati.
- Per scene costose, esponi controlli start/stop nell'interfaccia utente.

## Riferimenti sorgente

- Sorgente wrapper: <https://github.com/tsparticles/tsparticles/tree/main/wrappers>
- Sorgente demo framework: <https://github.com/tsparticles/tsparticles/tree/main/demo>
- Pacchetto engine: <https://github.com/tsparticles/tsparticles/tree/main/engine>
- Bundle: <https://github.com/tsparticles/tsparticles/tree/main/bundles>
