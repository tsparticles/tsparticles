---
title: Lit
description: Integrieren Sie tsParticles mit Lit über den offiziellen @tsparticles/lit-Webkomponenten-Wrapper.
---

# Lit-Integration

Das Paket `@tsparticles/lit` bietet ein mit Lit erstelltes benutzerdefiniertes `<lit-particles>`-Element, das es Ihnen ermöglicht, tsParticles deklarativ in jedem Lit-Projekt oder in einer einfachen HTML-Seite zu verwenden.

## Installation

```bash
npm install @tsparticles/lit tsparticles
```

Das Paket ist vollständig typisiert und enthält Lits reaktive Controller-Muster für reaktive Aktualisierungen der Partikel-Optionen.

## Engine-Initialisierung

Rufen Sie `initParticlesEngine` auf, bevor Sie die `<lit-particles>`-Komponente registrieren oder in Ihre Anwendung importieren. Dies muss genau einmal geschehen.

```typescript
import { initParticlesEngine } from "@tsparticles/lit";
import { loadFull } from "tsparticles";

void initParticlesEngine(async (engine) => {
  await loadFull(engine);
});
```

Für optimierte Bundle-Größen importieren Sie nur die Funktionen, die Ihr Projekt benötigt:

```typescript
import { initParticlesEngine } from "@tsparticles/lit";
import { loadBasic } from "@tsparticles/basic";
import { loadConfettiPreset } from "@tsparticles/preset-confetti";

void initParticlesEngine(async (engine) => {
  await loadBasic(engine);
  await loadConfettiPreset(engine);
});
```

## Grundlegende Verwendung

Nach der Initialisierung der Engine verwenden Sie das `<lit-particles>`-Element in jeder Lit-Vorlage oder HTML-Datei:

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

Die `.options`-Syntax (mit führendem Punkt) ist Lits Eigenschaftsbindung und stellt sicher, dass das Objekt als Referenz übergeben und nicht als Attribut serialisiert wird.

## Einfache HTML-Verwendung

Sobald `@tsparticles/lit` gebündelt oder geladen ist, funktioniert das Element auch in einfachem HTML:

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

Sie können ein minimales Optionsobjekt als JSON-Attribut übergeben:

```html
<lit-particles
  id="tsparticles"
  options='{"background":{"color":"#000"},"particles":{"number":{"value":30}}}'
></lit-particles>
```

## Benutzerdefinierte Konfiguration

Übergeben Sie eine vollständige tsParticles-Konfiguration als Lit-Eigenschaft:

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

## Ereignisbehandlung

Hören Sie auf das benutzerdefinierte `particles-loaded`-Ereignis, das vom `<lit-particles>`-Element ausgelöst wird:

```typescript
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import type { Container } from "@tsparticles/engine";
import "@tsparticles/lit";

@customElement("my-app")
class MyApp extends LitElement {
  private handleParticlesLoaded(e: CustomEvent<Container>) {
    const container = e.detail;
    console.log("Partikel geladen:", container);
    container?.refresh();
  }

  render() {
    return html` <lit-particles id="tsparticles" @particles-loaded="${this.handleParticlesLoaded}"> </lit-particles> `;
  }
}
```

## TypeScript-Beispiel

Ein vollständig typisiertes Lit-Element mit `initParticlesEngine`, reaktiven Optionen und Ereignisbehandlung:

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
    console.log("Container bereit:", e.detail.id);
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

## Dynamische Aktualisierungen

Da `<lit-particles>` Lits reaktive Eigenschaften verwendet, führt eine Änderung der `options`-Eigenschaft automatisch zu einer Aktualisierung der Partikel:

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
      <button @click="${this.toggleTheme}">Wechsel zu ${this.theme === "dark" ? "Hell" : "Dunkel"}</button>
      <lit-particles id="tsparticles" .options="${this.options}"> </lit-particles>
    `;
  }
}
```

Die Komponente überwacht die `options`-Eigenschaft und ruft intern `refresh()` auf, sobald sie sich ändert, wodurch die Partikel-Konfiguration zur Laufzeit nahtlos aktualisiert wird.
