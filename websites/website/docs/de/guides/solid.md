---
title: SolidJS-Integration
description: Schritt-für-Schritt-Anleitung zur Integration von tsParticles in eine SolidJS-Anwendung mit dem offiziellen @tsparticles/solid-Wrapper.
---

# SolidJS-Integration

Diese Anleitung behandelt die Integration von tsParticles in ein **SolidJS**-Projekt mit dem offiziellen `@tsparticles/solid`-Wrapper. SolidJS' feinkörniges Reaktivitätsmodell arbeitet gut mit tsParticles zusammen – Optionsänderungen lösen gezielte Canvas-Aktualisierungen ohne vollständige Neuinitialisierung aus.

## Installation

Installieren Sie den SolidJS-Wrapper und das Engine-Bundle Ihrer Wahl:

```bash
npm install @tsparticles/solid tsparticles
```

Für ein kleineres Bundle verwenden Sie `@tsparticles/slim` stattdessen:

```bash
npm install @tsparticles/solid @tsparticles/slim
```

## Grundlegende Verwendung

SolidJS läuft vollständig im Browser (kein SSR), daher müssen Sie nicht gegen Server-Rendering absichern. Die Engine muss jedoch asynchron initialisiert werden, bevor Partikel gerendert werden.

Verwenden Sie `initParticlesEngine` innerhalb von `onMount`, um die Engine-Funktionen zu laden, und rendern Sie dann die `<Particles>`-Komponente bedingt mit `<Show>`:

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

Die `<Show>`-Komponente stellt sicher, dass das `<Particles>`-Element erst in das DOM eingefügt wird, nachdem die Engine bereit ist.

## Engine-Initialisierung

Die Funktion `initParticlesEngine` akzeptiert einen Callback, der die `Engine`-Instanz erhält. Verwenden Sie diesen Callback, um die Funktionen zu registrieren, die Ihre Konfiguration benötigt:

```tsx
import { initParticlesEngine } from "@tsparticles/solid";
import { loadFull } from "tsparticles";
import { loadSlim } from "@tsparticles/slim";
import { loadConfettiPreset } from "@tsparticles/preset-confetti";
import type { Engine } from "@tsparticles/engine";

// Minimal — nur Basisformen und Bewegungen
initParticlesEngine((engine: Engine) => loadSlim(engine)).then(() => {
  console.log("Engine bereit (slim)");
});

// Vollständig — alle Funktionen enthalten
initParticlesEngine((engine: Engine) => loadFull(engine)).then(() => {
  console.log("Engine bereit (full)");
});

// Nur Preset — nur die Funktionen, die für ein bestimmtes Preset benötigt werden
initParticlesEngine((engine: Engine) => loadConfettiPreset(engine)).then(() => {
  console.log("Konfetti-Preset geladen");
});
```

Rufen Sie `initParticlesEngine` einmal in Ihrer App auf — typischerweise im `onMount` der Root-Komponente. Die Engine-Instanz wird zwischengespeichert, sodass nachfolgende Aufrufe sofort zurückkehren.

## Bedingtes Rendern

Verwenden Sie SolidJS' `<Show>`-Kontrollfluss, um das Rendern zu verzögern, bis die Engine initialisiert ist:

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
    <Show when={ready()} fallback={<p>Lade Partikel...</p>}>
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

Die `fallback`-Eigenschaft zeigt einen Ladeindikator an, während die Engine initialisiert wird.

## Preset-Verwendung

Verwenden Sie `@tsparticles/configs` für schnelle, vorgefertigte Konfigurationen:

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

Verfügbare Konfigurationen umfassen: `basic`, `bubbles`, `snow`, `stars`, `fireworks`, `confetti`, `links` und mehr.

## Interaktive Partikel

Fügen Sie Klick- und Hover-Interaktionen durch Konfiguration des `interactivity`-Abschnitts hinzu:

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

- **Hover-Modi**: `grab`, `bubble`, `repulse`, `attract`, `slow`, `connect`
- **Klick-Modi**: `push`, `remove`, `repulse`, `bubble`, `attract`, `pause`

## Benutzerdefinierte Konfiguration

Eine vollständige benutzerdefinierte Konfiguration mit mehreren Partikelformen, Farbpaletten und Bewegungseinstellungen:

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

## Vollständiges TypeScript-Beispiel

Eine vollständig typisierte Komponente mit Container-Referenz, Engine-Initialisierung und manuellen Steuerelementen:

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

  const particlesLoaded = (c?: Container) => {
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
        {paused() ? "Fortsetzen" : "Pause"}
      </button>
    </Show>
  );
};

export default App;
```

## Dynamische Optionen mit Signalen

Eine der Stärken von SolidJS ist die feinkörnige Reaktivität – Sie können Signale verwenden, um Partikel-Optionen zu steuern, und die Canvas wird effizient aktualisiert:

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

  // Optionen sind ein reguläres Objekt – es wird reaktiv durch
  // das interne Tracking der Particle-Komponente gelesen
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
          Farbe:
          <input type="color" value={color()} onInput={(e) => setColor(e.currentTarget.value)} />
        </label>
        <label>
          Anzahl:
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

Da `options` eine Funktion ist, die auf Signale zugreift, erhält die `<Particles>`-Komponente jedes Mal, wenn sich `color()` oder `particleCount()` ändert, ein neues Optionsobjekt und wendet nur die geänderten Eigenschaften auf die vorhandene Canvas an.

## Preset mit benutzerdefinierten Überschreibungen

Laden Sie ein Preset und führen Sie dann benutzerdefinierte Überschreibungen für einen maßgeschneiderten Effekt zusammen:

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
      // Überschreiben der Schneefarbe auf Blau
      color: { value: "#88ccff" },
      // Erhöhen der Anzahl der Flocken
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

Das Preset liefert Standardwerte für jede Option, und Ihre Überschreibungen werden darauf angewendet – Sie müssen nur die Eigenschaften angeben, die Sie ändern möchten.

## Reactive Behavior

The `<Particles>` component reacts to prop changes at runtime:

- **`id`**, **`options`**, or **`url`** change → the existing container is destroyed and particles are reloaded with the new values.
- **`theme`** change → `loadTheme` is called on the existing container. This requires the optional `@tsparticles/plugin-themes` package to be loaded (otherwise it is a safe no-op).

On component unmount, the particles container is automatically destroyed — no orphan animations remain.

## Fehlerbehebung

| Symptom                        | Ursache                                      | Lösung                                                                                       |
| ------------------------------ | -------------------------------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Leeres DOM-Element             | Engine vor dem Rendern nicht initialisiert   | Wickeln Sie `<Particles>` in `<Show when={initialized()}>`                                   |
| Keine Partikel sichtbar        | Fehlendes `move.enable` oder `number.value`  | Stellen Sie `particles.move.enable: true` und `particles.number.value > 0` sicher            |
| Canvas hinter Inhalt           | Fehlendes `zIndex` in fullScreen             | Verwenden Sie `fullScreen: { zIndex: -1 }`                                                   |
| Optionsänderung nicht sichtbar | Objektreferenz ändert sich nicht             | Wickeln Sie Optionen in eine Funktion oder einen Store; vermeiden Sie statische Objekte      |
| Engine nicht gefunden          | Fehlender `loadFull`- oder `loadSlim`-Import | Installieren Sie `tsparticles` oder `@tsparticles/slim` und rufen Sie `loadFull(engine)` auf |
| `theme`                        | `string`                                     | —                                                                                            | Theme name (requires `@tsparticles/plugin-themes`; safe no-op otherwise). |

## Nächste Schritte

- Erkunden Sie den [Configs-Playground](/playground/configs) für sofort einsatzbereite Konfigurationen.
- Lesen Sie die [Optionen-Referenz](/options/) für die vollständige Liste der Parameter.
- Durchstöbern Sie den [SolidJS-Quellcode](https://github.com/tsparticles/solid) auf GitHub für Wrapper-Interna.
