---
title: Qwik
description: Integra tsParticles con Qwik usando il wrapper ufficiale @tsparticles/qwik.
---

# Integrazione Qwik

Il pacchetto `@tsparticles/qwik` fornisce un componente `<Particles>` ottimizzato per il modello di ripristinabilità di Qwik. Usa `useVisibleTask$` per l'inizializzazione lazy e segnali per aggiornamenti reattivi.

## Installazione

```bash
npm install @tsparticles/qwik tsparticles
```

Le dichiarazioni TypeScript sono incluse — non sono richiesti pacchetti di tipi aggiuntivi.

## Inizializzazione del Motore

In Qwik, il motore deve essere inizializzato all'interno di un blocco `useVisibleTask$` per garantire che venga eseguito solo lato client (mai durante SSR). Usa un segnale per tracciare la prontezza:

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

## Utilizzo Base

Una volta che il motore è pronto, renderizza il componente `<Particles>` con la tua configurazione:

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

## Rendering Condizionale

Il pattern del segnale `engineReady` garantisce che il componente `<Particles>` venga montato solo dopo che il motore è completamente inizializzato. Questo previene mismatch di idratazione tra server e client:

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
          Caricamento particelle...
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

## Particelle Interattive

Abilita interazioni al passaggio del mouse e al click aggiungendo la sezione `interactivity` alle tue opzioni:

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

## Configurazione Personalizzata

Una configurazione completa con animazioni, colori multipli e ricca interattività:

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

Il pacchetto `@tsparticles/qwik` esporta tutti i tipi. Usa `ISourceOptions` per configurazioni type-safe e `Engine` per la callback di inizializzazione:

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

## Caricamento Lazy

Il modello di ripristinabilità di Qwik significa che il codice delle particelle viene caricato ed eseguito solo quando il componente diventa visibile nel viewport. L'hook `useVisibleTask$` attiva l'inizializzazione del motore, e il componente `<Particles>` stesso viene automaticamente suddiviso nel codice da Qwik quando importato:

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

Usa la convenzione del suffisso `$` per i gestori di eventi ottimizzati per Qwik quando colleghi le callback:

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
    console.log("Particelle caricate:", container?.id);
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

Questo approccio garantisce che le tue animazioni di particelle siano completamente tree-shakeable e inviate ai client solo quando necessario.
