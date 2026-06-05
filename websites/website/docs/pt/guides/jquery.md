# Integração jQuery

Integre tsParticles nos seus projetos baseados em jQuery com o wrapper oficial do plugin jQuery.

## Instalação

### Via CDN

Inclua jQuery, tsParticles e o plugin jQuery através de tags script:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.0/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/tsparticles@4/tsparticles.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/jquery@4/tsparticles.jquery.min.js"></script>
```

---

### Via npm + Build

Instale os pacotes necessários:

```bash
npm install jquery @tsparticles/jquery tsparticles
```

Importe para o seu projeto:

```javascript
import $ from "jquery";
import "@tsparticles/jquery";
```

## Inicialização do Motor

Antes que as partículas possam ser renderizadas, o motor tsParticles deve ser inicializado com as funcionalidades necessárias. Isso é feito via `$.particles.init`:

```javascript
(async () => {
  await $.particles.init(async (engine) => {
    const { loadFull } = await import("tsparticles");
    await loadFull(engine);
  });
})();
```

> **Por que isso é necessário?** tsParticles usa uma arquitetura modular. `loadFull` registra todas as formas, interações e atualizadores integrados. Você pode importar bundles menores (ex.: `tsparticles-slim`) para reduzir o tamanho do bundle.

## Uso Básico

Uma vez que o motor está inicializado e o DOM está pronto, selecione um elemento container e chame `.particles().load()`:

```javascript
$(document).ready(async () => {
  await $.particles.init(async (engine) => {
    const { loadFull } = await import("tsparticles");
    await loadFull(engine);
  });

  $("#tsparticles")
    .particles()
    .load({
      background: {
        color: "#0d47a1",
      },
      particles: {
        number: { value: 80 },
        links: { enable: true, color: "#ffffff" },
        move: { enable: true },
      },
    });
});
```

O elemento container deve existir no DOM:

```html
<div id="tsparticles"></div>
```

## Configuração Personalizada

O método `.load()` aceita o objeto `ISourceOptions` completo. Aqui está um exemplo abrangente:

```javascript
$("#tsparticles")
  .particles()
  .load({
    background: {
      color: "#000000",
    },
    fpsLimit: 120,
    particles: {
      color: {
        value: ["#ff0000", "#00ff00", "#0000ff"],
      },
      move: {
        direction: "none",
        enable: true,
        outModes: "bounce",
        speed: 4,
      },
      number: {
        density: {
          enable: true,
        },
        value: 60,
      },
      opacity: {
        value: 0.6,
      },
      shape: {
        type: ["circle", "square", "triangle"],
      },
      size: {
        value: { min: 2, max: 8 },
      },
      links: {
        enable: true,
        distance: 150,
        color: "#ffffff",
        opacity: 0.4,
        width: 1,
      },
    },
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: "repulse",
        },
      },
      modes: {
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 200,
        },
      },
    },
  });
```

## Carregamento de Presets

Se você instalou um pacote de preset (ex.: `tsparticles-preset-stars`), carregue-o durante a inicialização do motor e referencie-o na configuração:

```bash
npm install tsparticles-preset-stars
```

```javascript
(async () => {
  await $.particles.init(async (engine) => {
    const { loadStarsPreset } = await import("tsparticles-preset-stars");
    await loadStarsPreset(engine);
  });

  $("#tsparticles")
    .particles()
    .load({
      preset: "stars",
      background: { color: "#0d47a1" },
    });
})();
```

## Manipulação de Eventos e Controle do Container

`.particles()` retorna uma instância do plugin jQuery. Para acessar o `Container` subjacente do tsParticles e chamar métodos como `play()`, `pause()` ou `destroy()`:

```javascript
const $container = $("#tsparticles");

// Carregar partículas
$container.particles().load({
  /* opções */
});

// Tocar/pausar após alguns segundos
setTimeout(() => {
  const container = $container.particles().getContainer();
  container?.pause();
}, 5000);
```

## Exemplo Completo

Abaixo está uma página HTML completa e autocontida que carrega tsParticles via CDN e renderiza uma cena de partículas com efeitos interativos:

```html
<!DOCTYPE html>
<html lang="pt">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>tsParticles + jQuery</title>
    <style>
      #tsparticles {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: #0d47a1;
      }
    </style>
  </head>
  <body>
    <div id="tsparticles"></div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.0/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/tsparticles@4/tsparticles.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@tsparticles/jquery@4/tsparticles.jquery.min.js"></script>
    <script>
      $(document).ready(async () => {
        await $.particles.init(async (engine) => {
          await tsParticles.loadFull(engine);
        });

        $("#tsparticles")
          .particles()
          .load({
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
            background: { color: "#0d47a1" },
          });
      });
    </script>
  </body>
</html>
```

## Referência da API

| Método                             | Descrição                                               |
| ---------------------------------- | ------------------------------------------------------- |
| `$.particles.init(fn)`             | Inicializar o motor com um callback de carregamento     |
| `$(el).particles()`                | Criar uma instância do plugin de partículas no elemento |
| `$(el).particles().load(opts)`     | Carregar e iniciar a configuração de partículas         |
| `$(el).particles().destroy()`      | Destruir a instância de partículas e limpar             |
| `$(el).particles().getContainer()` | Retornar o `Container` subjacente para controle imperativo |
