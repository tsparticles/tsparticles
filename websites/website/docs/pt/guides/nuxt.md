---
title: Integração Nuxt
description: Guia passo a passo para integrar tsParticles em uma aplicação Nuxt 3 / Nuxt 4.
---

# Integração Nuxt

Este guia aborda a integração de tsParticles em um projeto **Nuxt 3** (e Nuxt 4) usando o wrapper oficial `@tsparticles/vue3`. O Nuxt executa tanto no servidor quanto no cliente, então você deve proteger os componentes de partículas contra SSR.

## Instalação

Instale o wrapper Vue 3 e o bundle do motor de sua escolha:

```bash
npm install @tsparticles/vue3 tsparticles
```

Para um bundle menor, instale `@tsparticles/slim` em vez de `tsparticles`:

```bash
npm install @tsparticles/vue3 @tsparticles/slim
```

## Uso Básico

O Nuxt renderiza componentes no servidor por padrão. Como o tsParticles precisa da API `canvas` do navegador, você deve envolver o componente `<vue-particles>` em uma tag `<client-only>`:

```vue
<template>
  <div class="page">
    <client-only>
      <vue-particles id="tsparticles" :options="options" @particles-loaded="particlesLoaded" />
    </client-only>
    <h1>Minha Aplicação Nuxt</h1>
  </div>
</template>

<script setup lang="ts">
import type { ISourceOptions, Container } from "@tsparticles/engine";

const options: ISourceOptions = {
  fullScreen: {
    zIndex: -1,
  },
  background: {
    color: "#0d47a1",
  },
  particles: {
    number: { value: 80 },
    links: { enable: true, color: "#ffffff" },
    move: { enable: true },
    size: { value: 3 },
  },
};

const particlesLoaded = (container?: Container) => {
  console.log("Container de partículas pronto", container?.id);
};
</script>

<style scoped>
.page {
  position: relative;
}
</style>
```

O wrapper `<client-only>` garante que o componente `<vue-particles>` seja montado apenas no navegador, prevenindo incompatibilidades de hidratação.

## Configuração

Use o tipo `ISourceOptions` completo para configuração type-safe. Você pode definir suas opções inline ou importá-las de um arquivo de configuração separado:

```vue
<script setup lang="ts">
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  fpsLimit: 60,
  background: {
    color: "#000000",
  },
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
      },
    },
    color: {
      value: ["#ff0000", "#00ff00", "#0000ff"],
    },
    shape: {
      type: ["circle", "square", "triangle"],
    },
    opacity: {
      value: 0.8,
    },
    size: {
      value: { min: 1, max: 8 },
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
      speed: 3,
      direction: "none",
      random: false,
      straight: false,
      outModes: "bounce",
    },
  },
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "repulse",
      },
      onClick: {
        enable: true,
        mode: "push",
      },
    },
  },
};
</script>
```

## Efeito Neve

Crie um efeito de queda de neve usando o preset snow:

```bash
npm install @tsparticles/preset-snow
```

```vue
<template>
  <client-only>
    <vue-particles id="snow" :options="options" @particles-loaded="onLoad" />
  </client-only>
</template>

<script setup lang="ts">
import { loadSnowPreset } from "@tsparticles/preset-snow";
import { tsParticles } from "@tsparticles/engine";
import type { Container } from "@tsparticles/engine";

// Carregar o preset antes do componente montar
await loadSnowPreset(tsParticles);

const options = {
  preset: "snow",
  fullScreen: { zIndex: -1 },
  background: {
    color: "#1a1a2e",
  },
};

const onLoad = (container?: Container) => {
  console.log("Efeito de neve pronto", container?.id);
};
</script>
```

Como o preset é carregado com `await` de nível superior no `<script setup>`, é garantido que estará pronto antes do componente renderizar.

## Partículas Interativas

Ative interações de clique e hover adicionando modos de interatividade:

```vue
<template>
  <client-only>
    <vue-particles id="interactive" :options="options" />
  </client-only>
</template>

<script setup lang="ts">
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  fullScreen: { zIndex: -1 },
  particles: {
    number: { value: 50 },
    links: {
      enable: true,
      distance: 150,
    },
    move: {
      enable: true,
      speed: 2,
    },
    size: {
      value: { min: 1, max: 4 },
    },
  },
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "grab", // partículas conectam ao cursor
      },
      onClick: {
        enable: true,
        mode: "push", // adiciona partículas ao clicar
      },
    },
    modes: {
      grab: {
        distance: 200,
        links: {
          opacity: 0.5,
        },
      },
      push: {
        quantity: 4,
      },
    },
  },
};
</script>
```

Modos de interação disponíveis incluem: `grab`, `bubble`, `connect`, `repulse`, `push`, `remove`, `attract` e `slow`.

## Manipulação de Eventos

O componente `<vue-particles>` emite vários eventos de ciclo de vida:

```vue
<template>
  <client-only>
    <vue-particles id="event-demo" :options="options" @particles-loaded="onLoaded" />
  </client-only>
</template>

<script setup lang="ts">
import type { Container, Engine } from "@tsparticles/engine";

const options = {
  fullScreen: { zIndex: -1 },
  particles: {
    number: { value: 60 },
    links: { enable: true },
    move: { enable: true },
  },
};

const onLoaded = (container?: Container) => {
  console.log("Container carregado", container?.id);
};
</script>
```

| Evento              | Payload                  | Descrição                                                          |
| ------------------- | ------------------------ | ------------------------------------------------------------------ |
| `@particles-loaded` | `Container \| undefined` | Dispara toda vez que o container termina de carregar ou recarregar |

## Exemplo TypeScript Completo

Um componente completo e tipado com importações explícitas e consciência de ciclo de vida:

```vue
<template>
  <div class="particles-wrapper">
    <client-only>
      <vue-particles id="full-example" :options="options" @particles-loaded="onParticlesLoaded" />
    </client-only>
    <div class="controls">
      <button @click="togglePause">{{ paused ? "Continuar" : "Pausar" }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { loadFull } from "tsparticles";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";

const containerRef = ref<Container | undefined>(undefined);
const paused = ref(false);

const options: ISourceOptions = {
  fullScreen: { zIndex: -1 },
  background: { color: "#0a0a23" },
  particles: {
    color: { value: "#00ff00" },
    number: { value: 80 },
    links: { enable: true, color: "#00ff00", distance: 150 },
    move: { enable: true, speed: 1.5 },
    size: { value: { min: 1, max: 4 } },
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: "repulse" },
    },
    modes: {
      repulse: { distance: 120 },
    },
  },
};

const onParticlesLoaded = (container?: Container) => {
  containerRef.value = container;
};

const togglePause = () => {
  if (containerRef.value) {
    if (paused.value) {
      containerRef.value.play();
    } else {
      containerRef.value.pause();
    }
    paused.value = !paused.value;
  }
};
</script>

<style scoped>
.particles-wrapper {
  position: relative;
  min-height: 100vh;
}
.controls {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 10;
}
</style>
```

## Integração em Página

Adicione um fundo de partículas a uma página Nuxt específica colocando o componente no template da página:

```vue
<template>
  <div>
    <client-only>
      <vue-particles id="page-particles" :options="options" />
    </client-only>

    <div class="content">
      <h1>Sobre</h1>
      <p>Este conteúdo fica acima do canvas de partículas.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  fullScreen: { zIndex: -1 },
  background: { color: "#1a1a2e" },
  particles: {
    number: { value: 50 },
    color: { value: "#e94560" },
    links: { enable: true, color: "#e94560" },
    move: { enable: true },
  },
};
</script>

<style scoped>
.content {
  position: relative;
  z-index: 1;
  padding: 2rem;
  color: white;
}
</style>
```

Se quiser partículas em **todas** as páginas, adicione o componente a `layouts/default.vue` em vez de páginas individuais.

## Notas sobre Nuxt 4

O Nuxt 4 mantém compatibilidade retroativa com os padrões `<client-only>` e `<script setup>` do Nuxt 3. Todos os exemplos acima funcionam sem alterações no Nuxt 4.

Considerações principais para Nuxt 4:

- **Nitropack 2**: O motor do servidor foi atualizado, mas não afeta componentes client-side como `<vue-particles>`.
- **Vue 3.5+**: Nuxt 4 vem com uma versão mais recente do Vue — `@tsparticles/vue3` é compatível com Vue 3.3+ sem problemas.
- **Verificações SSR mais rigorosas**: Se você vir avisos de hidratação, certifique-se de que `<vue-particles>` esteja sempre dentro de `<client-only>` e nunca seja renderizado no servidor.
- **Renderização híbrida**: Se usar regras de rota com `ssr: false` para certas páginas, você pode omitir `<client-only>` nessas páginas, mas é mais seguro incluí-lo sempre.

Se você atualizar do Nuxt 2 com o pacote `@tsparticles/vue` (vue 2), deve migrar para `@tsparticles/vue3` no Nuxt 3 / 4 — as APIs não são compatíveis.

## Galeria de Presets

Combine o padrão acima com qualquer um destes presets oficiais:

| Preset    | Pacote                          | Efeito                          |
| --------- | ------------------------------- | ------------------------------- |
| Confetti  | `@tsparticles/preset-confetti`  | Explosão colorida de confetes   |
| Fireworks | `@tsparticles/preset-fireworks` | Explosões de fogos de artifício |
| Snow      | `@tsparticles/preset-snow`      | Flocos de neve caindo           |
| Stars     | `@tsparticles/preset-stars`     | Céu noturno cintilante          |
| Links     | `@tsparticles/preset-links`     | Rede de nós conectados          |
| Bubbles   | `@tsparticles/preset-bubbles`   | Bolhas flutuantes               |

```vue
<template>
  <client-only>
    <vue-particles id="preset-demo" :options="{ preset: 'stars' }" />
  </client-only>
</template>

<script setup lang="ts">
import { loadStarsPreset } from "@tsparticles/preset-stars";
import { tsParticles } from "@tsparticles/engine";

await loadStarsPreset(tsParticles);
</script>
```

## Reactive Behavior

The `<Particles>` component reacts to prop changes at runtime:

- **`id`**, **`options`**, or **`url`** change → the existing container is destroyed and particles are reloaded with the new values.
- **`theme`** change → `loadTheme` is called on the existing container. This requires the optional `@tsparticles/plugin-themes` package to be loaded (otherwise it is a safe no-op).

On component unmount, the particles container is automatically destroyed — no orphan animations remain.

## Solução de Problemas

| Sintoma                             | Causa                                                | Correção                                                              |
| ----------------------------------- | ---------------------------------------------------- | --------------------------------------------------------------------- |
| Tela em branco / erro de hidratação | `<vue-particles>` renderizado no servidor            | Envolva em `<client-only>`                                            |
| Preset não tem efeito               | Preset não carregado antes da montagem do componente | Chame `loadXPreset()` com await de nível superior no `<script setup>` |
| Canvas não preenche o viewport      | `fullScreen` não ativado                             | Adicione `fullScreen: { zIndex: -1 }` às opções                       |
| Controles não pausam/retomam        | Ref do container não definida                        | Atribua o container no handler `@particles-loaded`                    |

## Próximos Passos

- Explore as [Demonstrações Interativas](/demos/) para configurações Vue prontas.
- Leia a [Referência de Opções](/options/) para uma lista completa de parâmetros de partículas.
- Visite a página de [Presets](/demos/presets) para mais efeitos pré-construídos.
