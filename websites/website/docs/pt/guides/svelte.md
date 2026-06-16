---
title: Integração Svelte
description: Guia passo a passo para integrar tsParticles em aplicações Svelte e SvelteKit usando @tsparticles/svelte.
---

# Integração Svelte

O pacote `@tsparticles/svelte` fornece um componente Svelte nativo para tsParticles. Este guia aborda Svelte (com Vite) e SvelteKit, incluindo opções reativas, manipulação de eventos e múltiplas instâncias.

---

## Instalação

```bash
npm install @tsparticles/svelte @tsparticles/engine
```

Para o bundle completo ou presets:

```bash
npm install tsparticles
npm install @tsparticles/preset-snow
npm install @tsparticles/preset-stars
npm install @tsparticles/preset-confetti
npm install @tsparticles/preset-fireworks
```

---

## Uso Básico

```svelte
<script lang="ts">
  import Particles from "@tsparticles/svelte";
  import { loadFull } from "tsparticles";
  import type { Engine, ISourceOptions } from "@tsparticles/engine";

  let engineInitialised = false;

  const particlesInit = async (engine: Engine): Promise<void> => {
    await loadFull(engine);
    engineInitialised = true;
  };

  const options: ISourceOptions = {
    background: {
      color: "#0d47a1",
    },
    fpsLimit: 120,
    particles: {
      number: {
        value: 80,
      },
      color: {
        value: "#ffffff",
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: 0.5,
      },
      size: {
        value: { min: 1, max: 5 },
      },
      links: {
        enable: true,
        distance: 150,
        color: "#ffffff",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 2,
        outModes: "out",
      },
    },
  };
</script>

<Particles
  id="tsparticles"
  options={options}
  on:init={particlesInit}
/>
```

---

## Inicialização do Motor

Passe um handler de evento `on:init` para carregar os plugins e presets que sua aplicação precisa:

```svelte
<script lang="ts">
  import Particles from "@tsparticles/svelte";
  import { loadFull } from "tsparticles";
  import type { Engine } from "@tsparticles/engine";

  const handleInit = async (event: CustomEvent<Engine>) => {
    const engine = event.detail;
    await loadFull(engine);
  };
</script>

<Particles
  id="tsparticles"
  options={options}
  on:init={handleInit}
/>
```

Alternativamente, use o utilitário `initParticlesEngine` antes da montagem:

```svelte
<script lang="ts">
  import Particles, { initParticlesEngine } from "@tsparticles/svelte";
  import { loadFull } from "tsparticles";
  import { onMount } from "svelte";

  let ready = false;

  onMount(async () => {
    await initParticlesEngine(async (engine) => {
      await loadFull(engine);
    });
    ready = true;
  });
</script>

{#if ready}
  <Particles id="tsparticles" options={options} />
{/if}
```

---

## Efeito Neve

```bash
npm install @tsparticles/preset-snow
```

```svelte
<script lang="ts">
  import Particles from "@tsparticles/svelte";
  import { loadSnowPreset } from "@tsparticles/preset-snow";
  import type { Engine, ISourceOptions } from "@tsparticles/engine";

  const handleInit = async (event: CustomEvent<Engine>) => {
    await loadSnowPreset(event.detail);
  };

  const options: ISourceOptions = {
    preset: "snow",
    background: {
      color: "#1a1a2e",
    },
  };
</script>

<Particles
  id="snow"
  {options}
  on:init={handleInit}
/>
```

Personalize o comportamento do preset mesclando opções adicionais:

```svelte
<script lang="ts">
  const options: ISourceOptions = {
    preset: "snow",
    background: { color: "#0f0f23" },
    particles: {
      move: {
        speed: 1.5,  // queda de neve mais lenta
      },
      opacity: {
        value: 0.8,  // flocos mais visíveis
      },
    },
  };
</script>
```

---

## Efeito Estrelas

```bash
npm install @tsparticles/preset-stars
```

```svelte
<script lang="ts">
  import Particles from "@tsparticles/svelte";
  import { loadStarsPreset } from "@tsparticles/preset-stars";
  import type { Engine, ISourceOptions } from "@tsparticles/engine";

  const handleInit = async (event: CustomEvent<Engine>) => {
    await loadStarsPreset(event.detail);
  };

  const options: ISourceOptions = {
    preset: "stars",
    background: {
      color: "#000000",
    },
  };
</script>

<Particles
  id="stars"
  {options}
  on:init={handleInit}
/>
```

---

## Partículas Interativas

Adicione interatividade de hover e clique do mouse:

```svelte
<script lang="ts">
  import Particles from "@tsparticles/svelte";
  import { loadFull } from "tsparticles";
  import type { Engine, ISourceOptions } from "@tsparticles/engine";

  const handleInit = async (event: CustomEvent<Engine>) => {
    await loadFull(event.detail);
  };

  const options: ISourceOptions = {
    background: {
      color: "#0d0d0d",
    },
    particles: {
      number: { value: 100 },
      color: { value: "#00d8ff" },
      shape: { type: "circle" },
      opacity: { value: 0.6 },
      size: { value: { min: 1, max: 4 } },
      links: {
        enable: true,
        distance: 120,
        color: "#00d8ff",
        opacity: 0.3,
        width: 1,
      },
      move: {
        enable: true,
        speed: 3,
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
      },
      modes: {
        grab: {
          distance: 180,
          links: { opacity: 0.5 },
        },
        push: {
          quantity: 4,
        },
      },
    },
  };
</script>

<Particles
  id="interactive"
  {options}
  on:init={handleInit}
/>
```

---

## Manipulação de Eventos

```svelte
<script lang="ts">
  import Particles from "@tsparticles/svelte";
  import { loadFull } from "tsparticles";
  import type { Container, Engine } from "@tsparticles/engine";

  let container: Container;

  const handleInit = async (event: CustomEvent<Engine>) => {
    await loadFull(event.detail);
  };

  const handleLoaded = (event: CustomEvent<Container>) => {
    container = event.detail;
    console.log("Container carregado", container);
  };

  const pause = () => container?.pause();
  const resume = () => container?.play();
  const destroy = () => container?.destroy();
</script>

<div>
  <button on:click={pause}>Pausar</button>
  <button on:click={resume}>Continuar</button>
  <button on:click={destroy}>Destruir</button>
</div>

<Particles
  id="tsparticles"
  options={options}
  on:init={handleInit}
  on:particlesLoaded={handleLoaded}
/>
```

| Evento               | Detalhe     | Dispara                                  |
| -------------------- | ----------- | ---------------------------------------- |
| `on:init`            | `Engine`    | Após o motor ser inicializado            |
| `on:particlesLoaded` | `Container` | Após o container estar totalmente pronto |

---

## Exemplo TypeScript

Componente completo tipado:

```svelte
<script lang="ts">
  import Particles from "@tsparticles/svelte";
  import { loadFull } from "tsparticles";
  import type {
    Container,
    Engine,
    ISourceOptions,
  } from "@tsparticles/engine";

  let particlesContainer: Container | undefined;

  const options: ISourceOptions = {
    background: {
      color: "#1e1e2e",
    },
    fpsLimit: 60,
    particles: {
      color: {
        value: "#cdd6f4",
      },
      links: {
        color: "#cdd6f4",
        distance: 150,
        enable: true,
        opacity: 0.3,
        width: 1,
      },
      move: {
        enable: true,
        speed: 1.5,
      },
      number: {
        value: 60,
      },
      opacity: {
        value: 0.6,
      },
      size: {
        value: { min: 1, max: 3 },
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "repulse",
        },
      },
      modes: {
        repulse: {
          distance: 100,
        },
      },
    },
    detectRetina: true,
  };

  const handleInit = async (event: CustomEvent<Engine>) => {
    await loadFull(event.detail);
  };

  const handleLoaded = (event: CustomEvent<Container>) => {
    particlesContainer = event.detail;
  };
</script>

<Particles
  id="tsparticles"
  {options}
  on:init={handleInit}
  on:particlesLoaded={handleLoaded}
/>
```

---

## Opções Dinâmicas

Opções reativas atualizam as partículas sem recriar a instância:

```svelte
<script lang="ts">
  import Particles from "@tsparticles/svelte";
  import { loadFull } from "tsparticles";
  import type { Engine, ISourceOptions } from "@tsparticles/engine";

  let color = "#ff0000";

  const handleInit = async (event: CustomEvent<Engine>) => {
    await loadFull(event.detail);
  };

  $: options = {
    background: {
      color: "#000000",
    },
    particles: {
      color: {
        value: color,
      },
      links: {
        color: color,
        enable: true,
        distance: 150,
      },
      number: {
        value: 60,
      },
      move: {
        enable: true,
        speed: 2,
      },
      size: {
        value: { min: 1, max: 3 },
      },
    },
  } satisfies ISourceOptions;
</script>

<div>
  <label>
    Cor das Partículas:
    <input type="color" bind:value={color} />
  </label>
</div>

<Particles
  id="dynamic"
  {options}
  on:init={handleInit}
/>
```

A declaração reativa `$:` recalcula `options` sempre que `color` muda, e o componente `Particles` captura a nova configuração automaticamente.

---

## Múltiplas Instâncias

Renderize vários sistemas de partículas independentes na mesma página:

```svelte
<script lang="ts">
  import Particles from "@tsparticles/svelte";
  import { loadFull } from "tsparticles";
  import type { Engine, ISourceOptions } from "@tsparticles/engine";

  const handleInit = async (event: CustomEvent<Engine>) => {
    await loadFull(event.detail);
  };

  const fireOptions: ISourceOptions = {
    background: { color: "#1a0000" },
    particles: {
      color: { value: "#ff4500" },
      number: { value: 40 },
      move: { enable: true, speed: 1 },
      size: { value: { min: 2, max: 6 } },
      opacity: { value: 0.8 },
    },
  };

  const waterOptions: ISourceOptions = {
    background: { color: "#000d1a" },
    particles: {
      color: { value: "#00bfff" },
      number: { value: 60 },
      move: { enable: true, speed: 0.5, direction: "top" },
      size: { value: { min: 1, max: 3 } },
      opacity: { value: 0.5 },
    },
  };
</script>

<div style="display: grid; grid-template-columns: 1fr 1fr; height: 100vh;">
  <div style="position: relative;">
    <Particles id="fire" options={fireOptions} on:init={handleInit} />
  </div>
  <div style="position: relative;">
    <Particles id="water" options={waterOptions} on:init={handleInit} />
  </div>
</div>
```

Cada componente `<Particles>` recebe seu próprio `id`, canvas e contexto do motor.

---

## Uso com SvelteKit

No SvelteKit, o canvas requer o ambiente do navegador. Desabilite SSR para o componente:

```svelte
<script lang="ts">
  import { browser } from "$app/environment";
  import { onMount } from "svelte";

  let Component: typeof import("@tsparticles/svelte").default;

  onMount(async () => {
    if (browser) {
      const module = await import("@tsparticles/svelte");
      Component = module.default;
    }
  });
</script>

{#if Component}
  <svelte:component this={Component} id="tsparticles" options={options} />
{/if}
```

Ou envolva a importação em um componente client-side. Para SvelteKit 2+, você também pode usar as exclusões SSR do `vite-plugin-svelte`.

---

## Referência da API

| Prop      | Tipo             | Padrão          | Descrição                             |
| --------- | ---------------- | --------------- | ------------------------------------- |
| `id`      | `string`         | `"tsparticles"` | ID do elemento canvas                 |
| `options` | `ISourceOptions` | `{}`            | Objeto de configuração das partículas |
| `url`     | `string`         | —               | URL para uma configuração JSON remota |
| `theme`   | `string`         | —               | Theme name (requires `@tsparticles/plugin-themes`; safe no-op otherwise). |

| Evento               | Detalhe     | Descrição                                                         |
| -------------------- | ----------- | ----------------------------------------------------------------- |
| `on:init`            | `Engine`    | Dispara quando o motor é inicializado (use para carregar plugins) |
| `on:particlesLoaded` | `Container` | Dispara quando o container está totalmente pronto                 |

---


## Reactive Behavior

The `<Particles>` component reacts to prop changes at runtime:

- **`id`**, **`options`**, or **`url`** change → the existing container is destroyed and particles are reloaded with the new values.
- **`theme`** change → `loadTheme` is called on the existing container. This requires the optional `@tsparticles/plugin-themes` package to be loaded (otherwise it is a safe no-op).

On component unmount, the particles container is automatically destroyed — no orphan animations remain.

## Solução de Problemas

- **Canvas não visível** — Certifique-se de que o container pai tenha dimensões explícitas (`height: 100%`, `height: 100vh` ou um valor fixo em pixels).
- **`loadFull is not a function`** — Verifique se `tsparticles` está instalado e se você está importando `loadFull` de `tsparticles` (não de `@tsparticles/engine`).
- **Reatividade não funcionando** — Certifique-se de que `options` é uma variável reativa (`$:` ou `let` vinculada a uma fonte reativa). Valores `const` comuns não serão atualizados.
- **SvelteKit tela em branco** — Importe `@tsparticles/svelte` dinamicamente ou use o guard `browser` como mostrado na seção SvelteKit acima.
- **Erros TypeScript para `event.detail`** — Use os tipos `CustomEvent<Engine>` e `CustomEvent<Container>` para os handlers de evento.
