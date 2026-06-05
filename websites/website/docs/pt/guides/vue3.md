---
title: Integração Vue 3
description: Guia passo a passo para integrar tsParticles em aplicações Vue 3 usando @tsparticles/vue3.
---

# Integração Vue 3

O pacote `@tsparticles/vue3` fornece um componente Vue 3 nativo e sistema de plugins para tsParticles. Este guia aborda tudo, desde a configuração básica até padrões avançados como alternância dinâmica de temas e presets personalizados.

---

## Instalação

```bash
npm install @tsparticles/vue3 @tsparticles/engine
```

Opcionalmente instale um preset ou o bundle completo:

```bash
# Bundle completo (todas as funcionalidades)
npm install tsparticles

# Presets específicos
npm install @tsparticles/preset-confetti
npm install @tsparticles/preset-fireworks
npm install @tsparticles/preset-snow
npm install @tsparticles/preset-stars

# Configurações utilitárias
npm install @tsparticles/configs
```

---

## Uso Básico

Registre o plugin no ponto de entrada da sua aplicação, depois use o componente `<vue-particles>` em qualquer lugar.

### Entrada da aplicação (`main.ts`)

```typescript
import { createApp } from "vue";
import App from "./App.vue";
import type { Engine } from "@tsparticles/engine";
import { ParticlesPlugin } from "@tsparticles/vue3";
import { loadFull } from "tsparticles";

const app = createApp(App);

app.use(ParticlesPlugin, {
  init: async (engine: Engine) => {
    await loadFull(engine);
  },
});

app.mount("#app");
```

### Componente (`App.vue`)

```vue
<script setup lang="ts">
import type { ISourceOptions } from "@tsparticles/engine";

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
      direction: "none",
      random: false,
      straight: false,
      outModes: "out",
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
};
</script>

<template>
  <vue-particles id="tsparticles" :options="options" />
</template>
```

---

## Usando `particlesInit` com o Componente

Se preferir não usar o plugin global, passe um callback `init` diretamente:

```vue
<script setup lang="ts">
import type { Engine } from "@tsparticles/engine";
import { loadFull } from "tsparticles";

const particlesInit = async (engine: Engine): Promise<void> => {
  await loadFull(engine);
};
</script>

<template>
  <vue-particles id="tsparticles" :options="options" :init="particlesInit" />
</template>
```

---

## Eventos

O componente emite vários eventos de ciclo de vida:

```vue
<script setup lang="ts">
import type { Container } from "@tsparticles/engine";

const particlesLoaded = async (container: Container): Promise<void> => {
  console.log("Container de partículas carregado", container);
};

const particlesInit = async (engine: Engine): Promise<void> => {
  console.log("Motor inicializado");
  await loadFull(engine);
};
</script>

<template>
  <vue-particles id="tsparticles" :options="options" :init="particlesInit" @particles-loaded="particlesLoaded" />
</template>
```

---

## Efeito Confete

Use o preset confetti para celebrações:

```bash
npm install @tsparticles/preset-confetti
```

```vue
<script setup lang="ts">
import type { Engine, ISourceOptions } from "@tsparticles/engine";
import { loadConfettiPreset } from "@tsparticles/preset-confetti";

const particlesInit = async (engine: Engine): Promise<void> => {
  await loadConfettiPreset(engine);
};

const options: ISourceOptions = {
  preset: "confetti",
  background: {
    color: "transparent",
  },
};
</script>

<template>
  <vue-particles id="confetti" :options="options" :init="particlesInit" />
</template>
```

Para uma explosão única, carregue o preset e depois chame `tsParticles.load()` programaticamente dentro de um método.

---

## Efeito Fogos de Artifício

O preset fireworks cria explosões de partículas de alto impacto:

```bash
npm install @tsparticles/preset-fireworks
```

```vue
<script setup lang="ts">
import type { Engine, ISourceOptions } from "@tsparticles/engine";
import { loadFireworksPreset } from "@tsparticles/preset-fireworks";

const particlesInit = async (engine: Engine): Promise<void> => {
  await loadFireworksPreset(engine);
};

const options: ISourceOptions = {
  preset: "fireworks",
  background: {
    color: "#000000",
  },
};
</script>

<template>
  <vue-particles id="fireworks" :options="options" :init="particlesInit" />
</template>
```

> **Dica:** O preset fireworks consome muitos recursos. Acione-o na interação do usuário (ex.: clique de botão) alternando um `v-if` vinculado ao componente.

---

## Efeito Neve

Simule queda de neve com o preset snow:

```bash
npm install @tsparticles/preset-snow
```

```vue
<script setup lang="ts">
import type { Engine, ISourceOptions } from "@tsparticles/engine";
import { loadSnowPreset } from "@tsparticles/preset-snow";

const particlesInit = async (engine: Engine): Promise<void> => {
  await loadSnowPreset(engine);
};

const options: ISourceOptions = {
  preset: "snow",
  background: {
    color: "#1a1a2e",
  },
};
</script>

<template>
  <vue-particles id="snow" :options="options" :init="particlesInit" />
</template>
```

---

## Partículas Interativas

Adicione modos de interatividade de hover e clique:

```vue
<script setup lang="ts">
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  background: {
    color: "#0d0d0d",
  },
  particles: {
    number: {
      value: 100,
    },
    color: {
      value: "#00ff00",
    },
    shape: {
      type: "circle",
    },
    opacity: {
      value: 0.6,
    },
    size: {
      value: { min: 1, max: 4 },
    },
    links: {
      enable: true,
      distance: 120,
      color: "#00ff00",
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

<template>
  <vue-particles id="interactive" :options="options" />
</template>
```

Modos de interação disponíveis: `grab`, `repulse`, `bubble`, `connect`, `push`, `remove`, `trail`, `attract`, `light`.

---

## Alternância de Tema

Troque dinamicamente os temas das partículas em tempo de execução atualizando o objeto de opções reativo:

```vue
<script setup lang="ts">
import { ref } from "vue";
import type { ISourceOptions } from "@tsparticles/engine";

const isDark = ref(true);

const options = ref<ISourceOptions>({
  background: {
    color: "#000000",
  },
  particles: {
    color: {
      value: "#ffffff",
    },
    links: {
      color: "#ffffff",
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
});

const toggleTheme = () => {
  isDark.value = !isDark.value;
  options.value = {
    ...options.value,
    background: {
      color: isDark.value ? "#000000" : "#f0f0f0",
    },
    particles: {
      ...options.value.particles,
      color: {
        value: isDark.value ? "#ffffff" : "#333333",
      },
      links: {
        ...(options.value.particles?.links as object),
        color: isDark.value ? "#ffffff" : "#333333",
      },
    },
  };
};
</script>

<template>
  <div>
    <button @click="toggleTheme">Alternar para {{ isDark ? "claro" : "escuro" }}</button>
    <vue-particles id="theme-particles" :options="options" />
  </div>
</template>
```

Alternativamente, use a opção de [temas](https://particles.js.org/docs/interfaces/Options_Interfaces_IOptions.IOptions.html#themes) incorporada e a propriedade `theme` no container para alternância sem configuração.

---

## Preset Personalizado do @tsparticles/configs

O pacote `@tsparticles/configs` exporta objetos de configuração pré-fabricados:

```bash
npm install @tsparticles/configs
```

```vue
<script setup lang="ts">
import type { Engine, ISourceOptions } from "@tsparticles/engine";
import { loadLinksPreset } from "@tsparticles/preset-links";
import particlesConfig from "@tsparticles/configs/particles.json";

const particlesInit = async (engine: Engine): Promise<void> => {
  await loadLinksPreset(engine);
};

const options: ISourceOptions = {
  ...particlesConfig,
  background: {
    color: "#1e1e2e",
  },
};
</script>

<template>
  <vue-particles id="config-particles" :options="options" :init="particlesInit" />
</template>
```

Navegue pelas configurações disponíveis no pacote `@tsparticles/configs` para layouts prontos para uso.

---

## Abordagens de Inicialização do Motor

Existem duas maneiras de inicializar o motor:

### 1. Plugin Global (recomendado)

```typescript
// main.ts
import { createApp } from "vue";
import App from "./App.vue";
import type { Engine } from "@tsparticles/engine";
import { ParticlesPlugin } from "@tsparticles/vue3";
import { loadFull } from "tsparticles";

createApp(App)
  .use(ParticlesPlugin, {
    init: async (engine: Engine) => {
      await loadFull(engine);
    },
  })
  .mount("#app");
```

O motor fica então disponível globalmente e todas as instâncias de `<vue-particles>` o compartilham.

### 2. Init no Nível do Componente

Passe um callback `:init` para cada instância de `<vue-particles>`. Útil quando diferentes componentes precisam de diferentes conjuntos de plugins:

```vue
<template>
  <vue-particles id="a" :options="optionsA" :init="initA" />
  <vue-particles id="b" :options="optionsB" :init="initB" />
</template>
```

### 3. Particles Provider (Composition API)

Use o provider para acessar o motor programaticamente:

```vue
<script setup lang="ts">
import { useParticles } from "@tsparticles/vue3";
import { loadFull } from "tsparticles";

const { init } = useParticles();

await init(async (engine: Engine) => {
  await loadFull(engine);
});
</script>
```

---

## Named Exports + TypeScript

Exemplo TypeScript completo com todas as peças juntas:

```vue
<script setup lang="ts">
import { ref } from "vue";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";
import { loadFull } from "tsparticles";

const particlesContainer = ref<Container | null>(null);

const options: ISourceOptions = {
  background: {
    color: "#0d47a1",
  },
  fpsLimit: 60,
  particles: {
    number: {
      value: 50,
    },
    color: {
      value: "#ffd700",
    },
    shape: {
      type: ["circle", "triangle", "polygon"],
    },
    opacity: {
      value: 0.7,
      random: true,
    },
    size: {
      value: { min: 2, max: 8 },
      random: true,
    },
    links: {
      enable: true,
      distance: 200,
      color: "#ffd700",
      opacity: 0.3,
      width: 1,
    },
    move: {
      enable: true,
      speed: 2,
      direction: "none",
      random: true,
      straight: false,
      outModes: "bounce",
      attract: {
        enable: false,
      },
    },
  },
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "bubble",
      },
      onClick: {
        enable: true,
        mode: "repulse",
      },
    },
    modes: {
      bubble: {
        distance: 200,
        size: 12,
        duration: 0.3,
      },
      repulse: {
        distance: 200,
      },
    },
  },
  detectRetina: true,
};

const particlesInit = async (engine: Engine): Promise<void> => {
  await loadFull(engine);
};

const particlesLoaded = async (container: Container): Promise<void> => {
  particlesContainer.value = container;
  console.log("Container pronto", container);
};
</script>

<template>
  <vue-particles id="tsparticles" :options="options" :init="particlesInit" @particles-loaded="particlesLoaded" />
</template>
```

---

## Referência da API

| Prop      | Tipo                                | Padrão          | Descrição                           |
| --------- | ----------------------------------- | --------------- | ----------------------------------- |
| `id`      | `string`                            | `"tsparticles"` | ID do elemento canvas               |
| `options` | `ISourceOptions`                    | `{}`            | Configuração das partículas         |
| `init`    | `(engine: Engine) => Promise<void>` | —               | Callback de inicialização do motor  |
| `url`     | `string`                            | —               | URL para carregar configuração JSON |

| Evento              | Payload     | Descrição                                            |
| ------------------- | ----------- | ---------------------------------------------------- |
| `@particles-loaded` | `Container` | Dispara quando o container é totalmente inicializado |
| `@particles-init`   | `Engine`    | Dispara após o motor ser inicializado                |

---

## Solução de Problemas

- **Erro: `tsparticles is not defined`** — Certifique-se de que `tsparticles` (ou os presets necessários) sejam carregados dentro do callback `init` antes do componente renderizar.
- **Canvas não aparecendo** — Verifique se o container pai tem uma altura não zero. Adicione uma regra CSS como `#tsparticles { height: 100vh; }`.
- **Problemas de performance** — Reduza `fpsLimit`, diminua `particles.number.value` ou desative `detectRetina` em dispositivos de baixo desempenho.
- **SSR (Nuxt)** — O componente `<vue-particles>` é client-side. Envolva-o em `<ClientOnly>` ou use a diretiva `client:only`.
