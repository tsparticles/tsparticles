# Integrazione Astro

Usa tsParticles nel tuo sito Astro con il pacchetto ufficiale `@tsparticles/astro`.

## Installazione

Installa l'integrazione Astro e il core di tsParticles tramite il tuo gestore di pacchetti:

```bash
npm install @tsparticles/astro tsparticles
```

```bash
pnpm add @tsparticles/astro tsparticles
```

```bash
yarn add @tsparticles/astro tsparticles
```

## Inizializzazione del Motore

tsParticles usa un'architettura modulare. Prima di renderizzare le particelle, devi inizializzare il motore con le funzionalità che ti servono. Crea uno script client (es. `src/scripts/particles-init.ts`) o usa un `<script>` inline nel tuo componente Astro:

```typescript
import { initParticlesEngine } from "@tsparticles/astro";

void initParticlesEngine(async (engine) => {
  const { loadFull } = await import("tsparticles");
  await loadFull(engine);
});
```

> `initParticlesEngine` è un wrapper attorno a `tsParticles.init()` che garantisce che il motore sia pronto prima che il componente `<Particles>` venga montato. Restituisce una `Promise` che si risolve al completamento dell'inizializzazione.

## Utilizzo Base

Posiziona il componente `<Particles />` in qualsiasi template `.astro`. Passa la tua configurazione tramite la prop `options`:

```astro
---
import Particles from "@tsparticles/astro";
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  background: {
    color: "#000000",
  },
  particles: {
    number: { value: 80 },
    links: { enable: true, color: "#ffffff" },
    move: { enable: true, speed: 2 },
  },
};
---

<Particles id="tsparticles" options={options} />

<script>
  import { initParticlesEngine } from "@tsparticles/astro";

  void initParticlesEngine(async (engine) => {
    const { loadFull } = await import("tsparticles");
    await loadFull(engine);
  });
</script>
```

> La prop `id` viene passata al `<div>` contenitore del canvas sottostante. Usala per lo styling o l'accesso imperativo tramite `document.getElementById()`.

## Supporto TypeScript

L'integrazione include dichiarazioni TypeScript complete. Usa `ISourceOptions` da `@tsparticles/engine` per tipizzare la tua configurazione:

```typescript
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  background: { color: "#0d47a1" },
  fpsLimit: 60,
  particles: {
    color: {
      value: ["#ff0000", "#00ff00", "#0000ff"],
    },
    move: {
      enable: true,
      speed: 3,
      outModes: "bounce",
    },
    number: {
      value: 50,
      density: { enable: true },
    },
    opacity: { value: 0.5 },
    shape: { type: "circle" },
    size: { value: { min: 2, max: 6 } },
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: "repulse" },
    },
    modes: {
      repulse: { distance: 200 },
    },
  },
};
```

## Configurazione Personalizzata

Ecco una configurazione più elaborata che puoi inserire in qualsiasi pagina Astro:

```astro
---
import Particles from "@tsparticles/astro";
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  autoPlay: true,
  background: {
    color: "#0d47a1",
    image: "",
    position: "50% 50%",
    repeat: "no-repeat",
    size: "cover",
  },
  backgroundMode: {
    enable: true,
    zIndex: -1,
  },
  fpsLimit: 120,
  particles: {
    color: {
      value: "#ffffff",
      animation: {
        enable: true,
        speed: 20,
        sync: false,
      },
    },
    links: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1,
      triangles: {
        enable: true,
        opacity: 0.1,
      },
    },
    move: {
      enable: true,
      speed: 3,
      direction: "none",
      random: true,
      straight: false,
      outModes: "out",
      attract: { enable: false },
    },
    number: {
      value: 80,
      density: {
        enable: true,
      },
    },
    opacity: {
      value: 0.5,
      animation: {
        enable: true,
        speed: 1,
        sync: false,
      },
    },
    shape: {
      type: "circle",
    },
    size: {
      value: { min: 1, max: 5 },
      animation: {
        enable: true,
        speed: 3,
        sync: false,
      },
    },
  },
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "grab",
      },
      onClick: {
        enable: true,
        mode: "push",
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 200,
        links: { opacity: 0.5 },
      },
      push: { quantity: 4 },
    },
  },
  detectRetina: true,
};
---

<Particles id="tsparticles" options={options} />

<script>
  import { initParticlesEngine } from "@tsparticles/astro";

  void initParticlesEngine(async (engine) => {
    const { loadFull } = await import("tsparticles");
    await loadFull(engine);
  });
</script>
```

## Usare i Preset

Invece di creare una configurazione manualmente, carica un preset durante l'inizializzazione del motore e referenzialo nelle opzioni:

```astro
---
import Particles from "@tsparticles/astro";
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  preset: "stars",
  background: { color: "#000000" },
};
---

<Particles id="tsparticles" options={options} />

<script>
  import { initParticlesEngine } from "@tsparticles/astro";

  void initParticlesEngine(async (engine) => {
    const { loadStarsPreset } = await import("tsparticles-preset-stars");
    await loadStarsPreset(engine);
  });
</script>
```

## Integrazione con Altri Framework

Poiché Astro supporta framework UI come React, Vue, Svelte e Solid, puoi usare il componente tsParticles specifico per framework all'interno di file `.astro`:

### React in Astro

```astro
---
import Particles from "@tsparticles/react";
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  background: { color: "#000" },
  particles: {
    number: { value: 60 },
    links: { enable: true },
    move: { enable: true },
  },
};
---

<Particles client:load id="tsparticles" options={options} />
```

### Vue in Astro

```astro
---
import Particles from "@tsparticles/vue3";
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  background: { color: "#000" },
  particles: {
    number: { value: 60 },
    links: { enable: true },
    move: { enable: true },
  },
};
---

<Particles client:load id="tsparticles" :options="options" />
```

> La direttiva `client:load` dice ad Astro di idratare il componente immediatamente al caricamento della pagina. Usa `client:visible` per un caricamento differito.

## Esempio di Pagina Completa

Una pagina Astro completa con particelle come sfondo animato:

```astro
---
import Layout from "../layouts/Layout.astro";
import Particles from "@tsparticles/astro";
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  background: { color: "#0d47a1" },
  fpsLimit: 60,
  particles: {
    number: { value: 100 },
    color: { value: "#ffffff" },
    links: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
    },
    move: {
      enable: true,
      speed: 2,
      outModes: "out",
    },
    size: {
      value: { min: 1, max: 4 },
    },
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: "grab" },
      onClick: { enable: true, mode: "push" },
    },
    modes: {
      grab: { distance: 200, links: { opacity: 0.5 } },
      push: { quantity: 4 },
    },
  },
};
---

<Layout title="Sfondo Particelle">
  <main>
    <h1>Benvenuto</h1>
    <p>Questa pagina ha uno sfondo con particelle alimentato da tsParticles.</p>
  </main>
  <Particles id="bg-particles" options={options} />
</Layout>

<style is:global>
  #bg-particles {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
  main {
    position: relative;
    z-index: 1;
    color: white;
    text-align: center;
    padding-top: 20vh;
  }
</style>

<script>
  import { initParticlesEngine } from "@tsparticles/astro";

  void initParticlesEngine(async (engine) => {
    const { loadFull } = await import("tsparticles");
    await loadFull(engine);
  });
</script>
```

## Props del Componente

| Prop                | Tipo             | Default                  | Descrizione                                   |
| ------------------- | ---------------- | ------------------------ | --------------------------------------------- |
| `id`                | `string`         | `"tsparticles"`          | ID dell'elemento DOM per il contenitore       |
| `options`           | `ISourceOptions` | `{}`                     | Oggetto di configurazione tsParticles completo |
| `url`               | `string`         | —                        | Carica configurazione da URL JSON remota      |
| `particlesClassName`| `string`         | `"tsparticles-canvas-el"`| Classe CSS per l'elemento canvas              |
| `container`         | `object`         | —                        | Istanza `Container` preesistente (avanzato)   |
