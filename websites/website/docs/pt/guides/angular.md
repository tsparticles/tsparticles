---
title: Integração Angular
description: Guia passo a passo para integrar tsParticles em aplicações Angular usando @tsparticles/angular.
---

# Integração Angular

O pacote `@tsparticles/angular` fornece componentes, módulos e serviços Angular para tsParticles. Este guia aborda a abordagem tradicional com `NgModule` bem como componentes standalone no Angular 17+.

---

## Instalação

```bash
npm install @tsparticles/angular @tsparticles/engine
```

Para o conjunto completo de funcionalidades, instale o pacote completo:

```bash
npm install tsparticles
```

Pacotes de presets opcionais:

```bash
npm install @tsparticles/preset-confetti
npm install @tsparticles/preset-fireworks
npm install @tsparticles/preset-snow
npm install @tsparticles/preset-stars
```

---

## Uso Básico (NgModule)

### 1. Importar o Módulo

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

### 2. Inicializar o Motor

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
    console.log("Container de partículas carregado", container);
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

## Detalhes da Inicialização do Motor

O método `NgParticlesService.init()` deve ser chamado exatamente uma vez, normalmente em `AppComponent.ngOnInit()`. Ele recebe um callback onde você carrega os plugins/presets que sua aplicação precisa.

```typescript
import { Component, OnInit } from "@angular/core";
import { NgParticlesService } from "@tsparticles/angular";
import type { Engine } from "@tsparticles/engine";

@Component({ ... })
export class AppComponent implements OnInit {
  constructor(private readonly ngParticlesService: NgParticlesService) {}

  ngOnInit(): void {
    void this.ngParticlesService.init(async (engine: Engine) => {
      // Carregue apenas o necessário para bundles menores
      await loadBasic(engine);       // formas básicas + movimento
      await loadEmittersPlugin(engine); // formas de emissores
    });
  }
}
```

Funções de carregamento disponíveis no `tsparticles`:

| Função            | Descrição                                    |
| ----------------- | -------------------------------------------- |
| `loadFull(engine)`  | Todas as funcionalidades (maior bundle)      |
| `loadBasic(engine)` | Formas principais (círculo, quadrado, polígono, etc.) |
| `loadSlim(engine)`  | Maioria das funcionalidades menos plugins raros     |
| `loadAll(engine)`   | Alias obsoleto para `loadFull`                |

---

## Efeito Confete

```bash
npm install @tsparticles/preset-confetti
```

```typescript
import { loadConfettiPreset } from "@tsparticles/preset-confetti";

// No callback do NgParticlesService.init:
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

Ou use o componente conveniente `<ngx-confetti>`:

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

## Efeito Fogos de Artifício

```bash
npm install @tsparticles/preset-fireworks
```

```typescript
import { loadFireworksPreset } from "@tsparticles/preset-fireworks";

// No callback do NgParticlesService.init:
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

Ou use o componente `<ngx-fireworks>`:

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

> Evite iniciar fogos de artifício automaticamente; vincule-os a uma ação do usuário (clique, scroll) para evitar uso indesejado de recursos.

---

## Configuração Personalizada de Partículas

Configuração personalizada completa com interatividade:

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
    console.log("Container carregado", container);
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

O componente `ngx-particles` emite o evento `particlesLoaded`:

```typescript
import type { Container } from "@tsparticles/engine";

// Método do componente
onParticlesLoaded(container: Container): void {
  // Acesse a API do container
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

A referência do container oferece controle programático completo: pausar, retomar, destruir, exportar e mais.

---

## Sintaxe de Template e Renderização Condicional

Use diretivas estruturais do Angular para alternar o componente:

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

Quando `*ngIf` é avaliado como `false`, o componente é destruído (incluindo o canvas e todas as instâncias de partículas). Recriá-lo reinicializa tudo do zero.

---

## Componentes Standalone (Angular 17+)

No Angular 17+, você pode importar `NgParticlesModule` diretamente em um componente standalone:

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
    console.log("Carregado", container);
  }
}
```

Nenhum wrapper `NgModule` necessário — basta importar `NgParticlesModule` no array `imports` do componente.

---

## Exemplo de Componente Completo

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
    console.log("Partículas carregadas", container);
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
    <p>As partículas estão sendo executadas no fundo.</p>
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

## Referência da API

| Componente | Seletor        | Descrição                          |
| --------- | -------------- | ---------------------------------- |
| Particles | `ngx-particles` | Componente completo do sistema de partículas |
| Confetti  | `ngx-confetti`  | Efeito de confete pré-configurado  |
| Fireworks | `ngx-fireworks` | Efeito de fogos de artifício pré-configurado |

### Inputs do `ngx-particles`

| Input     | Tipo             | Padrão           | Descrição                 |
| --------- | ---------------- | ---------------- | ------------------------- |
| `id`      | `string`         | `"tsparticles"`  | ID do elemento canvas     |
| `options` | `ISourceOptions` | `{}`             | Configuração das partículas |
| `url`     | `string`         | —                | URL de configuração JSON remota |

### Outputs do `ngx-particles`

| Output           | Payload     | Descrição                                |
| ---------------- | ----------- | ---------------------------------------- |
| `particlesLoaded` | `Container` | Emitido quando o container é inicializado |

---

## Solução de Problemas

- **Canvas em branco / invisível** — Certifique-se de que o elemento pai tenha uma altura definida (ex.: `height: 100vh`). O canvas assume as dimensões do container.
- **`NgParticlesService.init()` chamado várias vezes** — Chame-o apenas uma vez, tipicamente em `AppComponent.ngOnInit()`. Chamadas subsequentes são seguras mas redundantes.
- **Módulo não encontrado** — Verifique se `@tsparticles/angular` está listado nas dependências do `package.json` e que você importou `NgParticlesModule`.
- **`NullInjectorError: No provider for NgParticlesService`** — Você deve importar `NgParticlesModule` (ou re-exportá-lo) no módulo onde você fornece o componente.
