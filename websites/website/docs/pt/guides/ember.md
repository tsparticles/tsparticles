---
title: Guia Ember
description: Guia completo para integrar tsParticles com aplicações Ember.js.
---

# Guia Ember

## Índice

1. [Instalação](#instalação)
2. [Inicialização do Motor](#inicialização-do-motor)
3. [Uso Básico](#uso-básico)
4. [Configuração Personalizada](#configuração-personalizada)
5. [Manipulação de Eventos](#manipulação-de-eventos)
6. [Renderização Condicional](#renderização-condicional)
7. [Exemplo TypeScript](#exemplo-typescript)

---

## Instalação

Instale o addon Ember e o motor tsParticles via ember-cli:

```bash
ember install @tsparticles/ember
```

Isso instalará o addon e sua dependência `tsparticles`. Você pode opcionalmente adicionar pacotes de preset:

```bash
npm install @tsparticles/slim
```

---

## Inicialização do Motor

O addon exporta um utilitário `initParticlesEngine` que você chama uma vez no nível da aplicação. Ele recebe um callback assíncrono onde você carrega as funcionalidades, presets ou formas que sua aplicação precisa.

```typescript
import { initParticlesEngine } from "@tsparticles/ember/utils/init-particles-engine";
import { loadFull } from "tsparticles";

// Chame isso durante a inicialização da aplicação
if (typeof window !== "undefined") {
  void initParticlesEngine(async (engine) => {
    await loadFull(engine);
  });
}
```

Locais típicos para esta chamada são o hook `beforeModel` da rota da aplicação, o construtor de um controller da aplicação, ou um inicializador de instância. O singleton do motor é inicializado uma vez e compartilhado entre todos os componentes `<Particles>` na sua aplicação.

---

## Uso Básico

Após inicializar o motor, use o componente `<Particles>` em qualquer template. Passe sua configuração de partículas através do argumento `@options`.

```hbs
{{! app/templates/application.hbs }}

<Particles @options={{this.options}} />
```

```typescript
// app/controllers/application.ts
import Controller from "@ember/controller";
import type { ISourceOptions } from "@tsparticles/engine";

export default class ApplicationController extends Controller {
  options: ISourceOptions = {
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
}
```

---

## Configuração Personalizada

Construa uma configuração mais rica com interatividade, múltiplas formas e densidade responsiva.

```typescript
import Controller from "@ember/controller";
import type { ISourceOptions } from "@tsparticles/engine";

export default class IndexController extends Controller {
  options: ISourceOptions = {
    fullScreen: { enable: true, zIndex: -1 },
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
    background: { color: "#0f0f23" },
  };
}
```

```hbs
<Particles @options={{this.options}} />
```

---

## Manipulação de Eventos

O componente `<Particles>` dispara uma ação `@particlesLoaded` quando o container terminou de inicializar e o primeiro frame foi renderizado. Use isso para acessar a instância `Container` para controle programático.

```typescript
import Controller from "@ember/controller";
import { action } from "@ember/object";
import type { Container, ISourceOptions } from "@tsparticles/engine";

export default class ApplicationController extends Controller {
  options: ISourceOptions = {
    /* ... */
  };

  @action
  loadedCallback(container: Container) {
    console.log("Partículas carregadas", container?.id);

    // Exemplo de controle programático:
    setTimeout(() => {
      container.pause();
      console.log("Partículas pausadas após 5 segundos");
    }, 5000);
  }
}
```

```hbs
<Particles @options={{this.options}} @particlesLoaded={{this.loadedCallback}} />
```

Você também pode usar o padrão de callback inline com um helper de template se preferir não definir uma ação separada.

---

## Renderização Condicional

Use o helper `{{if}}` do Ember junto com uma propriedade `@tracked` para controlar quando o componente `<Particles>` renderiza. Isso é útil quando a inicialização do motor é assíncrona e você quer evitar renderizar o componente antes que o motor esteja pronto.

```typescript
import Controller from "@ember/controller";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";
import { initParticlesEngine } from "@tsparticles/ember/utils/init-particles-engine";
import { loadSlim } from "@tsparticles/slim";

export default class ApplicationController extends Controller {
  @tracked engineReady = false;

  options: ISourceOptions = {
    particles: {
      number: { value: 50 },
      color: { value: "#ffffff" },
      shape: { type: "circle" },
      opacity: { value: 0.6 },
      size: { value: { min: 1, max: 4 } },
      move: { enable: true, speed: 1, outModes: { default: "bounce" } },
    },
    background: { color: "#1a1a2e" },
  };

  constructor(...args: any[]) {
    super(...args);
    if (typeof window !== "undefined") {
      void initParticlesEngine(async (engine: Engine) => {
        await loadSlim(engine);
      }).then(() => {
        this.engineReady = true;
      });
    }
  }
}
```

```hbs
{{#if this.engineReady}}
  <Particles @options={{this.options}} @particlesLoaded={{this.loadedCallback}} />
{{else}}
  <p>Carregando partículas...</p>
{{/if}}
```

O decorador `@tracked` garante que o template re-renderize automaticamente assim que a promise resolver.

---


## Reactive Behavior

The `<Particles>` component reacts to prop changes at runtime:

- **`id`**, **`options`**, or **`url`** change → the existing container is destroyed and particles are reloaded with the new values.
- **`theme`** change → `loadTheme` is called on the existing container. This requires the optional `@tsparticles/plugin-themes` package to be loaded (otherwise it is a safe no-op).

On component unmount, the particles container is automatically destroyed — no orphan animations remain.

## Exemplo TypeScript

Abaixo está um controller de aplicação Ember completo e tipado demonstrando o padrão de integração completo com preset slim, interatividade e gerenciamento de ciclo de vida.

```typescript
// app/controllers/application.ts
import Controller from "@ember/controller";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";
import { initParticlesEngine } from "@tsparticles/ember/utils/init-particles-engine";
import { loadSlim } from "@tsparticles/slim";

export default class ApplicationController extends Controller {
  @tracked private engineReady = false;

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

  constructor(...args: any[]) {
    super(...args);
    if (typeof window !== "undefined") {
      void initParticlesEngine(async (engine: Engine) => {
        await loadSlim(engine);
      }).then(() => {
        this.engineReady = true;
      });
    }
  }

  @action
  private handleParticlesLoaded(container?: Container): void {
    this.container = container;
    console.log("Partículas carregadas no container:", container?.id);
  }
}
```

```hbs
{{! app/templates/application.hbs }}

{{#if this.engineReady}}
  <div class="app-container">
    <h1>tsParticles + Ember</h1>
    <Particles @options={{this.options}} @particlesLoaded={{this.handleParticlesLoaded}} />
  </div>
{{else}}
  <div class="loading">
    <p>Inicializando motor de partículas...</p>
  </div>
{{/if}}
```

---

Você tem agora tudo que precisa para integrar tsParticles em uma aplicação Ember.js. Cada exemplo é autocontido e pronto para ser copiado para o seu projeto.
