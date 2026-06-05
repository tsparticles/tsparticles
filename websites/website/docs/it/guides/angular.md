---
title: Integrazione Angular
description: Guida passo-passo per integrare tsParticles in applicazioni Angular usando @tsparticles/angular.
---

# Integrazione Angular

Il pacchetto `@tsparticles/angular` fornisce componenti Angular, moduli e servizi per tsParticles. Questa guida copre l'approccio tradizionale con `NgModule` e i component standalone di Angular 17+.

---

## Installazione

```bash
npm install @tsparticles/angular @tsparticles/engine
```

Per l'insieme completo di funzionalità, installa il bundle completo:

```bash
npm install tsparticles
```

Pacchetti preset opzionali:

```bash
npm install @tsparticles/preset-confetti
npm install @tsparticles/preset-fireworks
npm install @tsparticles/preset-snow
npm install @tsparticles/preset-stars
```

---

## Utilizzo Base (NgModule)

### 1. Importa il Modulo

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

### 2. Inizializza il Motore

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
    console.log("Contenitore particelle caricato", container);
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

## Dettagli Inizializzazione Motore

Il metodo `NgParticlesService.init()` deve essere chiamato una sola volta, tipicamente in `AppComponent.ngOnInit()`. Riceve una callback dove caricare i plugin/preset necessari all'applicazione.

```typescript
import { Component, OnInit } from "@angular/core";
import { NgParticlesService } from "@tsparticles/angular";
import type { Engine } from "@tsparticles/engine";

@Component({ ... })
export class AppComponent implements OnInit {
  constructor(private readonly ngParticlesService: NgParticlesService) {}

  ngOnInit(): void {
    void this.ngParticlesService.init(async (engine: Engine) => {
      // Carica solo ciò che serve per bundle più piccoli
      await loadBasic(engine);       // forme base + movimento
      await loadEmittersPlugin(engine); // forme emettitore
    });
  }
}
```

Funzioni di caricamento disponibili da `tsparticles`:

| Funzione            | Descrizione                                                      |
| ------------------- | ---------------------------------------------------------------- |
| `loadFull(engine)`  | Tutte le funzionalità (bundle più grande)                        |
| `loadBasic(engine)` | Forme base (cerchio, quadrato, poligono, ecc.)                   |
| `loadSlim(engine)`  | La maggior parte delle funzionalità senza plugin usati raramente |
| `loadAll(engine)`   | Alias deprecato per `loadFull`                                   |

---

## Effetto Coriandoli

```bash
npm install @tsparticles/preset-confetti
```

```typescript
import { loadConfettiPreset } from "@tsparticles/preset-confetti";

// Nella callback di NgParticlesService.init:
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

Oppure usa il componente `<ngx-confetti>`:

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

## Effetto Fuochi d'Artificio

```bash
npm install @tsparticles/preset-fireworks
```

```typescript
import { loadFireworksPreset } from "@tsparticles/preset-fireworks";

// Nella callback di NgParticlesService.init:
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

Oppure usa il componente `<ngx-fireworks>`:

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

> Evita di avviare automaticamente i fuochi d'artificio; collegali a un'azione dell'utente (clic, scroll) per prevenire un uso indesiderato di risorse.

---

## Configurazione Personalizzata delle Particelle

Configurazione personalizzata completa con interattività:

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
    console.log("Container caricato", container);
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

## Eventi

Il componente `ngx-particles` emette l'evento `particlesLoaded`:

```typescript
import type { Container } from "@tsparticles/engine";

// Metodo del componente
onParticlesLoaded(container: Container): void {
  // Accedi all'API del container
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

Il riferimento al container offre il controllo programmatico completo: pausa, ripristino, distruzione, esportazione e altro.

---

## Sintassi Template e Rendering Condizionale

Usa le direttive strutturali di Angular per attivare/disattivare il componente:

```html
<button (click)="showParticles = !showParticles">Attiva/Disattiva Particelle</button>

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

Quando `*ngIf` vale `false`, il componente viene distrutto (inclusi canvas e tutte le istanze di particelle). Ricreandolo, tutto viene reinizializzato da capo.

---

## Componenti Standalone (Angular 17+)

In Angular 17+, puoi importare `NgParticlesModule` direttamente in un componente standalone:

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
    console.log("Caricato", container);
  }
}
```

Nessun wrapper `NgModule` necessario — basta importare `NgParticlesModule` nell'array `imports` del componente.

---

## Esempio Completo di Componente

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
  title = "tsParticles Angular Demo";

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
    console.log("Particelle caricate", container);
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
    <p>Le particelle sono in esecuzione nello sfondo.</p>
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

## Riferimento API

| Componente         | Selettore       | Descrizione                               |
| ------------------ | --------------- | ----------------------------------------- |
| Particelle         | `ngx-particles` | Componente sistema particelle completo    |
| Coriandoli         | `ngx-confetti`  | Effetto coriandoli preconfigurato         |
| Fuochi d'Artificio | `ngx-fireworks` | Effetto fuochi d'artificio preconfigurato |

### Input di `ngx-particles`

| Input     | Tipo             | Default         | Descrizione               |
| --------- | ---------------- | --------------- | ------------------------- |
| `id`      | `string`         | `"tsparticles"` | ID dell'elemento canvas   |
| `options` | `ISourceOptions` | `{}`            | Configurazione particelle |
| `url`     | `string`         | —               | URL config JSON remota    |

### Output di `ngx-particles`

| Output            | Payload     | Descrizione                                |
| ----------------- | ----------- | ------------------------------------------ |
| `particlesLoaded` | `Container` | Emesso quando il container è inizializzato |

---

## Risoluzione dei Problemi

- **Canvas bianco/invisibile** — Assicurati che l'elemento padre abbia un'altezza definita (es. `height: 100vh`). Il canvas assume le dimensioni del contenitore.
- **`NgParticlesService.init()` chiamato più volte** — Chiamalo una sola volta, tipicamente in `AppComponent.ngOnInit()`. Chiamate successive sono sicure ma ridondanti.
- **Modulo non trovato** — Verifica che `@tsparticles/angular` sia elencato nelle dipendenze di `package.json` e di aver importato `NgParticlesModule`.
- **`NullInjectorError: No provider for NgParticlesService`** — Devi importare `NgParticlesModule` (o riesportarlo) nel modulo dove fornisci il componente.
