# Web Components

Use tsParticles com Web Components nativos através do pacote `@tsparticles/webcomponents`. Esta abordagem não requer framework — apenas JavaScript puro e elementos personalizados.

## Instalação

### Via CDN

Inclua o núcleo tsParticles e o bundle de Web Components:

```html
<script src="https://cdn.jsdelivr.net/npm/tsparticles@4/tsparticles.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/webcomponents@4/tsparticles.webcomponents.min.js"></script>
```

### Via npm + Build

```bash
npm install @tsparticles/webcomponents tsparticles
```

Em seguida, importe para o seu bundle JavaScript:

```javascript
import { initParticlesEngine, defineParticlesElement } from "@tsparticles/webcomponents";
```

## Inicialização do Motor

Antes que o elemento `<web-particles>` possa renderizar, o motor deve ser inicializado com as funcionalidades necessárias. Chame `initParticlesEngine` com um callback que carrega os plugins desejados:

```javascript
import { initParticlesEngine } from "@tsparticles/webcomponents";

const { loadFull } = await import("tsparticles");

await initParticlesEngine(async (engine) => {
  await loadFull(engine);
});
```

> **Por que `loadFull`?** Ele registra todas as formas integradas (círculo, quadrado, polígono, imagem, etc.), interações (hover, clique) e atualizadores (opacidade, tamanho, cor, etc.). Para um bundle menor, use `tsparticles-slim` ou escolha plugins individuais.

## Definindo o Elemento Personalizado

Após a inicialização do motor, registre o elemento personalizado `<web-particles>`:

```javascript
import { defineParticlesElement } from "@tsparticles/webcomponents";

defineParticlesElement();
```

Isso registra a tag `web-particles` no `CustomElementRegistry` do navegador. É seguro chamar múltiplas vezes — registros duplicados são ignorados.

## Uso Básico

Uma vez que tanto `initParticlesEngine` quanto `defineParticlesElement` foram executados, use o elemento diretamente no HTML:

```html
<!DOCTYPE html>
<html lang="pt">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>tsParticles Web Components</title>
  </head>
  <body>
    <web-particles id="tsparticles"></web-particles>

    <script type="module">
      import { initParticlesEngine, defineParticlesElement } from "@tsparticles/webcomponents";

      const { loadFull } = await import("tsparticles");

      await initParticlesEngine(async (engine) => {
        await loadFull(engine);
      });

      defineParticlesElement();

      const el = document.getElementById("tsparticles");
      el.options = {
        background: { color: "#0d47a1" },
        particles: {
          number: { value: 80 },
          links: { enable: true, color: "#ffffff" },
          move: { enable: true, speed: 2 },
        },
      };
    </script>
  </body>
</html>
```

## Configuração Personalizada

O elemento `<web-particles>` aceita configuração via propriedade `options` (objeto JavaScript) ou via JSON no atributo `options`.

### Via Propriedade JavaScript

```javascript
const el = document.querySelector("web-particles");
el.options = {
  background: { color: "#000000" },
  fpsLimit: 60,
  particles: {
    color: { value: ["#ff0000", "#00ff00", "#0000ff"] },
    links: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
    },
    move: {
      enable: true,
      speed: 3,
      outModes: "bounce",
    },
    number: { value: 60 },
    opacity: { value: 0.6 },
    shape: { type: ["circle", "square"] },
    size: { value: { min: 2, max: 6 } },
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: "repulse" },
      onClick: { enable: true, mode: "push" },
    },
    modes: {
      repulse: { distance: 200 },
      push: { quantity: 4 },
    },
  },
};
```

### Via Atributo HTML (JSON)

```html
<web-particles
  id="tsparticles"
  options='{
    "background": { "color": "#0d47a1" },
    "particles": {
      "number": { "value": 50 },
      "links": { "enable": true, "color": "#ffffff" },
      "move": { "enable": true, "speed": 2 }
    }
  }'
></web-particles>
```

> Ao usar o atributo `options`, o valor deve ser JSON válido. A atribuição de propriedade é preferida para configurações complexas.

## Criação Dinâmica

Você pode criar elementos `<web-particles>` inteiramente em JavaScript e adicioná-los ao DOM a qualquer momento:

```javascript
import { initParticlesEngine, defineParticlesElement } from "@tsparticles/webcomponents";

const { loadFull } = await import("tsparticles");

await initParticlesEngine(async (engine) => {
  await loadFull(engine);
});

defineParticlesElement();

function createParticles(container, config) {
  const el = document.createElement("web-particles");
  el.id = "dynamic-particles";
  el.style.position = "absolute";
  el.style.width = "100%";
  el.style.height = "100%";
  el.style.top = "0";
  el.style.left = "0";
  el.options = config;
  container.appendChild(el);
  return el;
}

// Uso
const particles = createParticles(document.body, {
  background: { color: "#1a1a2e" },
  particles: {
    number: { value: 100 },
    links: { enable: true, color: "#e94560" },
    move: { enable: true, speed: 1 },
  },
});
```

## Estendendo o Elemento Personalizado

Você pode subclassificar `ParticlesElement` para criar seu próprio elemento personalizado com configuração embutida:

```javascript
import { initParticlesEngine, ParticlesElement } from "@tsparticles/webcomponents";

const { loadFull } = await import("tsparticles");

await initParticlesEngine(async (engine) => {
  await loadFull(engine);
});

class MyParticlesBackground extends ParticlesElement {
  constructor() {
    super();
    this.style.position = "fixed";
    this.style.top = "0";
    this.style.left = "0";
    this.style.width = "100%";
    this.style.height = "100%";
    this.style.zIndex = "-1";
  }

  connectedCallback() {
    this.options = {
      background: { color: "#0d47a1" },
      particles: {
        number: { value: 80 },
        links: { enable: true, color: "#ffffff" },
        move: { enable: true, speed: 2 },
      },
    };
    super.connectedCallback();
  }
}

customElements.define("my-particles-bg", MyParticlesBackground);
```

Uso:

```html
<my-particles-bg></my-particles-bg>
```

## Acesso e Controle do Container

O elemento personalizado expõe a instância `Container` do tsParticles para controle imperativo:

```javascript
const el = document.querySelector("web-particles");

// Acessar o container (disponível após connectedCallback)
const container = el.container;
container?.pause();
container?.play();

// Destruir e limpar
el.dispose();
```

## Exemplo Completo

Uma página HTML completa usando o módulo de Web Components com scripts CDN:

```html
<!DOCTYPE html>
<html lang="pt">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Demo tsParticles Web Components</title>
    <style>
      body {
        margin: 0;
        overflow: hidden;
      }
      web-particles {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }
      .content {
        position: relative;
        z-index: 1;
        color: white;
        text-align: center;
        padding-top: 20vh;
        font-family: sans-serif;
      }
    </style>
  </head>
  <body>
    <div class="content">
      <h1>tsParticles + Web Components</h1>
      <p>Elementos personalizados nativos, sem necessidade de framework.</p>
    </div>

    <web-particles id="tsparticles"></web-particles>

    <script type="module">
      import {
        initParticlesEngine,
        defineParticlesElement,
      } from "https://cdn.jsdelivr.net/npm/@tsparticles/webcomponents@4/tsparticles.webcomponents.min.js";

      const tsParticles = window.tPparticles;

      await initParticlesEngine(async (engine) => {
        await tsParticles.loadFull(engine);
      });

      defineParticlesElement();

      const el = document.getElementById("tsparticles");
      el.options = {
        background: { color: "#0d47a1" },
        fpsLimit: 60,
        particles: {
          number: { value: 100 },
          color: { value: "#ffffff" },
          links: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
          },
          move: {
            enable: true,
            speed: 2,
            outModes: "out",
          },
          size: {
            value: { min: 1, max: 4 },
          },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: "grab" },
            onClick: { enable: true, mode: "push" },
          },
          modes: {
            grab: { distance: 200, links: { opacity: 0.5 } },
            push: { quantity: 4 },
          },
        },
      };
    </script>
  </body>
</html>
```

## Referência da API

| Export / Property               | Tipo                     | Descrição                                                        |
| ------------------------------- | ------------------------ | ---------------------------------------------------------------- |
| `initParticlesEngine(callback)` | `function`               | Inicializar o motor tsParticles com carregadores de plugins      |
| `defineParticlesElement()`      | `function`               | Registrar o elemento personalizado `<web-particles>`             |
| `ParticlesElement`              | `class`                  | Classe base que você pode estender para elementos personalizados |
| `element.options`               | `ISourceOptions`         | Obter/definir o objeto de configuração das partículas            |
| `element.container`             | `Container \| undefined` | Referência somente leitura ao `Container` subjacente             |
| `element.dispose()`             | `function`               | Destruir a instância de partículas e limpar recursos             |
