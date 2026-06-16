---
title: Angular-Integration
description: Schritt-für-Schritt-Anleitung zur Integration von tsParticles in Angular-Anwendungen mit @tsparticles/angular.
---

# Angular-Integration

Das Paket `@tsparticles/angular` bietet Angular-Komponenten, Module und Dienste für tsParticles. Diese Anleitung behandelt sowohl den traditionellen `NgModule`-Ansatz als auch Angular 17+ Standalone-Komponenten.

---

## Installation

```bash
npm install @tsparticles/angular @tsparticles/engine
```

Für den vollen Funktionsumfang das vollständige Bundle installieren:

```bash
npm install tsparticles
```

Optionale Preset-Pakete:

```bash
npm install @tsparticles/preset-confetti
npm install @tsparticles/preset-fireworks
npm install @tsparticles/preset-snow
npm install @tsparticles/preset-stars
```

---

## Grundlegende Verwendung (NgModule)

### 1. Modul importieren

```typescript
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { NgParticlesModule } from "@tsparticles/angular";
import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgParticlesModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

### 2. Engine initialisieren

```typescript
import { Component, OnInit } from "@angular/core";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";
import { loadFull } from "tsparticles";
import { NgParticlesService } from "@tsparticles/angular";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  constructor(private readonly ngParticlesService: NgParticlesService) {}

  ngOnInit(): void {
    void this.ngParticlesService.init(async (engine: Engine) => {
      await loadFull(engine);
    });
  }

  particlesOptions: ISourceOptions = {
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

  particlesLoaded(container: Container): void {
    console.log("Particles-Container geladen", container);
  }
}
```

### 3. Template

```html
<ngx-particles
  id="tsparticles"
  [options]="particlesOptions"
  (particlesLoaded)="particlesLoaded($event)"
></ngx-particles>
```

---

## Details zur Engine-Initialisierung

Die Methode `NgParticlesService.init()` muss genau einmal aufgerufen werden, typischerweise in `AppComponent.ngOnInit()`. Sie erhält einen Callback, in dem die Plugins/Presets geladen werden, die Ihre Anwendung benötigt.

```typescript
import { Component, OnInit } from "@angular/core";
import { NgParticlesService } from "@tsparticles/angular";
import type { Engine } from "@tsparticles/engine";

@Component({ ... })
export class AppComponent implements OnInit {
  constructor(private readonly ngParticlesService: NgParticlesService) {}

  ngOnInit(): void {
    void this.ngParticlesService.init(async (engine: Engine) => {
      // Nur laden, was für kleinere Bundles benötigt wird
      await loadBasic(engine);       // Grundformen + Bewegung
      await loadEmittersPlugin(engine); // Emitter-Formen
    });
  }
}
```

Verfügbare Ladefunktionen aus `tsparticles`:

| Funktion            | Beschreibung                                |
| ------------------- | ------------------------------------------- |
| `loadFull(engine)`  | Alle Funktionen (größtes Bundle)            |
| `loadBasic(engine)` | Kernformen (Kreis, Quadrat, Polygon usw.)   |
| `loadSlim(engine)`  | Die meisten Funktionen ohne seltene Plugins |
| `loadAll(engine)`   | Veralteter Alias für `loadFull`             |

---

## Konfetti-Effekt

```bash
npm install @tsparticles/preset-confetti
```

```typescript
import { loadConfettiPreset } from "@tsparticles/preset-confetti";

// Im NgParticlesService.init-Callback:
await loadConfettiPreset(engine);
```

```typescript
particlesOptions: ISourceOptions = {
  preset: "confetti",
  background: {
    color: "transparent",
  },
};
```

Oder verwenden Sie die praktische `<ngx-confetti>`-Komponente:

```typescript
// app.module.ts
import { NgParticlesModule } from "@tsparticles/angular";

@NgModule({
  imports: [NgParticlesModule],
})
export class AppModule {}
```

```html
<ngx-confetti
  [options]="{
    particleCount: 200,
    colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00']
  }"
></ngx-confetti>
```

---

## Feuerwerks-Effekt

```bash
npm install @tsparticles/preset-fireworks
```

```typescript
import { loadFireworksPreset } from "@tsparticles/preset-fireworks";

// Im NgParticlesService.init-Callback:
await loadFireworksPreset(engine);
```

```typescript
particlesOptions: ISourceOptions = {
  preset: "fireworks",
  background: {
    color: "#000000",
  },
};
```

Oder verwenden Sie die `<ngx-fireworks>`-Komponente:

```html
<ngx-fireworks
  [options]="{
    explosion: 8,
    intensity: 30,
    flickering: 50,
    traceLength: 3
  }"
></ngx-fireworks>
```

> Vermeiden Sie den automatischen Start von Feuerwerk; binden Sie es an eine Benutzeraktion (Klick, Scrollen), um unnötige Ressourcennutzung zu vermeiden.

---

## Benutzerdefinierte Partikel-Konfiguration

Voll ausgestattete benutzerdefinierte Partikeleinrichtung mit Interaktivität:

```typescript
import { Component, OnInit } from "@angular/core";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";
import { loadFull } from "tsparticles";
import { NgParticlesService } from "@tsparticles/angular";

@Component({
  selector: "app-particles",
  templateUrl: "./particles.component.html",
})
export class ParticlesComponent implements OnInit {
  constructor(private readonly ngParticlesService: NgParticlesService) {}

  ngOnInit(): void {
    void this.ngParticlesService.init(async (engine: Engine) => {
      await loadFull(engine);
    });
  }

  particlesOptions: ISourceOptions = {
    background: {
      color: "#0d0d0d",
    },
    fpsLimit: 60,
    particles: {
      number: {
        value: 100,
        density: {
          enable: true,
        },
      },
      color: {
        value: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"],
      },
      shape: {
        type: ["circle", "square", "triangle"],
      },
      opacity: {
        value: 0.8,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          sync: false,
        },
      },
      size: {
        value: { min: 2, max: 8 },
        random: true,
        anim: {
          enable: true,
          speed: 4,
          size_min: 1,
          sync: false,
        },
      },
      links: {
        enable: true,
        distance: 150,
        color: "#ffffff",
        opacity: 0.3,
        width: 1,
        triangles: {
          enable: true,
          color: "#ffffff",
          opacity: 0.05,
        },
      },
      move: {
        enable: true,
        speed: 3,
        direction: "none",
        random: true,
        straight: false,
        outModes: "bounce",
        attract: {
          enable: true,
          rotateX: 600,
          rotateY: 600,
        },
      },
      life: {
        duration: {
          value: 5,
          random: true,
        },
        count: 0,
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
        resize: {
          enable: true,
        },
      },
      modes: {
        grab: {
          distance: 200,
          links: {
            opacity: 0.5,
          },
        },
        push: {
          quantity: 4,
        },
      },
    },
    detectRetina: true,
  };

  particlesLoaded(container: Container): void {
    console.log("Container geladen", container);
  }
}
```

```html
<ngx-particles
  id="tsparticles"
  [options]="particlesOptions"
  (particlesLoaded)="particlesLoaded($event)"
></ngx-particles>
```

---

## Ereignisse

Die `ngx-particles`-Komponente sendet das `particlesLoaded`-Ereignis:

```typescript
import type { Container } from "@tsparticles/engine";

// Komponentenmethode
onParticlesLoaded(container: Container): void {
  // Zugriff auf die Container-API
  container.pause();
  container.play();
  container.destroy();
  container.exportImage().then((blob) => { /* ... */ });
}
```

```html
<ngx-particles
  id="tsparticles"
  [options]="particlesOptions"
  (particlesLoaded)="onParticlesLoaded($event)"
></ngx-particles>
```

Die Container-Referenz gibt Ihnen volle programmatische Kontrolle: Anhalten, Fortsetzen, Zerstören, Exportieren und mehr.

---

## Template-Syntax & Bedingtes Rendern

Verwenden Sie Angular-Strukturdirektiven zum Ein-/Ausblenden der Komponente:

```html
<button (click)="showParticles = !showParticles">Partikel umschalten</button>

<ngx-particles
  *ngIf="showParticles"
  id="tsparticles"
  [options]="particlesOptions"
  (particlesLoaded)="particlesLoaded($event)"
></ngx-particles>
```

```typescript
export class AppComponent {
  showParticles = true;
  // ...
}
```

Wenn `*ngIf` auf `false` ausgewertet wird, wird die Komponente zerstört (einschließlich der Canvas und aller Partikelinstanzen). Beim erneuten Erstellen wird alles von Grund auf neu initialisiert.

---

## Standalone-Komponenten (Angular 17+)

In Angular 17+ können Sie `NgParticlesModule` direkt in eine Standalone-Komponente importieren:

```typescript
import { Component, OnInit } from "@angular/core";
import { NgParticlesModule, NgParticlesService } from "@tsparticles/angular";
import { loadFull } from "tsparticles";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";

@Component({
  selector: "app-particles",
  standalone: true,
  imports: [NgParticlesModule],
  template: `
    <ngx-particles
      id="tsparticles"
      [options]="particlesOptions"
      (particlesLoaded)="particlesLoaded($event)"
    ></ngx-particles>
  `,
})
export class ParticlesComponent implements OnInit {
  constructor(private readonly ngParticlesService: NgParticlesService) {}

  ngOnInit(): void {
    void this.ngParticlesService.init(async (engine: Engine) => {
      await loadFull(engine);
    });
  }

  particlesOptions: ISourceOptions = {
    background: { color: "#000" },
    particles: {
      number: { value: 50 },
      color: { value: "#fff" },
      shape: { type: "circle" },
      move: { enable: true, speed: 2 },
    },
  };

  particlesLoaded(container: Container): void {
    console.log("Geladen", container);
  }
}
```

Kein `NgModule`-Wrapper erforderlich — einfach `NgParticlesModule` im `imports`-Array der Komponente importieren.

---

## Vollständiges Komponenten-Beispiel

### app.component.ts

```typescript
import { Component, OnInit } from "@angular/core";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { NgParticlesService } from "@tsparticles/angular";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "tsParticles Angular-Demo";

  constructor(private readonly ngParticlesService: NgParticlesService) {}

  ngOnInit(): void {
    void this.ngParticlesService.init(async (engine: Engine) => {
      await loadSlim(engine);
    });
  }

  particlesOptions: ISourceOptions = {
    autoPlay: true,
    background: {
      color: "#1e1e2e",
      image: "",
      position: "50% 50%",
      repeat: "no-repeat",
      size: "cover",
    },
    backgroundMask: {
      cover: {
        color: "#1e1e2e",
      },
      enable: false,
    },
    fullScreen: {
      enable: true,
      zIndex: -1,
    },
    detectRetina: true,
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
        speed: 1,
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
  };

  particlesLoaded(container: Container): void {
    console.log("Partikel geladen", container);
  }
}
```

### app.component.html

```html
<div style="position: relative; width: 100%; height: 100vh;">
  <ngx-particles
    id="tsparticles"
    [options]="particlesOptions"
    (particlesLoaded)="particlesLoaded($event)"
  ></ngx-particles>

  <div
    style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: white; text-align: center;"
  >
    <h1>{{ title }}</h1>
    <p>Partikel laufen im Hintergrund.</p>
  </div>
</div>
```

### app.component.css

```css
:host {
  display: block;
  width: 100%;
  height: 100%;
}
```

---

## API-Referenz

| Komponente | Selektor        | Beschreibung                        |
| ---------- | --------------- | ----------------------------------- |
| Particles  | `ngx-particles` | Vollständiges Partikelsystem        |
| Confetti   | `ngx-confetti`  | Vorkonfigurierter Konfetti-Effekt   |
| Fireworks  | `ngx-fireworks` | Vorkonfigurierter Feuerwerks-Effekt |

### `ngx-particles` Eingaben

| Eingabe   | Typ              | Standard        | Beschreibung                                                              |
| --------- | ---------------- | --------------- | ------------------------------------------------------------------------- |
| `id`      | `string`         | `"tsparticles"` | Canvas-Element-ID                                                         |
| `options` | `ISourceOptions` | `{}`            | Partikel-Konfiguration                                                    |
| `url`     | `string`         | —               | Remote-JSON-Konfigurations-URL                                            |
| `theme`   | `string`         | —               | Theme name (requires `@tsparticles/plugin-themes`; safe no-op otherwise). |

### `ngx-particles` Ausgaben

| Ausgabe           | Payload     | Beschreibung                                          |
| ----------------- | ----------- | ----------------------------------------------------- |
| `particlesLoaded` | `Container` | Wird ausgegeben, wenn der Container initialisiert ist |

---

## Reactive Behavior

The `<Particles>` component reacts to prop changes at runtime:

- **`id`**, **`options`**, or **`url`** change → the existing container is destroyed and particles are reloaded with the new values.
- **`theme`** change → `loadTheme` is called on the existing container. This requires the optional `@tsparticles/plugin-themes` package to be loaded (otherwise it is a safe no-op).

On component unmount, the particles container is automatically destroyed — no orphan animations remain.

## Fehlerbehebung

- **Leere / unsichtbare Canvas** — Stellen Sie sicher, dass das übergeordnete Element eine definierte Höhe hat (z. B. `height: 100vh`). Die Canvas übernimmt die Container-Abmessungen.
- **`NgParticlesService.init()` mehrfach aufgerufen** — Nur einmal aufrufen, typischerweise in `AppComponent.ngOnInit()`. Nachfolgende Aufrufe sind sicher, aber überflüssig.
- **Modul nicht gefunden** — Überprüfen Sie, ob `@tsparticles/angular` in den `package.json`-Abhängigkeiten aufgeführt ist und dass Sie `NgParticlesModule` importiert haben.
- **`NullInjectorError: No provider for NgParticlesService`** — Sie müssen `NgParticlesModule` importieren (oder re-exportieren) in dem Modul, in dem Sie die Komponente bereitstellen.
