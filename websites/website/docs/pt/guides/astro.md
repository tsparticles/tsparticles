# Integração Astro

Use tsParticles no seu site Astro com o pacote de integração oficial `@tsparticles/astro`.

## Instalação

Instale a integração Astro e o núcleo tsParticles através do seu gerenciador de pacotes:

```bash
npm install @tsparticles/astro tsparticles
```

```bash
pnpm add @tsparticles/astro tsparticles
```

```bash
yarn add @tsparticles/astro tsparticles
```

## Inicialização do Motor

tsParticles usa uma arquitetura modular. Antes de renderizar partículas, você deve inicializar o motor com as funcionalidades necessárias. Crie um script cliente (ex.: `src/scripts/particles-init.ts`) ou use um `<script>` inline no seu componente Astro:

```typescript
import { initParticlesEngine } from "@tsparticles/astro";

void initParticlesEngine(async (engine) => {
  const { loadFull } = await import("tsparticles");
  await loadFull(engine);
});
```

> `initParticlesEngine` é um wrapper em torno de `tsParticles.init()` que garante que o motor esteja pronto antes do componente `<Particles>` montar. Ele retorna uma `Promise` que resolve assim que a inicialização é concluída.

## Uso Básico

Coloque o componente `<Particles />` em qualquer template `.astro`. Passe sua configuração através da prop `options`:

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

> A prop `id` é passada para o `<div>` subjacente do container do canvas. Use-a para estilização ou acesso imperativo via `document.getElementById()`.

## Suporte a TypeScript

A integração inclui declarações TypeScript completas. Use `ISourceOptions` de `@tsparticles/engine` para tipar sua configuração:

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

## Configuração Personalizada

Abaixo está uma configuração mais elaborada que você pode usar em qualquer página Astro:

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

## Usando Presets

Em vez de construir uma configuração manualmente, carregue um preset durante a inicialização do motor e referencie-o nas opções:

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

## Integração com Outros Frameworks

Como o Astro suporta frameworks de UI como React, Vue, Svelte e Solid, você pode usar o componente tsParticles específico do framework dentro de arquivos `.astro`:

### React no Astro

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

### Vue no Astro

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

> A diretiva `client:load` diz ao Astro para hidratar o componente imediatamente ao carregar a página. Use `client:visible` para carregamento adiado.

## Exemplo de Página Completa

Uma página Astro completa com partículas servindo como fundo animado:

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

<Layout title="Fundo de Partículas">
  <main>
    <h1>Bem-vindo</h1>
    <p>Esta página tem um fundo de partículas desenvolvido com tsParticles.</p>
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

## Reactive Behavior

The `<Particles>` component reacts to prop changes at runtime:

- **`id`**, **`options`**, or **`url`** change → the existing container is destroyed and particles are reloaded with the new values.
- **`theme`** change → `loadTheme` is called on the existing container. This requires the optional `@tsparticles/plugin-themes` package to be loaded (otherwise it is a safe no-op).

On component unmount, the particles container is automatically destroyed — no orphan animations remain.

## Props do Componente

| Prop                 | Tipo             | Padrão                    | Descrição                                                                 |
| -------------------- | ---------------- | ------------------------- | ------------------------------------------------------------------------- |
| `id`                 | `string`         | `"tsparticles"`           | ID do elemento DOM para o container                                       |
| `options`            | `ISourceOptions` | `{}`                      | Objeto de configuração completo do tsParticles                            |
| `url`                | `string`         | —                         | Carregar configuração de uma URL JSON remota                              |
| `particlesClassName` | `string`         | `"tsparticles-canvas-el"` | Classe CSS para o elemento canvas                                         |
| `container`          | `object`         | —                         | Instância `Container` pré-existente (avançado)                            |
| `theme`              | `string`         | —                         | Theme name (requires `@tsparticles/plugin-themes`; safe no-op otherwise). |
