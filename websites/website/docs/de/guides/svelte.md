---
title: Svelte-Integration
description: Schritt-für-Schritt-Anleitung zur Integration von tsParticles in Svelte- und SvelteKit-Anwendungen mit @tsparticles/svelte.
---

# Svelte-Integration

Das Paket `@tsparticles/svelte` bietet eine native Svelte-Komponente für tsParticles. Diese Anleitung behandelt Svelte (mit Vite) und SvelteKit, einschließlich reaktiver Optionen, Ereignisbehandlung und mehrerer Instanzen.

---

## Installation

```bash
npm install @tsparticles/svelte @tsparticles/engine
```

Für das vollständige Bundle oder Presets:

```bash
npm install tsparticles
npm install @tsparticles/preset-snow
npm install @tsparticles/preset-stars
npm install @tsparticles/preset-confetti
npm install @tsparticles/preset-fireworks
```

---

## Grundlegende Verwendung

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

## Engine-Initialisierung

Übergeben Sie einen `on:init`-Ereignis-Handler, um die Plugins und Presets zu laden, die Ihre App benötigt:

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

Alternativ können Sie das Dienstprogramm `initParticlesEngine` vor dem Mounten verwenden:

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

## Schnee-Effekt

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

Passen Sie das Preset-Verhalten durch Hinzufügen weiterer Optionen an:

```svelte
<script lang="ts">
  const options: ISourceOptions = {
    preset: "snow",
    background: { color: "#0f0f23" },
    particles: {
      move: {
        speed: 1.5,  // langsamere Schneefälle
      },
      opacity: {
        value: 0.8,  // sichtbarere Flocken
      },
    },
  };
</script>
```

---

## Sterne-Effekt

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

## Interaktive Partikel

Fügen Sie Maus-Hover- und Klick-Interaktivität hinzu:

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

## Ereignisbehandlung

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
    console.log("Container geladen", container);
  };

  const pause = () => container?.pause();
  const resume = () => container?.play();
  const destroy = () => container?.destroy();
</script>

<div>
  <button on:click={pause}>Pause</button>
  <button on:click={resume}>Fortsetzen</button>
  <button on:click={destroy}>Zerstören</button>
</div>

<Particles
  id="tsparticles"
  options={options}
  on:init={handleInit}
  on:particlesLoaded={handleLoaded}
/>
```

| Ereignis             | Detail      | Wird ausgelöst                               |
| -------------------- | ----------- | -------------------------------------------- |
| `on:init`            | `Engine`    | Nachdem die Engine initialisiert wurde       |
| `on:particlesLoaded` | `Container` | Nachdem der Container vollständig bereit ist |

---

## TypeScript-Beispiel

Vollständig typisierte Komponente:

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

## Dynamische Optionen

Reaktive Optionen aktualisieren die Partikel, ohne die Instanz neu zu erstellen:

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
    Partikelfarbe:
    <input type="color" bind:value={color} />
  </label>
</div>

<Particles
  id="dynamic"
  {options}
  on:init={handleInit}
/>
```

Die `$:`-Reaktivdeklaration berechnet `options` neu, sobald sich `color` ändert, und die `Particles`-Komponente übernimmt die neue Konfiguration automatisch.

---

## Mehrere Instanzen

Rendern Sie mehrere unabhängige Partikelsysteme auf derselben Seite:

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

Jede `<Particles>`-Komponente erhält ihre eigene `id`, Canvas und Engine-Kontext.

---

## SvelteKit-Verwendung

In SvelteKit erfordert die Canvas die Browser-Umgebung. Deaktivieren Sie SSR für die Komponente:

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

Oder wickeln Sie den Import in eine Client-only-Komponente. Für SvelteKit 2+ können Sie auch die `vite-plugin-svelte` SSR-Ausschlüsse verwenden.

---

## API-Referenz

| Eigenschaft | Typ              | Standard        | Beschreibung                                                              |
| ----------- | ---------------- | --------------- | ------------------------------------------------------------------------- |
| `id`        | `string`         | `"tsparticles"` | Canvas-Element-ID                                                         |
| `options`   | `ISourceOptions` | `{}`            | Partikel-Konfigurationsobjekt                                             |
| `url`       | `string`         | —               | URL zu einer Remote-JSON-Konfiguration                                    |
| `theme`     | `string`         | —               | Theme name (requires `@tsparticles/plugin-themes`; safe no-op otherwise). |

| Ereignis             | Detail      | Beschreibung                                                                         |
| -------------------- | ----------- | ------------------------------------------------------------------------------------ |
| `on:init`            | `Engine`    | Wird ausgelöst, wenn die Engine initialisiert wird (zum Laden von Plugins verwenden) |
| `on:particlesLoaded` | `Container` | Wird ausgelöst, wenn der Container vollständig bereit ist                            |

---

## Fehlerbehebung

- **Canvas nicht sichtbar** — Stellen Sie sicher, dass der übergeordnete Container explizite Abmessungen hat (`height: 100%`, `height: 100vh` oder ein fester Pixelwert).
- **`loadFull is not a function`** — Überprüfen Sie, ob `tsparticles` installiert ist und dass Sie `loadFull` von `tsparticles` importieren (nicht von `@tsparticles/engine`).
- **Reaktivität funktioniert nicht** — Stellen Sie sicher, dass `options` eine reaktive Variable ist (`$:` oder `let`, die an eine reaktive Quelle gebunden ist). Reine `const`-Werte werden nicht aktualisiert.
- **SvelteKit leerer Bildschirm** — Importieren Sie `@tsparticles/svelte` dynamisch oder verwenden Sie den `browser`-Guard, wie im SvelteKit-Abschnitt oben gezeigt.
- **TypeScript-Fehler für `event.detail`** — Verwenden Sie die Typen `CustomEvent<Engine>` und `CustomEvent<Container>` für die Ereignis-Handler.
