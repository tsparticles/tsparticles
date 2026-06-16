---
title: Lit
description: Integra tsParticles con Lit usando il wrapper ufficiale @tsparticles/lit per componenti web.
---

# Integrazione Lit

Il pacchetto `@tsparticles/lit` fornisce un elemento personalizzato `<lit-particles>` costruito con Lit, permettendoti di usare tsParticles in modo dichiarativo in qualsiasi progetto Lit o pagina HTML semplice.

## Installazione

```bash
npm install @tsparticles/lit tsparticles
```

Il pacchetto è completamente tipizzato e include i pattern di controller reattivi di Lit per aggiornare reattivamente le opzioni delle particelle.

## Inizializzazione del Motore

Chiama `initParticlesEngine` prima di registrare il componente `<lit-particles>` o importarlo nella tua applicazione. Deve avvenire una sola volta.

```typescript
import { initParticlesEngine } from "@tsparticles/lit";
import { loadFull } from "tsparticles";

void initParticlesEngine(async (engine) => {
  await loadFull(engine);
});
```

Per dimensioni del bundle ottimizzate, importa solo le funzionalità necessarie al tuo progetto:

```typescript
import { initParticlesEngine } from "@tsparticles/lit";
import { loadBasic } from "@tsparticles/basic";
import { loadConfettiPreset } from "@tsparticles/preset-confetti";

void initParticlesEngine(async (engine) => {
  await loadBasic(engine);
  await loadConfettiPreset(engine);
});
```

## Utilizzo Base

Dopo che il motore è inizializzato, usa l'elemento `<lit-particles>` in qualsiasi template Lit o file HTML:

```typescript
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "@tsparticles/lit";

@customElement("my-app")
class MyApp extends LitElement {
  private options = {
    background: {
      color: "#0d1117",
    },
    particles: {
      number: { value: 60 },
      color: { value: "#58a6ff" },
      links: {
        enable: true,
        color: "#58a6ff",
      },
      move: { enable: true, speed: 2 },
    },
  };

  render() {
    return html` <lit-particles id="tsparticles" .options="${this.options}"> </lit-particles> `;
  }
}
```

La sintassi `.options` (con punto iniziale) è il property binding di Lit, che garantisce che l'oggetto sia passato per riferimento invece di essere serializzato come attributo.

## Utilizzo in HTML Semplice

Una volta che `@tsparticles/lit` è bundleizzato o caricato, l'elemento funziona anche in HTML semplice:

```html
<!DOCTYPE html>
<html>
  <head>
    <script type="module" src="bundle.js"></script>
  </head>
  <body>
    <lit-particles id="tsparticles"></lit-particles>
  </body>
</html>
```

Puoi passare un oggetto opzioni minimo come attributo JSON:

```html
<lit-particles
  id="tsparticles"
  options='{"background":{"color":"#000"},"particles":{"number":{"value":30}}}'
></lit-particles>
```

## Configurazione Personalizzata

Passa una configurazione tsParticles completa come proprietà Lit:

```typescript
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { ISourceOptions } from "@tsparticles/engine";
import "@tsparticles/lit";

@customElement("my-particles")
class MyParticles extends LitElement {
  @property({ type: Object })
  options: ISourceOptions = {
    background: {
      color: "#0d1117",
    },
    fpsLimit: 120,
    fullScreen: {
      enable: true,
      zIndex: -1,
    },
    particles: {
      color: {
        value: ["#ff5733", "#33ff57", "#3357ff"],
      },
      links: {
        color: "#ffffff",
        enable: true,
        opacity: 0.3,
        distance: 150,
      },
      move: {
        enable: true,
        speed: 1.5,
        direction: "none",
        random: true,
      },
      number: {
        value: 100,
        density: {
          enable: true,
        },
      },
      opacity: {
        value: 0.6,
        animation: {
          enable: true,
          speed: 0.5,
          minimumValue: 0.1,
        },
      },
      size: {
        value: { min: 1, max: 5 },
        animation: {
          enable: true,
          speed: 2,
          minimumValue: 1,
        },
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

  render() {
    return html` <lit-particles id="tsparticles" .options="${this.options}"> </lit-particles> `;
  }
}
```

## Gestione Eventi

Ascolta l'evento personalizzato `particles-loaded` emesso dall'elemento `<lit-particles>`:

```typescript
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import type { Container } from "@tsparticles/engine";
import "@tsparticles/lit";

@customElement("my-app")
class MyApp extends LitElement {
  private handleParticlesLoaded(e: CustomEvent<Container>) {
    const container = e.detail;
    console.log("Particelle caricate:", container);
    container?.refresh();
  }

  render() {
    return html` <lit-particles id="tsparticles" @particles-loaded="${this.handleParticlesLoaded}"> </lit-particles> `;
  }
}
```

## Esempio TypeScript

Un elemento Lit completamente tipizzato con `initParticlesEngine`, opzioni reattive e gestione eventi:

```typescript
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { initParticlesEngine } from "@tsparticles/lit";
import type { Container, ISourceOptions } from "@tsparticles/engine";
import { loadFull } from "tsparticles";
import "@tsparticles/lit";

void initParticlesEngine(async (engine) => {
  await loadFull(engine);
});

@customElement("particles-background")
class ParticlesBackground extends LitElement {
  @property({ type: Object })
  options: ISourceOptions = {};

  @property({ type: Boolean, attribute: "fullscreen" })
  fullscreen = true;

  protected onParticlesLoaded(e: CustomEvent<Container>) {
    console.log("Container pronto:", e.detail.id);
  }

  render() {
    return html`
      <lit-particles
        id="particles-bg"
        .options="${this.options}"
        ?fullScreen="${this.fullscreen}"
        @particles-loaded="${this.onParticlesLoaded}"
      >
      </lit-particles>
    `;
  }
}
```


## Reactive Behavior

The `<Particles>` component reacts to prop changes at runtime:

- **`id`**, **`options`**, or **`url`** change → the existing container is destroyed and particles are reloaded with the new values.
- **`theme`** change → `loadTheme` is called on the existing container. This requires the optional `@tsparticles/plugin-themes` package to be loaded (otherwise it is a safe no-op).

On component unmount, the particles container is automatically destroyed — no orphan animations remain.

## Aggiornamenti Dinamici

Poiché `<lit-particles>` usa le proprietà reattive di Lit, cambiare la proprietà `options` aggiorna automaticamente le particelle:

```typescript
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { ISourceOptions } from "@tsparticles/engine";
import "@tsparticles/lit";

@customElement("dynamic-particles")
class DynamicParticles extends LitElement {
  @state()
  private theme: "light" | "dark" = "dark";

  private get options(): ISourceOptions {
    return this.theme === "dark"
      ? {
          background: { color: "#0d1117" },
          particles: { color: { value: "#58a6ff" } },
        }
      : {
          background: { color: "#ffffff" },
          particles: { color: { value: "#0969da" } },
        };
  }

  private toggleTheme() {
    this.theme = this.theme === "dark" ? "light" : "dark";
  }

  render() {
    return html`
      <button @click="${this.toggleTheme}">Passa a ${this.theme === "dark" ? "Chiaro" : "Scuro"}</button>
      <lit-particles id="tsparticles" .options="${this.options}"> </lit-particles>
    `;
  }
}
```

Il componente osserva la proprietà `options` e chiama `refresh()` internamente ogni volta che cambia, aggiornando senza problemi la configurazione delle particelle in fase di esecuzione.
