# Bundle: tsparticles (Full)

`tsparticles` (npm: `tsparticles`, loader: `loadFull`) é o bundle completo oficial. Inclui tudo do Slim mais emissores, absorvedores, formas de texto e animações avançadas (wobble, roll, tilt, twinkle, destroy).

## Funcionalidades incluídas

Herda tudo de `@tsparticles/slim` mais:

**Formas adicionais:** texto (com fontes personalizadas)

**Interações externas adicionais:**
- drag (arrastar partículas com o mouse)
- trail (rastro de partículas atrás do mouse)

**Atualizadores adicionais:**
- destroy (animação de destruição de partículas)
- roll (rolamento)
- tilt (inclinação 3D)
- twinkle (brilho intermitente)
- wobble (oscilação)

**Plugins:**
- absorbers (buracos negros que sugam partículas)
- emitters (fontes contínuas de partículas)
- emitters-shape-circle, emitters-shape-square (formas de emissores)

## Quando usar

- Precisa de emissores (partículas gerando continuamente)
- Precisa de absorvedores (partículas sendo sugadas)
- Precisa de formas de texto com fontes personalizadas
- Precisa de animações avançadas (wobble, tilt, roll, twinkle)
- Bom passo intermediário antes de ir para plugins individuais

## Instalação

### npm/pnpm/yarn

```bash
pnpm add @tsparticles/engine tsparticles
```

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadFull } from "tsparticles";

await loadFull(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    background: { color: "#000" },
    particles: {
      number: { value: 50 },
      shape: { type: "text", options: { text: ["🔥", "✨", "⭐"] } },
      size: { value: 24 },
      move: { enable: true, speed: 1 },
      wobble: { enable: true, distance: 10 },
    },
    emitters: {
      direction: "top",
      rate: { quantity: 2, delay: 0.3 },
    },
  },
});
```

### CDN (script tags)

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/tsparticles@4/tsparticles.bundle.min.js"></script>
<script>
  (async () => {
    await loadFull(tsParticles);

    await tsParticles.load({
      id: "tsparticles",
      options: {
        particles: {
          number: { value: 80 },
          move: { enable: true, speed: 2 },
        },
        absorbers: [{ color: "#ff0000", size: { value: 50 } }],
      },
    });
  })();
</script>
```

## Diferença entre `tsparticles` e `@tsparticles/all`

| Aspecto | `tsparticles` (full) | `@tsparticles/all` |
|---|---|---|
| Tamanho | Moderado | Muito grande |
| Formas | círculo, quadrado, estrela, polígono, linha, imagem, emoji, texto | Todas as formas (coração, cartas, seta, espiral, engrenagem, retângulo arredondado, etc.) |
| Interações | Slim + drag + trail | Todas (cannon, light, pop, particle, repulse) |
| Caminhos | Apenas easing quad | 14 geradores de caminho |
| Efeitos | Nenhum | 5 efeitos (bolha, filtro, sombra, etc.) |
| Exportações | Nenhuma | Imagem, JSON, Vídeo |
| Plugins extras | absorvedores, emissores | Todos (sons, temas, trail, zoom, polygon-mask, canvas-mask, background-mask, etc.) |
| Easing | Quad | 15 easings |

## Erros comuns

- Confundir `tsparticles` com `@tsparticles/all` — são pacotes diferentes.
- Chamar `tsParticles.load()` antes de `loadFull(tsParticles)`.
- O pacote npm é `tsparticles` (não `@tsparticles/full`), o loader é `loadFull`.

## Veja também

- [Visão geral de bundles](/pt/guide/bundles)
- [Guia de instalação](/pt/guide/installation)
