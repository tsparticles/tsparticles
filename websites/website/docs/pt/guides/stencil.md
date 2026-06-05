---
title: Guia Stencil
description: Guia completo para integrar tsParticles com componentes Stencil.
---

# Guia Stencil

## Índice

1. [Instalação](#instalação)
2. [Registro de Elementos Personalizados](#registro-de-elementos-personalizados)
3. [Uso Básico](#uso-básico)
4. [Inicialização do Motor](#inicialização-do-motor)
5. [Configuração Personalizada](#configuração-personalizada)
6. [Ciclo de Vida do Componente](#ciclo-de-vida-do-componente)
7. [Exemplo TypeScript](#exemplo-typescript)

---

## Instalação

Instale o wrapper Stencil e o motor tsParticles via npm:

```bash
npm install @tsparticles/stencil tsparticles
```

Opcionalmente instale um bundle de preset para reduzir a configuração manual:

```bash
npm install @tsparticles/slim
```

---

## Registro de Elementos Personalizados

O pacote `@tsparticles/stencil` fornece uma função `defineCustomElements` que registra o elemento personalizado `<stencil-particles>` no navegador. Chame-a uma vez antes de usar o componente em qualquer lugar da sua aplicação.

```tsx
import { defineCustomElements } from "@tsparticles/stencil/loader";

// Registrar o elemento <stencil-particles>
defineCustomElements();
```

Para projetos Stencil que usam lazy-loading, chame isso dentro de `componentWillLoad` ou no componente raiz da sua aplicação para garantir que o elemento esteja disponível antes da renderização.

---

## Uso Básico

Uma vez que o elemento personalizado está registrado, você pode usar `<stencil-particles>` no seu JSX com uma prop `options` e um callback `init` para carregar as funcionalidades necessárias do motor.

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

## Inicialização do Motor

A prop `init` recebe a instância do motor e permite carregar as funcionalidades necessárias. Este é o local recomendado para chamar `loadSlim`, `loadFull` ou plugins individuais de atualizadores/interações.

```tsx
import { loadSlim } from "@tsparticles/slim";
import { loadFull } from "tsparticles";
import { loadConfettiPreset } from "@tsparticles/preset-confetti";

// Opção A: leve (círculos, movimento básico, links)
init={async engine => { await loadSlim(engine); }}

// Opção B: conjunto completo de funcionalidades (todas as formas, efeitos, presets)
init={async engine => { await loadFull(engine); }}

// Opção C: presets (confete, fogos de artifício, neve, estrelas)
init={async engine => { await loadConfettiPreset(engine); }}
```

A instância do motor também é acessível após a inicialização através do atributo `container-id`, permitindo controlar programaticamente o sistema de partículas posteriormente, se necessário.

---

## Configuração Personalizada

Abaixo está uma configuração completa com interatividade, múltiplos tipos de forma e modos de hover/clique.

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

## Ciclo de Vida do Componente

No Stencil, o hook de ciclo de vida recomendado para configuração única é `componentWillLoad`. Use-o para registrar elementos personalizados e gerenciar o estado de inicialização para que o componente `<stencil-particles>` renderize apenas quando o motor estiver preparado.

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

Usar `@State()` garante que o componente re-renderize quando o motor ficar pronto, e a renderização condicional impede que o container de partículas monte antes que o elemento personalizado seja definido.

---

## Exemplo TypeScript

Aqui está um componente de aplicação Stencil completo e tipado que integra tsParticles com o preset slim, interatividade hover e um tema escuro personalizado.

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

  @Prop() readonly title: string = "Bem-vindo";

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
    console.log("Container de partículas carregado:", container?.id);
  };

  render() {
    return (
      <div class="home">
        <h1>{this.title}</h1>
        <p>Desenvolvido com tsParticles e Stencil</p>

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

O evento `particlesLoaded` é disparado quando o primeiro frame é renderizado, dando acesso à instância `Container` para controle programático (tocar, pausar, parar, alternar temas).

---

Você tem agora tudo que precisa para integrar tsParticles em uma aplicação Stencil. Cada exemplo é autocontido e pronto para ser copiado para o seu projeto.
