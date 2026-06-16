---
title: Qwik
description: Integre tsParticles com Qwik usando o wrapper oficial @tsparticles/qwik.
---

# Integração Qwik

O pacote `@tsparticles/qwik` fornece um componente `<Particles>` otimizado para o modelo de resumibilidade do Qwik. Ele usa `useVisibleTask$` para inicialização lazy e sinais para atualizações reativas.

## Instalação

```bash
npm install @tsparticles/qwik tsparticles
```

Declarações TypeScript estão incluídas — nenhum pacote de tipos adicional é necessário.

## Inicialização do Motor

No Qwik, o motor deve ser inicializado dentro de um bloco `useVisibleTask$` para garantir que execute apenas no cliente (nunca durante SSR). Use um sinal para monitorar a prontidão:

```tsx
import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { Particles, initParticlesEngine } from "@tsparticles/qwik";
import type { Engine } from "@tsparticles/engine";
import { loadFull } from "tsparticles";

export default component$(() => {
  const engineReady = useSignal(false);

  useVisibleTask$(async () => {
    await initParticlesEngine(async (engine: Engine) => {
      await loadFull(engine);
    });
    engineReady.value = true;
  });

  return <>{engineReady.value && <Particles id="tsparticles" options={{}} />}</>;
});
```

## Uso Básico

Uma vez que o motor está pronto, renderize o componente `<Particles>` com sua configuração:

```tsx
import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { Particles, initParticlesEngine } from "@tsparticles/qwik";
import type { Engine } from "@tsparticles/engine";
import { loadFull } from "tsparticles";

export default component$(() => {
  const engineReady = useSignal(false);

  useVisibleTask$(async () => {
    await initParticlesEngine(async (engine: Engine) => {
      await loadFull(engine);
    });
    engineReady.value = true;
  });

  const options = {
    background: {
      color: "#0d1117",
    },
    particles: {
      color: { value: "#58a6ff" },
      links: {
        enable: true,
        color: "#58a6ff",
        distance: 150,
      },
      move: {
        enable: true,
        speed: 2,
      },
      number: {
        value: 80,
      },
    },
  };

  return <>{engineReady.value && <Particles id="tsparticles" options={options} />}</>;
});
```

## Renderização Condicional

O padrão do sinal `engineReady` garante que o componente `<Particles>` seja montado apenas após o motor estar totalmente inicializado. Isso previne incompatibilidades de hidratação entre servidor e cliente:

```tsx
import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { Particles, initParticlesEngine } from "@tsparticles/qwik";
import type { Engine } from "@tsparticles/engine";
import { loadFull } from "tsparticles";

export default component$(() => {
  const engineReady = useSignal(false);
  const loading = useSignal(true);

  useVisibleTask$(async () => {
    await initParticlesEngine(async (engine: Engine) => {
      await loadFull(engine);
    });
    engineReady.value = true;
    loading.value = false;
  });

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      {loading.value && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            color: "#888",
          }}
        >
          Carregando partículas...
        </div>
      )}
      {engineReady.value && (
        <Particles
          id="tsparticles"
          options={{
            background: { color: "#0d1117" },
            fullScreen: { enable: true, zIndex: -1 },
            particles: {
              color: { value: "#58a6ff" },
              links: { enable: true, color: "#58a6ff", distance: 150 },
              move: { enable: true, speed: 2 },
              number: { value: 80 },
            },
          }}
        />
      )}
    </div>
  );
});
```

## Partículas Interativas

Ative interações de hover e clique adicionando a seção `interactivity` às suas opções:

```tsx
import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { Particles, initParticlesEngine } from "@tsparticles/qwik";
import type { Engine } from "@tsparticles/engine";
import { loadFull } from "tsparticles";

export default component$(() => {
  const engineReady = useSignal(false);

  useVisibleTask$(async () => {
    await initParticlesEngine(async (engine: Engine) => {
      await loadFull(engine);
    });
    engineReady.value = true;
  });

  const options = {
    background: { color: "#0d1117" },
    fullScreen: { enable: true },
    particles: {
      color: { value: "#58a6ff" },
      links: { enable: true, color: "#58a6ff", distance: 150 },
      move: { enable: true, speed: 1.5 },
      number: { value: 100 },
      size: { value: { min: 1, max: 4 } },
      opacity: { value: 0.6 },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: "grab" },
        onClick: { enable: true, mode: "push" },
        resize: { enable: true },
      },
      modes: {
        grab: { distance: 180, links: { opacity: 0.5 } },
        push: { quantity: 4 },
      },
    },
  };

  return <>{engineReady.value && <Particles id="tsparticles" options={options} />}</>;
});
```

## Configuração Personalizada

Uma configuração completa com animações, múltiplas cores e rica interatividade:

```tsx
import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { Particles, initParticlesEngine } from "@tsparticles/qwik";
import type { Engine, ISourceOptions } from "@tsparticles/engine";
import { loadFull } from "tsparticles";

export default component$(() => {
  const engineReady = useSignal(false);

  useVisibleTask$(async () => {
    await initParticlesEngine(async (engine: Engine) => {
      await loadFull(engine);
    });
    engineReady.value = true;
  });

  const options: ISourceOptions = {
    background: { color: "#0d1117" },
    fpsLimit: 60,
    fullScreen: { enable: true, zIndex: -1 },
    particles: {
      color: {
        value: ["#ff5733", "#33ff57", "#3357ff", "#f3f333"],
      },
      links: {
        color: "random",
        enable: true,
        opacity: 0.3,
        distance: 120,
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
          rotateX: 600,
          rotateY: 1200,
        },
      },
      number: {
        value: 120,
        density: { enable: true },
      },
      opacity: {
        value: 0.8,
        animation: {
          enable: true,
          speed: 0.5,
          minimumValue: 0.1,
          sync: false,
        },
      },
      size: {
        value: { min: 1, max: 6 },
        animation: {
          enable: true,
          speed: 3,
          minimumValue: 1,
          sync: false,
        },
      },
      twinkle: {
        particles: {
          enable: true,
          frequency: 0.05,
          opacity: 0.5,
        },
      },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: "repulse" },
        onClick: { enable: true, mode: "push" },
        resize: { enable: true },
      },
      modes: {
        repulse: { distance: 120, duration: 0.4 },
        push: { quantity: 4 },
      },
    },
    detectRetina: true,
  };

  return <>{engineReady.value && <Particles id="tsparticles" options={options} />}</>;
});
```

## TypeScript

O pacote `@tsparticles/qwik` exporta tipos completos. Use `ISourceOptions` para configurações type-safe e `Engine` para o callback de inicialização:

```tsx
import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { Particles, initParticlesEngine } from "@tsparticles/qwik";
import type { Engine, ISourceOptions } from "@tsparticles/engine";
import { loadFull } from "tsparticles";

export default component$(() => {
  const engineReady = useSignal(false);

  useVisibleTask$(async () => {
    await initParticlesEngine(async (engine: Engine) => {
      await loadFull(engine);
    });
    engineReady.value = true;
  });

  const options: ISourceOptions = {
    background: { color: "#000" },
    particles: {
      number: { value: 50 },
      color: { value: "#fff" },
    },
  };

  return <>{engineReady.value && <Particles id="tsparticles" options={options} />}</>;
});
```


## Reactive Behavior

The `<Particles>` component reacts to prop changes at runtime:

- **`id`**, **`options`**, or **`url`** change → the existing container is destroyed and particles are reloaded with the new values.
- **`theme`** change → `loadTheme` is called on the existing container. This requires the optional `@tsparticles/plugin-themes` package to be loaded (otherwise it is a safe no-op).

On component unmount, the particles container is automatically destroyed — no orphan animations remain.

## Carregamento Lazy

O modelo de resumibilidade do Qwik significa que o código de partículas é carregado e executado apenas quando o componente se torna visível no viewport. O hook `useVisibleTask$` aciona a inicialização do motor, e o componente `<Particles>` em si é dividido em código automaticamente pelo Qwik quando importado:

```tsx
import { component$, useSignal, useVisibleTask$, $ } from "@builder.io/qwik";
import type { Engine } from "@tsparticles/engine";
import { loadFull } from "tsparticles";

export default component$(() => {
  const engineReady = useSignal(false);

  useVisibleTask$(async () => {
    await initParticlesEngine(async (engine: Engine) => {
      await loadFull(engine);
    });
    engineReady.value = true;
  });

  return (
    <div>
      {engineReady.value && (
        <Particles
          id="tsparticles"
          options={{
            background: { color: "#0d1117" },
          }}
        />
      )}
    </div>
  );
});
```

Use a convenção de sufixo `$` para handlers de eventos otimizados para Qwik ao conectar callbacks:

```tsx
import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { Particles, initParticlesEngine } from "@tsparticles/qwik";
import type { Engine, Container } from "@tsparticles/engine";
import { loadFull } from "tsparticles";

export default component$(() => {
  const engineReady = useSignal(false);
  const containerRef = useSignal<Container | undefined>();

  useVisibleTask$(async () => {
    await initParticlesEngine(async (engine: Engine) => {
      await loadFull(engine);
    });
    engineReady.value = true;
  });

  const handleParticlesLoaded = $((container?: Container) => {
    containerRef.value = container;
    console.log("Partículas carregadas:", container?.id);
  });

  return (
    <>
      {engineReady.value && (
        <Particles
          id="tsparticles"
          options={{ background: { color: "#0d1117" } }}
          particlesLoaded={handleParticlesLoaded}
        />
      )}
    </>
  );
});
```

Esta abordagem garante que suas animações de partículas sejam totalmente tree-shakeable e enviadas apenas para clientes quando necessário.
