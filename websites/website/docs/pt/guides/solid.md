---
title: Integração SolidJS
description: Guia passo a passo para integrar tsParticles em uma aplicação SolidJS usando o wrapper oficial @tsparticles/solid.
---

# Integração SolidJS

Este guia aborda a integração de tsParticles em um projeto **SolidJS** usando o wrapper oficial `@tsparticles/solid`. O modelo de reatividade de grão fino do SolidJS funciona bem com tsParticles — mudanças nas opções acionam atualizações direcionadas no canvas sem reinicialização completa.

## Instalação

Instale o wrapper SolidJS e o bundle do motor de sua escolha:

```bash
npm install @tsparticles/solid tsparticles
```

Para um bundle menor, use `@tsparticles/slim`:

```bash
npm install @tsparticles/solid @tsparticles/slim
```

## Uso Básico

SolidJS é executado inteiramente no navegador (sem SSR), então você não precisa se proteger contra renderização no servidor. No entanto, o motor deve ser inicializado assincronamente antes de renderizar partículas.

Use `initParticlesEngine` dentro de `onMount` para carregar as funcionalidades do motor, então renderize condicionalmente o componente `<Particles>` com `<Show>`:

```tsx
import { loadFull } from "tsparticles";
import { createSignal, Show, onMount } from "solid-js";
import type { Component } from "solid-js";
import Particles, { initParticlesEngine } from "@tsparticles/solid";
import type { Engine, ISourceOptions } from "@tsparticles/engine";

const App: Component = () => {
  const [initialized, setInitialized] = createSignal(false);

  onMount(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadFull(engine);
    }).then(() => setInitialized(true));
  });

  const options: ISourceOptions = {
    fullScreen: { zIndex: -1 },
    background: { color: "#0d47a1" },
    particles: {
      number: { value: 80 },
      links: { enable: true, color: "#ffffff" },
      move: { enable: true },
      size: { value: 3 },
    },
  };

  return (
    <Show when={initialized()}>
      <Particles id="tsparticles" options={options} />
    </Show>
  );
};

export default App;
```

O componente `<Show>` garante que o elemento `<Particles>` seja inserido no DOM apenas após o motor estar pronto.

## Inicialização do Motor

A função `initParticlesEngine` aceita um callback que recebe a instância `Engine`. Use este callback para registrar as funcionalidades que sua configuração necessita:

```tsx
import { initParticlesEngine } from "@tsparticles/solid";
import { loadFull } from "tsparticles";
import { loadSlim } from "@tsparticles/slim";
import { loadConfettiPreset } from "@tsparticles/preset-confetti";
import type { Engine } from "@tsparticles/engine";

// Mínimo — apenas formas básicas e movimento
initParticlesEngine((engine: Engine) => loadSlim(engine)).then(() => {
  console.log("Motor pronto (slim)");
});

// Completo — todas as funcionalidades incluídas
initParticlesEngine((engine: Engine) => loadFull(engine)).then(() => {
  console.log("Motor pronto (completo)");
});

// Apenas preset — apenas as funcionalidades necessárias para um preset específico
initParticlesEngine((engine: Engine) => loadConfettiPreset(engine)).then(() => {
  console.log("Preset confetti carregado");
});
```

Chame `initParticlesEngine` uma vez na sua aplicação — tipicamente no `onMount` do componente raiz. A instância do motor é armazenada em cache, então chamadas subsequentes retornam imediatamente.

## Renderização Condicional

Use o fluxo de controle `<Show>` do SolidJS para adiar a renderização até que o motor esteja inicializado:

```tsx
import { createSignal, Show, onMount } from "solid-js";
import Particles, { initParticlesEngine } from "@tsparticles/solid";
import { loadFull } from "tsparticles";
import type { Engine } from "@tsparticles/engine";
import type { Component } from "solid-js";

const App: Component = () => {
  const [ready, setReady] = createSignal(false);

  onMount(() => {
    initParticlesEngine((engine: Engine) => loadFull(engine)).then(() => setReady(true));
  });

  return (
    <Show when={ready()} fallback={<p>Carregando partículas...</p>}>
      <Particles
        id="tsparticles"
        options={{
          fullScreen: { zIndex: -1 },
          particles: { number: { value: 50 }, move: { enable: true } },
        }}
      />
    </Show>
  );
};
```

A prop `fallback` mostra um indicador de carregamento enquanto o motor inicializa.

## Uso de Presets

Use `@tsparticles/configs` para configurações rápidas e pré-definidas:

```bash
npm install @tsparticles/configs
```

```tsx
import configs from "@tsparticles/configs";
import { loadFull } from "tsparticles";
import { createSignal, Show, onMount } from "solid-js";
import type { Component } from "solid-js";
import Particles, { initParticlesEngine } from "@tsparticles/solid";
import type { Engine } from "@tsparticles/engine";

const App: Component = () => {
  const [ready, setReady] = createSignal(false);

  onMount(() => {
    initParticlesEngine((engine: Engine) => loadFull(engine)).then(() => setReady(true));
  });

  return (
    <Show when={ready()}>
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <Particles id="basic" options={configs.basic} />
        <Particles id="bubbles" options={configs.bubbles} />
      </div>
    </Show>
  );
};

export default App;
```

Configurações disponíveis incluem: `basic`, `bubbles`, `snow`, `stars`, `fireworks`, `confetti`, `links` e mais.

## Partículas Interativas

Adicione interações de clique e hover configurando a seção `interactivity`:

```tsx
import { loadFull } from "tsparticles";
import { createSignal, Show, onMount } from "solid-js";
import type { Component } from "solid-js";
import Particles, { initParticlesEngine } from "@tsparticles/solid";
import type { Engine, ISourceOptions } from "@tsparticles/engine";

const App: Component = () => {
  const [ready, setReady] = createSignal(false);

  onMount(() => {
    initParticlesEngine((engine: Engine) => loadFull(engine)).then(() => setReady(true));
  });

  const options: ISourceOptions = {
    fullScreen: { zIndex: -1 },
    particles: {
      number: { value: 60 },
      links: { enable: true, distance: 150 },
      move: { enable: true, speed: 2 },
      size: { value: { min: 1, max: 4 } },
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

  return (
    <Show when={ready()}>
      <Particles id="interactive" options={options} />
    </Show>
  );
};

export default App;
```

- **Modos de hover**: `grab`, `bubble`, `repulse`, `attract`, `slow`, `connect`
- **Modos de clique**: `push`, `remove`, `repulse`, `bubble`, `attract`, `pause`

## Configuração Personalizada

Uma configuração personalizada completa com múltiplas formas de partículas, paletas de cores e configurações de movimento:

```tsx
import { loadFull } from "tsparticles";
import { createSignal, Show, onMount } from "solid-js";
import type { Component } from "solid-js";
import Particles, { initParticlesEngine } from "@tsparticles/solid";
import type { Engine, ISourceOptions } from "@tsparticles/engine";

const App: Component = () => {
  const [ready, setReady] = createSignal(false);

  onMount(() => {
    initParticlesEngine((engine: Engine) => loadFull(engine)).then(() => setReady(true));
  });

  const options: ISourceOptions = {
    fullScreen: { zIndex: -1 },
    background: { color: "#0a0a23" },
    fpsLimit: 60,
    particles: {
      color: {
        value: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"],
      },
      move: {
        enable: true,
        speed: 1.5,
        direction: "none",
        random: true,
        straight: false,
        outModes: "bounce",
        attract: { enable: true, rotateX: 600, rotateY: 1200 },
      },
      number: {
        value: 40,
        density: { enable: true },
      },
      opacity: {
        value: { min: 0.3, max: 0.8 },
        animation: {
          enable: true,
          speed: 0.5,
          sync: false,
        },
      },
      size: {
        value: { min: 2, max: 8 },
        animation: {
          enable: true,
          speed: 2,
          sync: false,
        },
      },
      links: {
        enable: true,
        distance: 200,
        color: "#ffffff",
        opacity: 0.3,
        width: 1,
      },
      shape: {
        type: ["circle", "square", "triangle", "polygon"],
        options: {
          polygon: { sides: 6 },
        },
      },
      twinkle: {
        particles: {
          enable: true,
          frequency: 0.05,
          opacity: 1,
        },
      },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: "repulse" },
        onClick: { enable: true, mode: "bubble" },
      },
      modes: {
        repulse: { distance: 120 },
        bubble: { distance: 200, size: 10, opacity: 0.8 },
      },
    },
    detectRetina: true,
  };

  return (
    <Show when={ready()}>
      <Particles id="custom" options={options} />
    </Show>
  );
};

export default App;
```

## Exemplo TypeScript Completo

Um componente tipado completo com referência ao container, inicialização do motor e controles manuais:

```tsx
import { loadFull } from "tsparticles";
import { createSignal, Show, onMount } from "solid-js";
import type { Component } from "solid-js";
import Particles, { initParticlesEngine } from "@tsparticles/solid";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";

const App: Component = () => {
  const [ready, setReady] = createSignal(false);
  const [container, setContainer] = createSignal<Container | undefined>(undefined);
  const [paused, setPaused] = createSignal(false);

  onMount(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadFull(engine);
    }).then(() => setReady(true));
  });

  const options: ISourceOptions = {
    fullScreen: { zIndex: -1 },
    background: { color: "#1a1a2e" },
    particles: {
      color: { value: "#e94560" },
      number: { value: 80 },
      links: { enable: true, color: "#e94560", distance: 150 },
      move: { enable: true, speed: 2 },
      size: { value: { min: 1, max: 5 } },
    },
  };

  const particlesLoaded = (c: Container) => {
    setContainer(c);
  };

  const togglePause = () => {
    const c = container();
    if (c) {
      if (paused()) {
        c.play();
      } else {
        c.pause();
      }
      setPaused(!paused());
    }
  };

  return (
    <Show when={ready()}>
      <Particles id="full-example" options={options} particlesLoaded={particlesLoaded} />
      <button
        onClick={togglePause}
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 10,
          padding: "8px 16px",
        }}
      >
        {paused() ? "Continuar" : "Pausar"}
      </button>
    </Show>
  );
};

export default App;
```

## Opções Dinâmicas com Signals

Um dos pontos fortes do SolidJS é a reatividade de grão fino — você pode usar signals para controlar as opções das partículas e o canvas atualizará eficientemente:

```tsx
import { loadFull } from "tsparticles";
import { createSignal, Show, onMount } from "solid-js";
import type { Component } from "solid-js";
import Particles, { initParticlesEngine } from "@tsparticles/solid";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";

const App: Component = () => {
  const [ready, setReady] = createSignal(false);
  const [color, setColor] = createSignal("#ff0000");
  const [particleCount, setParticleCount] = createSignal(60);

  onMount(() => {
    initParticlesEngine((engine: Engine) => loadFull(engine)).then(() => setReady(true));
  });

  // options é um objeto normal — será lido reativamente através
  // do rastreamento interno do componente Particle
  const options = (): ISourceOptions => ({
    fullScreen: { zIndex: -1 },
    background: { color: "#000" },
    particles: {
      color: { value: color() },
      number: { value: particleCount() },
      links: { enable: true, color: color() },
      move: { enable: true },
    },
  });

  return (
    <Show when={ready()}>
      <Particles id="dynamic" options={options()} particlesLoaded={() => {}} />
      <div style={{ position: "fixed", top: 16, right: 16, zIndex: 10 }}>
        <label>
          Cor:
          <input type="color" value={color()} onInput={(e) => setColor(e.currentTarget.value)} />
        </label>
        <label>
          Quantidade:
          <input
            type="range"
            min={10}
            max={200}
            value={particleCount()}
            onInput={(e) => setParticleCount(Number(e.currentTarget.value))}
          />
          {particleCount()}
        </label>
      </div>
    </Show>
  );
};

export default App;
```

Como `options` é uma função que acessa signals, toda vez que `color()` ou `particleCount()` muda, o componente `<Particles>` recebe um novo objeto de opções e aplica apenas as propriedades alteradas ao canvas existente.

## Preset com Sobrescritas Personalizadas

Carregue um preset e depois mescle sobrescritas personalizadas para um efeito sob medida:

```tsx
import { loadSnowPreset } from "@tsparticles/preset-snow";
import { createSignal, Show, onMount } from "solid-js";
import type { Component } from "solid-js";
import Particles, { initParticlesEngine } from "@tsparticles/solid";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";

const App: Component = () => {
  const [ready, setReady] = createSignal(false);

  onMount(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSnowPreset(engine);
    }).then(() => setReady(true));
  });

  const options: ISourceOptions = {
    preset: "snow",
    fullScreen: { zIndex: -1 },
    background: { color: "#0d0d2b" },
    particles: {
      // Sobrescrever a cor da neve para azul
      color: { value: "#88ccff" },
      // Aumentar o número de flocos
      number: { value: 300 },
    },
  };

  return (
    <Show when={ready()}>
      <Particles id="custom-snow" options={options} />
    </Show>
  );
};

export default App;
```

O preset fornece valores padrão para cada opção, e suas sobrescritas são mescladas por cima — você só precisa especificar as propriedades que deseja alterar.

## Solução de Problemas

| Sintoma                         | Causa                                           | Correção                                                                      |
| ------------------------------- | ----------------------------------------------- | ----------------------------------------------------------------------------- |
| Elemento DOM em branco          | Motor não inicializado antes da renderização    | Envolva `<Particles>` em `<Show when={initialized()}>`                        |
| Nenhuma partícula visível       | Faltando `move.enable` ou `number.value`        | Certifique-se de `particles.move.enable: true` e `particles.number.value > 0` |
| Canvas atrás do conteúdo        | Faltando `zIndex` no fullScreen                 | Use `fullScreen: { zIndex: -1 }`                                              |
| Mudança de opções não refletida | Referência do objeto não mudando                | Envolva opções em uma função ou store; evite objetos estáticos                |
| Motor não encontrado            | Faltando importação de `loadFull` ou `loadSlim` | Instale `tsparticles` ou `@tsparticles/slim` e chame `loadFull(engine)`       |

## Próximos Passos

- Explore o [Playground de Configurações](/playground/configs) para configurações prontas para uso.
- Leia a [Referência de Opções](/options/) para a lista completa de parâmetros.
- Navegue pelo [código fonte do SolidJS](https://github.com/tsparticles/solid) no GitHub para detalhes do wrapper.
