---
title: Guida Stencil
description: Guida completa per integrare tsParticles con componenti Stencil.
---

# Guida Stencil

## Indice dei Contenuti

1. [Installazione](#installazione)
2. [Registrazione Elementi Personalizzati](#registrazione-elementi-personalizzati)
3. [Utilizzo Base](#utilizzo-base)
4. [Inizializzazione del Motore](#inizializzazione-del-motore)
5. [Configurazione Personalizzata](#configurazione-personalizzata)
6. [Ciclo di Vita del Componente](#ciclo-di-vita-del-componente)
7. [Esempio TypeScript](#esempio-typescript)

---

## Installazione

Installa il wrapper Stencil e il motore tsParticles tramite npm:

```bash
npm install @tsparticles/stencil tsparticles
```

Installa opzionalmente un bundle preset per ridurre la configurazione manuale:

```bash
npm install @tsparticles/slim
```

---

## Registrazione Elementi Personalizzati

Il pacchetto `@tsparticles/stencil` fornisce una funzione `defineCustomElements` che registra l'elemento personalizzato `<stencil-particles>` con il browser. Chiamala una volta prima di usare il componente in qualsiasi punto della tua app.

```tsx
import { defineCustomElements } from "@tsparticles/stencil/loader";

// Registra l'elemento <stencil-particles>
defineCustomElements();
```

Per progetti Stencil che usano lazy-loading, chiamala dentro `componentWillLoad` o nel componente radice della tua app per garantire che l'elemento sia disponibile prima del rendering.

---

## Utilizzo Base

Una volta che l'elemento personalizzato è registrato, puoi usare `<stencil-particles>` nel tuo JSX con una prop `options` e una callback `init` per caricare le funzionalità del motore necessarie.

```tsx
import { Component, h } from "@stencil/core";
import type { ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const options: ISourceOptions = {
  fpsLimit: 60,
  particles: {
    number: { value: 80 },
    color: { value: "#00d4ff" },
    shape: { type: "circle" },
    opacity: { value: 0.6 },
    size: { value: { min: 2, max: 5 } },
    links: {
      enable: true,
      distance: 150,
      color: "#00d4ff",
      opacity: 0.3,
      width: 1,
    },
    move: {
      enable: true,
      speed: 1.5,
      direction: "none",
      random: true,
      outModes: { default: "bounce" },
    },
  },
  background: { color: "#0d1117" },
};

@Component({ tag: "my-particles" })
export class MyParticles {
  render() {
    return (
      <stencil-particles
        container-id="tsparticles"
        options={options}
        init={async (engine) => {
          await loadSlim(engine);
        }}
      />
    );
  }
}
```

---

## Inizializzazione del Motore

La prop `init` riceve l'istanza del motore e ti permette di caricare le funzionalità necessarie. Questo è il punto consigliato per chiamare `loadSlim`, `loadFull` o plugin di aggiornamento/interazione individuali.

```tsx
import { loadSlim } from "@tsparticles/slim";
import { loadFull } from "tsparticles";
import { loadConfettiPreset } from "@tsparticles/preset-confetti";

// Opzione A: leggero (cerchi, movimento base, collegamenti)
init={async engine => { await loadSlim(engine); }}

// Opzione B: insieme completo di funzionalità (tutte le forme, effetti, preset)
init={async engine => { await loadFull(engine); }}

// Opzione C: preset (coriandoli, fuochi d'artificio, neve, stelle)
init={async engine => { await loadConfettiPreset(engine); }}
```

L'istanza del motore è anche accessibile dopo l'inizializzazione tramite l'attributo `container-id`, permettendoti di controllare programmaticamente il sistema di particelle in seguito se necessario.

---

## Configurazione Personalizzata

Ecco una configurazione completa con interattività, tipi di forma multipli e modalità hover/click.

```tsx
import { Component, h } from "@stencil/core";
import type { ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const fullOptions: ISourceOptions = {
  fpsLimit: 60,
  particles: {
    number: {
      value: 60,
      density: { enable: true, width: 800, height: 800 },
    },
    color: {
      value: ["#ff6b6b", "#feca57", "#48dbfb", "#ff9ff3", "#54a0ff"],
    },
    shape: {
      type: ["circle", "triangle", "polygon"],
      options: {
        polygon: { sides: 6 },
      },
    },
    opacity: { value: { min: 0.4, max: 0.8 } },
    size: { value: { min: 3, max: 8 } },
    links: {
      enable: true,
      distance: 200,
      color: "#ffffff",
      opacity: 0.15,
      width: 1,
    },
    move: {
      enable: true,
      speed: 2,
      direction: "none",
      random: true,
      straight: false,
      outModes: { default: "out" },
    },
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: "attract" },
      onClick: { enable: true, mode: "repulse" },
    },
    modes: {
      attract: { distance: 200, duration: 0.4, factor: 1 },
      repulse: { distance: 200, duration: 0.4 },
    },
  },
  background: {
    color: "#0f0f23",
  },
};

@Component({ tag: "app-particles" })
export class AppParticles {
  render() {
    return (
      <stencil-particles
        container-id="tsparticles"
        options={fullOptions}
        init={async (engine) => {
          await loadSlim(engine);
        }}
      />
    );
  }
}
```

---

## Ciclo di Vita del Componente

In Stencil, l'hook del ciclo di vita consigliato per la configurazione una tantum è `componentWillLoad`. Usalo per registrare elementi personalizzati e gestire lo stato di inizializzazione in modo che il componente `<stencil-particles>` venga renderizzato solo quando il motore è pronto.

```tsx
import { Component, h, State } from "@stencil/core";
import type { ISourceOptions } from "@tsparticles/engine";
import { defineCustomElements } from "@tsparticles/stencil/loader";
import { loadSlim } from "@tsparticles/slim";

@Component({ tag: "app-root" })
export class AppRoot {
  @State() private engineReady = false;

  private options: ISourceOptions = {
    particles: {
      number: { value: 50 },
      color: { value: "#ffffff" },
      shape: { type: "circle" },
      opacity: { value: 0.6 },
      size: { value: { min: 1, max: 4 } },
      move: {
        enable: true,
        speed: 1,
        outModes: { default: "bounce" },
      },
    },
    background: { color: "#1a1a2e" },
  };

  componentWillLoad() {
    defineCustomElements();
    this.engineReady = true;
  }

  render() {
    return (
      <div>
        <h1>tsParticles + Stencil</h1>
        {this.engineReady && (
          <stencil-particles
            container-id="tsparticles"
            options={this.options}
            init={async (engine) => {
              await loadSlim(engine);
            }}
          />
        )}
      </div>
    );
  }
}
```

Usare `@State()` garantisce che il componente venga ri-renderizzato quando il motore diventa pronto, e il render condizionale impedisce che il container delle particelle venga montato prima che l'elemento personalizzato sia definito.

---

## Reactive Behavior

The `<Particles>` component reacts to prop changes at runtime:

- **`id`**, **`options`**, or **`url`** change → the existing container is destroyed and particles are reloaded with the new values.
- **`theme`** change → `loadTheme` is called on the existing container. This requires the optional `@tsparticles/plugin-themes` package to be loaded (otherwise it is a safe no-op).

On component unmount, the particles container is automatically destroyed — no orphan animations remain.

## Esempio TypeScript

Ecco un componente applicazione Stencil completo e tipizzato che integra tsParticles con il preset slim, interattività hover e un tema scuro personalizzato.

```tsx
import { Component, h, State, Prop } from "@stencil/core";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";
import { defineCustomElements } from "@tsparticles/stencil/loader";
import { loadSlim } from "@tsparticles/slim";

@Component({
  tag: "app-home",
  styleUrl: "app-home.css",
  shadow: true,
})
export class AppHome {
  @State() private initialized = false;

  @Prop() readonly title: string = "Benvenuto";

  private container?: Container;

  private readonly options: ISourceOptions = {
    fullScreen: { enable: true, zIndex: -1 },
    fpsLimit: 60,
    particles: {
      number: { value: 80, density: { enable: true } },
      color: { value: "#6366f1" },
      shape: { type: "circle" },
      opacity: { value: { min: 0.3, max: 0.7 } },
      size: { value: { min: 2, max: 6 } },
      links: {
        enable: true,
        distance: 160,
        color: "#6366f1",
        opacity: 0.25,
        width: 1,
      },
      move: {
        enable: true,
        speed: 1.2,
        direction: "none",
        random: false,
        straight: false,
        outModes: { default: "bounce" },
      },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: "grab" },
        onClick: { enable: true, mode: "push" },
      },
      modes: {
        grab: { distance: 180, links: { opacity: 0.6 } },
        push: { quantity: 3 },
      },
    },
    background: { color: "#0a0a1a" },
  };

  componentWillLoad() {
    defineCustomElements();
    this.initialized = true;
  }

  private handleInit = async (engine: Engine): Promise<void> => {
    await loadSlim(engine);
  };

  private handleLoaded = async (container?: Container): Promise<void> => {
    this.container = container;
    console.log("Container particelle caricato:", container?.id);
  };

  render() {
    return (
      <div class="home">
        <h1>{this.title}</h1>
        <p>Realizzato con tsParticles e Stencil</p>

        {this.initialized && (
          <stencil-particles
            container-id="tsparticles"
            options={this.options}
            init={this.handleInit}
            particlesLoaded={this.handleLoaded}
          />
        )}
      </div>
    );
  }
}
```

L'evento `particlesLoaded` viene attivato una volta che il primo frame è renderizzato, dandoti accesso all'istanza `Container` per il controllo programmatico (play, pause, stop, cambio tema).

---

Ora hai tutto il necessario per integrare tsParticles in un'applicazione Stencil. Ogni esempio è autonomo e pronto per essere copiato nel tuo progetto.
