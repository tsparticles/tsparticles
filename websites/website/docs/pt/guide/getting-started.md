# Primeiros passos

tsParticles é uma biblioteca JavaScript/TypeScript para criar animações de partículas, confetes, fogos de artifício e muito mais. Funciona em qualquer navegador moderno e está disponível tanto como pacote npm quanto via CDN com tags `<script>`.

## Quick start

A maneira mais rápida de começar é com nossa CLI:

```bash
npm create tsparticles@latest
```

Siga os prompts interativos para escolher um modelo e framework.
Um novo projeto com tsParticles pré-configurado será criado no diretório atual.

---

## Arquitetura: engine + bundle

`@tsparticles/engine` sozinho **não faz nada visível**. Ele contém apenas o núcleo do motor (loop de animação, canvas, gerenciamento de eventos), mas **sem formas, sem interações, sem efeitos visuais**. Para ver algo, você precisa carregar pelo menos um **bundle** ou **plugins** individuais.

| Conceito                                                                                | Função                                                                           |
| --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `@tsparticles/engine`                                                                   | Motor principal. Exporta `tsParticles`, tipos, opções. Sozinho não desenha nada. |
| Bundle (`@tsparticles/basic`, `@tsparticles/slim`, etc.)                                | Pacote pré-montado que registra formas, interações e atualizadores no motor.     |
| Plugins individuais (`@tsparticles/shape-circle`, `@tsparticles/updater-opacity`, etc.) | Pacotes únicos que você pode combinar para um bundle personalizado.              |

## Escolha seu caminho

### Caminho A — npm/pnpm/yarn (projetos modernos com bundler)

Instale o motor + um bundle:

```bash
pnpm add @tsparticles/engine @tsparticles/slim
```

Depois no seu código:

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

(async () => {
  // 1. Registrar todas as funcionalidades do slim no motor
  await loadSlim(tsParticles);

  // 2. Criar a animação
  await tsParticles.load({
    id: "tsparticles", // ID do contêiner HTML
    options: {
      background: {
        color: "#0b1020",
      },
      particles: {
        number: { value: 80 },
        links: {
          enable: true,
          distance: 150,
          opacity: 0.35,
        },
        move: {
          enable: true,
          speed: 2,
        },
      },
    },
  });
})();
```

O contêiner HTML:

```html
<div id="tsparticles"></div>
```

### Caminho B — CDN com tags `<script>` (sem bundler, HTML puro)

Carregue o motor primeiro, depois o bundle. Os arquivos CDN expõem tudo em `window` — sem necessidade de `import`.

```html
<!DOCTYPE html>
<html>
  <head>
    <!-- tsParticles engine -->
    <script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
    <!-- Slim bundle (expõe loadSlim globalmente) -->
    <script src="https://cdn.jsdelivr.net/npm/@tsparticles/slim@4/tsparticles.slim.bundle.min.js"></script>
  </head>
  <body>
    <div id="tsparticles"></div>
    <script>
      (async () => {
        // loadSlim está disponível globalmente a partir do CDN
        await loadSlim(tsParticles);

        await tsParticles.load({
          id: "tsparticles",
          options: {
            background: { color: "#0b1020" },
            particles: {
              number: { value: 80 },
              links: { enable: true, distance: 150 },
              move: { enable: true, speed: 2 },
            },
          },
        });
      })();
    </script>
  </body>
</html>
```

> **Nota**: mesmo com bundles CDN você DEVE chamar `loadSlim(tsParticles)` (ou `loadBasic` / `loadFull` / `loadAll`) antes de `tsParticles.load()`. Os bundles CDN expõem a função de carga globalmente, mas NÃO a chamam automaticamente.

O mesmo padrão se aplica a `@tsparticles/basic` → `loadBasic`, `tsparticles` → `loadFull`, `@tsparticles/all` → `loadAll`.

### Caminho C — Bundles especializados com API dedicada (confete, fogos de artifício, partículas)

Alguns bundles possuem sua própria API simplificada, sem necessidade de usar `tsParticles.load()`:

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="https://cdn.jsdelivr.net/npm/@tsparticles/confetti@4/tsparticles.confetti.bundle.min.js"></script>
  </head>
  <body>
    <script>
      confetti({ particleCount: 100, spread: 70 });
    </script>
  </body>
</html>
```

O mesmo para `fireworks()`, `particles()`, `ribbons()`.

## Qual bundle escolher?

| Bundle                   | npm                      | Quando usar                                                                                                                                     |
| ------------------------ | ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `@tsparticles/basic`     | `loadBasic(tsParticles)` | Mínimo: círculos, movimento, opacidade, tamanho. Sem interações.                                                                                |
| `@tsparticles/slim`      | `loadSlim(tsParticles)`  | **Recomendado para a maioria dos projetos.** Adiciona interações (clique/passar o mouse), links entre partículas, imagens, estrelas, polígonos. |
| `tsparticles`            | `loadFull(tsParticles)`  | Conjunto completo oficial: emissores, absorvedores, formas de texto, roll, wobble, trail.                                                       |
| `@tsparticles/all`       | `loadAll(tsParticles)`   | **Tudo** no repositório: toda forma, interação, efeito, easing, caminho, exportação. Apenas para prototipagem.                                  |
| `@tsparticles/confetti`  | `confetti(options)`      | Confete em uma chamada de função. API dedicada.                                                                                                 |
| `@tsparticles/fireworks` | `fireworks(options)`     | Fogos de artifício em uma chamada de função. API dedicada.                                                                                      |
| `@tsparticles/particles` | `particles(options)`     | Fundo de partículas simplificado. API dedicada.                                                                                                 |
| `@tsparticles/ribbons`   | `ribbons(options)`       | Efeito ribbon. API dedicada.                                                                                                                    |

Mais detalhes: [`/pt/guide/bundles`](/pt/guide/bundles).

## Usando presets

O pacote `@tsparticles/configs` contém dezenas de configurações prontas (absorvedores, bolhas, neve, estrelas, gravidade, colisões, etc.).

```bash
pnpm add @tsparticles/engine @tsparticles/slim @tsparticles/configs
```

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import "@tsparticles/configs";

await loadSlim(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: { preset: "snow" },
});
```

Com CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/slim@4/tsparticles.slim.bundle.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/configs@4/tsparticles.configs.min.js"></script>
<script>
  (async () => {
    await loadSlim(tsParticles);
    tsParticles.load({ id: "tsparticles", options: { preset: "snow" } });
  })();
</script>
```

## Referências rápidas

- Documentação de opções: [`/pt/options/`](/pt/options/)
- Guia de bundles: [`/pt/guide/bundles`](/pt/guide/bundles)
- Catálogo de presets: [`/pt/demos/presets`](/pt/demos/presets)
- Catálogo de paletas: [`/pt/demos/palettes`](/pt/demos/palettes)
- Catálogo de formas: [`/pt/demos/shapes`](/pt/demos/shapes)
- Wrappers de frameworks: [`/pt/guide/wrappers`](/pt/guide/wrappers)
- Formatos de cor: [`/pt/guide/color-formats`](/pt/guide/color-formats)
- Ciclo de vida do contêiner: [`/pt/guide/container-lifecycle`](/pt/guide/container-lifecycle)
- Plugins e personalização: [`/pt/guide/plugins-customization`](/pt/guide/plugins-customization)

## Solução de problemas

| Problema                                             | Causa provável                                                  | Solução                                                                                                  |
| ---------------------------------------------------- | --------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Tela em branco, sem partículas                       | `#tsparticles` não existe no DOM ao chamar `tsParticles.load()` | Certifique-se de que a DIV exista antes do script, ou use `DOMContentLoaded`                             |
| Tela em branco, sem partículas                       | Instalou apenas `@tsparticles/engine`                           | Instale também um bundle (`@tsparticles/slim`) ou plugins — o motor sozinho não tem formas para desenhar |
| Erro "loadBasic/loadSlim/loadFull is not a function" | Bundle não instalado ou import errado                           | `pnpm add @tsparticles/slim` e importe `{ loadSlim }`                                                    |
| Partículas não se movem                              | `move.enable` não definido como `true`                          | Adicione `move: { enable: true, speed: 2 }`                                                              |
| Funcionalidade ausente (ex.: links, colisões)        | O bundle escolhido não inclui o recurso                         | Mude para um bundle mais completo (`@tsparticles/slim` ou `tsparticles`) ou instale o plugin específico  |
| Erros de tipo TypeScript                             | Versões dos pacotes dessincronizadas                            | Mantenha o motor e o bundle na mesma versão major/minor                                                  |
