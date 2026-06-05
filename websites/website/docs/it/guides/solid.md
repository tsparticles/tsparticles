---
title: Integrazione SolidJS
description: Guida passo-passo per integrare tsParticles in un'applicazione SolidJS usando il wrapper ufficiale @tsparticles/solid.
---

# Integrazione SolidJS

Questa guida copre l'integrazione di tsParticles in un progetto **SolidJS** usando il wrapper ufficiale `@tsparticles/solid`. Il modello di reattività a grana fine di SolidJS funziona bene con tsParticles — i cambiamenti delle opzioni attivano aggiornamenti mirati del canvas senza reinizializzazione completa.

## Installazione

Installa il wrapper SolidJS e il bundle del motore che preferisci:

```bash
npm install @tsparticles/solid tsparticles
```

Per un bundle più piccolo, usa `@tsparticles/slim` invece:

```bash
npm install @tsparticles/solid @tsparticles/slim
```

## Utilizzo Base

SolidJS viene eseguito interamente nel browser (nessun SSR), quindi non è necessario proteggersi dal rendering lato server. Tuttavia, il motore deve essere inizializzato in modo asincrono prima di renderizzare le particelle.

Usa `initParticlesEngine` dentro `onMount` per caricare le funzionalità del motore, poi renderizza condizionalmente il componente `<Particles>` con `<Show>`:

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

Il componente `<Show>` garantisce che l'elemento `<Particles>` venga inserito nel DOM solo dopo che il motore è pronto.

## Inizializzazione del Motore

La funzione `initParticlesEngine` accetta una callback che riceve l'istanza `Engine`. Usa questa callback per registrare le funzionalità necessarie alla tua configurazione:

```tsx
import { initParticlesEngine } from "@tsparticles/solid";
import { loadFull } from "tsparticles";
import { loadSlim } from "@tsparticles/slim";
import { loadConfettiPreset } from "@tsparticles/preset-confetti";
import type { Engine } from "@tsparticles/engine";

// Minimo — solo forme base e movimenti
initParticlesEngine((engine: Engine) => loadSlim(engine)).then(() => {
  console.log("Motore pronto (slim)");
});

// Completo — ogni funzionalità inclusa
initParticlesEngine((engine: Engine) => loadFull(engine)).then(() => {
  console.log("Motore pronto (full)");
});

// Solo preset — solo le funzionalità necessarie per un preset specifico
initParticlesEngine((engine: Engine) => loadConfettiPreset(engine)).then(() => {
  console.log("Preset coriandoli caricato");
});
```

Chiama `initParticlesEngine` una volta nella tua app — tipicamente nell'`onMount` del componente radice. L'istanza del motore viene memorizzata nella cache, quindi le chiamate successive restituiscono immediatamente il risultato.

## Rendering Condizionale

Usa il controllo di flusso `<Show>` di SolidJS per differire il rendering fino a quando il motore non è inizializzato:

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
    <Show when={ready()} fallback={<p>Caricamento particelle...</p>}>
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

La prop `fallback` mostra un indicatore di caricamento mentre il motore si inizializza.

## Uso dei Preset

Usa `@tsparticles/configs` per configurazioni rapide e predefinite:

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

Le configurazioni disponibili includono: `basic`, `bubbles`, `snow`, `stars`, `fireworks`, `confetti`, `links` e altre.

## Particelle Interattive

Aggiungi interazioni al click e al passaggio del mouse configurando la sezione `interactivity`:

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

- **Modalità hover**: `grab`, `bubble`, `repulse`, `attract`, `slow`, `connect`
- **Modalità click**: `push`, `remove`, `repulse`, `bubble`, `attract`, `pause`

## Configurazione Personalizzata

Una configurazione personalizzata completa con forme multiple, palette di colori e impostazioni di movimento:

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

## Esempio TypeScript Completo

Un componente tipizzato completo con riferimento al container, inizializzazione del motore e controlli manuali:

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
        {paused() ? "Riprendi" : "Pausa"}
      </button>
    </Show>
  );
};

export default App;
```

## Opzioni Dinamiche con Segnali

Uno dei punti di forza di SolidJS è la reattività a grana fine — puoi usare i segnali per guidare le opzioni delle particelle e il canvas si aggiornerà in modo efficiente:

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

  // options è un oggetto normale — verrà letto in modo reattivo
  // attraverso il tracciamento interno del componente Particles
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
          Colore:
          <input type="color" value={color()} onInput={(e) => setColor(e.currentTarget.value)} />
        </label>
        <label>
          Conteggio:
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

Poiché `options` è una funzione che accede ai segnali, ogni volta che `color()` o `particleCount()` cambia, il componente `<Particles>` riceve un nuovo oggetto opzioni e applica solo le proprietà modificate al canvas esistente.

## Preset con Sovrascritture Personalizzate

Carica un preset, poi unisci sovrascritture personalizzate per un effetto su misura:

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
      // Sovrascrive il colore della neve in blu
      color: { value: "#88ccff" },
      // Aumenta il numero di fiocchi
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

Il preset fornisce valori predefiniti per ogni opzione, e le tue sovrascritture vengono unite sopra — devi solo specificare le proprietà che vuoi cambiare.

## Risoluzione dei Problemi

| Sintomo                       | Causa                                    | Rimedio                                                                       |
| ----------------------------- | ---------------------------------------- | ----------------------------------------------------------------------------- |
| Elemento DOM vuoto            | Motore non inizializzato prima del render | Avvolgi `<Particles>` in `<Show when={initialized()}>`                        |
| Nessuna particella visibile   | Manca `move.enable` o `number.value`     | Assicurati `particles.move.enable: true` e `particles.number.value > 0`       |
| Canvas dietro il contenuto    | Manca `zIndex` in fullScreen             | Usa `fullScreen: { zIndex: -1 }`                                             |
| Cambio opzioni non riflesso   | Riferimento oggetto non cambiato         | Avvolgi le opzioni in una funzione o store; evita oggetti statici             |
| Motore non trovato            | Manca import di `loadFull` o `loadSlim`  | Installa `tsparticles` o `@tsparticles/slim` e chiama `loadFull(engine)`      |

## Prossimi Passi

- Esplora il [Playground Configs](/playground/configs) per configurazioni già pronte.
- Leggi il [Riferimento Opzioni](/options/) per l'elenco completo dei parametri.
- Sfoglia il [codice sorgente SolidJS](https://github.com/tsparticles/solid) su GitHub per i dettagli interni del wrapper.
