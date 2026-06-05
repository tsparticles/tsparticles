---
title: Intégration Angular
description: Guide étape par étape pour intégrer tsParticles dans des applications Angular à l'aide de @tsparticles/angular.
---

# Intégration Angular

Le package `@tsparticles/angular` fournit des composants Angular, des modules et des services pour tsParticles. Ce guide couvre l'approche traditionnelle avec `NgModule` ainsi que les composants autonomes Angular 17+.

---

## Installation

```bash
npm install @tsparticles/angular @tsparticles/engine
```

Pour l'ensemble complet des fonctionnalités, installez le bundle complet :

```bash
npm install tsparticles
```

Packages de préréglages optionnels :

```bash
npm install @tsparticles/preset-confetti
npm install @tsparticles/preset-fireworks
npm install @tsparticles/preset-snow
npm install @tsparticles/preset-stars
```

---

## Utilisation de base (NgModule)

### 1. Importer le module

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

### 2. Initialiser le moteur

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
    console.log("Conteneur de particules chargé", container);
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

## Détails d'initialisation du moteur

La méthode `NgParticlesService.init()` doit être appelée exactement une fois, généralement dans `AppComponent.ngOnInit()`. Elle reçoit un callback où vous chargez les plugins/préréglages dont votre application a besoin.

```typescript
import { Component, OnInit } from "@angular/core";
import { NgParticlesService } from "@tsparticles/angular";
import type { Engine } from "@tsparticles/engine";

@Component({ ... })
export class AppComponent implements OnInit {
  constructor(private readonly ngParticlesService: NgParticlesService) {}

  ngOnInit(): void {
    void this.ngParticlesService.init(async (engine: Engine) => {
      // Chargez seulement ce dont vous avez besoin pour des bundles plus légers
      await loadBasic(engine);       // formes de base + déplacement
      await loadEmittersPlugin(engine); // formes d'émetteurs
    });
  }
}
```

Fonctions de chargement disponibles depuis `tsparticles` :

| Fonction            | Description                                           |
| ------------------- | ----------------------------------------------------- |
| `loadFull(engine)`  | Toutes les fonctionnalités (plus gros bundle)         |
| `loadBasic(engine)` | Formes de base (cercle, carré, polygone, etc.)        |
| `loadSlim(engine)`  | La plupart des fonctionnalités sans les plugins rares |
| `loadAll(engine)`   | Alias déprécié pour `loadFull`                        |

---

## Effet Confetti

```bash
npm install @tsparticles/preset-confetti
```

```typescript
import { loadConfettiPreset } from "@tsparticles/preset-confetti";

// Dans le callback NgParticlesService.init :
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

Ou utilisez le composant pratique `<ngx-confetti>` :

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

## Effet Feux d'artifice

```bash
npm install @tsparticles/preset-fireworks
```

```typescript
import { loadFireworksPreset } from "@tsparticles/preset-fireworks";

// Dans le callback NgParticlesService.init :
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

Ou utilisez le composant `<ngx-fireworks>` :

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

> Évitez de lancer automatiquement les feux d'artifice ; associez-les à une action utilisateur (clic, défilement) pour éviter une utilisation excessive des ressources.

---

## Configuration personnalisée des particules

Configuration personnalisée complète avec interactivité :

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
    console.log("Conteneur chargé", container);
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

## Événements

Le composant `ngx-particles` émet l'événement `particlesLoaded` :

```typescript
import type { Container } from "@tsparticles/engine";

// Méthode du composant
onParticlesLoaded(container: Container): void {
  // Accéder à l'API du conteneur
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

La référence du conteneur vous donne un contrôle programmatique complet : pause, reprise, destruction, exportation, et plus encore.

---

## Syntaxe de template et rendu conditionnel

Utilisez les directives structurelles Angular pour activer/désactiver le composant :

```html
<button (click)="showParticles = !showParticles">Activer/Désactiver les particules</button>

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

Quand `*ngIf` est évalué à `false`, le composant est détruit (y compris le canvas et toutes les instances de particules). Le recréer réinitialise tout depuis zéro.

---

## Composants autonomes (Angular 17+)

Dans Angular 17+, vous pouvez importer `NgParticlesModule` directement dans un composant autonome :

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
    console.log("Chargé", container);
  }
}
```

Aucun encapsuleur `NgModule` nécessaire — importez simplement `NgParticlesModule` dans le tableau `imports` du composant.

---

## Exemple de composant complet

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
  title = "tsParticles Angular Démo";

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
    console.log("Particules chargées", container);
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
    <p>Les particules s'exécutent en arrière-plan.</p>
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

## Référence API

| Composant       | Sélecteur       | Description                             |
| --------------- | --------------- | --------------------------------------- |
| Particules      | `ngx-particles` | Composant système de particules complet |
| Confetti        | `ngx-confetti`  | Effet confetti préconfiguré             |
| Feux d'artifice | `ngx-fireworks` | Effet feux d'artifice préconfiguré      |

### Entrées `ngx-particles`

| Entrée    | Type             | Défaut          | Description                        |
| --------- | ---------------- | --------------- | ---------------------------------- |
| `id`      | `string`         | `"tsparticles"` | ID de l'élément canvas             |
| `options` | `ISourceOptions` | `{}`            | Configuration des particules       |
| `url`     | `string`         | —               | URL de configuration JSON distante |

### Sorties `ngx-particles`

| Sortie            | Payload     | Description                               |
| ----------------- | ----------- | ----------------------------------------- |
| `particlesLoaded` | `Container` | Émise lorsque le conteneur est initialisé |

---

## Dépannage

- **Canvas blanc / invisible** — Assurez-vous que l'élément parent a une hauteur définie (ex. `height: 100vh`). Le canvas prend les dimensions du conteneur.
- **`NgParticlesService.init()` appelée plusieurs fois** — Appelez-la une seule fois, généralement dans `AppComponent.ngOnInit()`. Les appels suivants sont sans danger mais redondants.
- **Module non trouvé** — Vérifiez que `@tsparticles/angular` est listé dans les dépendances de `package.json` et que vous avez importé `NgParticlesModule`.
- **`NullInjectorError: No provider for NgParticlesService`** — Vous devez importer `NgParticlesModule` (ou le ré-exporter) dans le module où vous fournissez le composant.
