---
title: Integración con Angular
description: Guía paso a paso para integrar tsParticles en aplicaciones Angular usando @tsparticles/angular.
---

# Integración con Angular

El paquete `@tsparticles/angular` proporciona componentes, módulos y servicios de Angular para tsParticles. Esta guía cubre tanto el enfoque tradicional con `NgModule` como los componentes independientes (standalone) de Angular 17+.

---

## Instalación

```bash
npm install @tsparticles/angular @tsparticles/engine
```

Para el conjunto completo de funcionalidades, instala el paquete completo:

```bash
npm install tsparticles
```

Paquetes de preset opcionales:

```bash
npm install @tsparticles/preset-confetti
npm install @tsparticles/preset-fireworks
npm install @tsparticles/preset-snow
npm install @tsparticles/preset-stars
```

---

## Uso Básico (NgModule)

### 1. Importar el Módulo

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

### 2. Inicializar el Motor

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
    console.log("Contenedor de partículas cargado", container);
  }
}
```

### 3. Plantilla

```html
<ngx-particles
  id="tsparticles"
  [options]="particlesOptions"
  (particlesLoaded)="particlesLoaded($event)"
></ngx-particles>
```

---

## Detalles de la Inicialización del Motor

El método `NgParticlesService.init()` debe llamarse exactamente una vez, normalmente en `AppComponent.ngOnInit()`. Recibe un callback donde cargas los plugins/presets que tu aplicación necesita.

```typescript
import { Component, OnInit } from "@angular/core";
import { NgParticlesService } from "@tsparticles/angular";
import type { Engine } from "@tsparticles/engine";

@Component({ ... })
export class AppComponent implements OnInit {
  constructor(private readonly ngParticlesService: NgParticlesService) {}

  ngOnInit(): void {
    void this.ngParticlesService.init(async (engine: Engine) => {
      // Carga solo lo que necesitas para paquetes más pequeños
      await loadBasic(engine);       // formas básicas + movimiento
      await loadEmittersPlugin(engine); // formas de emisor
    });
  }
}
```

Funciones de carga disponibles desde `tsparticles`:

| Función             | Descripción                                                     |
| ------------------- | --------------------------------------------------------------- |
| `loadFull(engine)`  | Todas las funcionalidades (paquete más grande)                  |
| `loadBasic(engine)` | Formas básicas (círculo, cuadrado, polígono, etc.)              |
| `loadSlim(engine)`  | La mayoría de funcionalidades sin plugins de uso poco frecuente |
| `loadAll(engine)`   | Alias obsoleto de `loadFull`                                    |

---

## Efecto Confeti

```bash
npm install @tsparticles/preset-confetti
```

```typescript
import { loadConfettiPreset } from "@tsparticles/preset-confetti";

// En el callback de NgParticlesService.init:
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

O usa el componente `<ngx-confetti>` por comodidad:

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

## Efecto Fuegos Artificiales

```bash
npm install @tsparticles/preset-fireworks
```

```typescript
import { loadFireworksPreset } from "@tsparticles/preset-fireworks";

// En el callback de NgParticlesService.init:
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

O usa el componente `<ngx-fireworks>`:

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

> Evita iniciar automáticamente los fuegos artificiales; vincúlalos a una acción del usuario (clic, desplazamiento) para evitar el uso innecesario de recursos.

---

## Configuración Personalizada de Partículas

Configuración personalizada completa con interactividad:

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
    console.log("Contenedor cargado", container);
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

## Eventos

El componente `ngx-particles` emite el evento `particlesLoaded`:

```typescript
import type { Container } from "@tsparticles/engine";

// Método del componente
onParticlesLoaded(container: Container): void {
  // Accede a la API del contenedor
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

La referencia al contenedor te da control programático completo: pausar, reanudar, destruir, exportar y más.

---

## Sintaxis de Plantilla y Renderizado Condicional

Usa directivas estructurales de Angular para alternar el componente:

```html
<button (click)="showParticles = !showParticles">Alternar Partículas</button>

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

Cuando `*ngIf` evalúa a `false`, el componente se destruye (incluyendo el canvas y todas las instancias de partículas). Volver a crearlo reinicia todo desde cero.

---

## Componentes Independientes (Angular 17+)

En Angular 17+, puedes importar `NgParticlesModule` directamente en un componente independiente:

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
    console.log("Cargado", container);
  }
}
```

No se necesita envoltorio `NgModule` — solo importa `NgParticlesModule` en el arreglo `imports` del componente.

---

## Ejemplo de Componente Completo

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
    console.log("Partículas cargadas", container);
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
    <p>Las partículas se están ejecutando en segundo plano.</p>
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

## Referencia de API

| Componente | Selector        | Descripción                                   |
| ---------- | --------------- | --------------------------------------------- |
| Particles  | `ngx-particles` | Componente completo del sistema de partículas |
| Confetti   | `ngx-confetti`  | Efecto de confeti preconfigurado              |
| Fireworks  | `ngx-fireworks` | Efecto de fuegos artificiales preconfigurado  |

### Entradas de `ngx-particles`

| Entrada   | Tipo             | Por Defecto     | Descripción                      |
| --------- | ---------------- | --------------- | -------------------------------- |
| `id`      | `string`         | `"tsparticles"` | ID del elemento canvas           |
| `options` | `ISourceOptions` | `{}`            | Configuración de partículas      |
| `url`     | `string`         | —               | URL remota de configuración JSON |

### Salidas de `ngx-particles`

| Salida            | Carga       | Descripción                                 |
| ----------------- | ----------- | ------------------------------------------- |
| `particlesLoaded` | `Container` | Se emite cuando el contenedor se inicializa |

---

## Solución de Problemas

- **Canvas en blanco / invisible** — Asegúrate de que el elemento padre tenga una altura definida (ej., `height: 100vh`). El canvas toma las dimensiones del contenedor.
- **`NgParticlesService.init()` llamado múltiples veces** — Llámalo solo una vez, normalmente en `AppComponent.ngOnInit()`. Las llamadas posteriores son seguras pero redundantes.
- **Módulo no encontrado** — Verifica que `@tsparticles/angular` esté listado en las dependencias de `package.json` y que hayas importado `NgParticlesModule`.
- **`NullInjectorError: No provider for NgParticlesService`** — Debes importar `NgParticlesModule` (o reexportarlo) en el módulo donde proporcionas el componente.
