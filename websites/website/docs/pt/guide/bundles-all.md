# Bundle: All

`@tsparticles/all` carrega **tudo** do repositório tsParticles: todas as formas, interações, atualizadores, efeitos, caminhos, easings, plugins e exportações. É o maior bundle, destinado à prototipagem e demonstrações.

## Funcionalidades incluídas

Herda tudo de `tsparticles` (full) mais:

**Todas as formas:** seta, cartas, engrenagem, coração, infinito, matrix, caminho, ribbon, polígono arredondado, retângulo arredondado, espiral, squircle

**Todas as interações externas:** cannon, light, particle, pop, particles-repulse

**Todos os efeitos:** bolha, filtro, partículas, sombra, trail

**Todos os geradores de caminho:** branches, brownian, curl-noise, curves, fractal-noise, grid, levy, perlin-noise, polygon, random, simplex-noise, spiral, svg, zig-zag

**Todos os easings:** back, bounce, circ, cubic, elastic, expo, gaussian, linear, quad, quart, quint, sigmoid, sine, smoothstep

**Todos os plugins de cor:** HEX, HSL, RGB, HSV, HWB, LAB, LCH, Named, OKLAB, OKLCH

**Todos os plugins:** absorvedores, background-mask, canvas-mask, emissores (todas as formas), easings (todos), export-image, export-json, export-video, infection, manual-particles, motion, poisson-disc, polygon-mask, responsive, sounds, themes, trail, zoom

**Todos os atualizadores:** destroy, gradient, life, opacity, orbit, out-modes, paint, roll, rotate, size, tilt, twinkle, wobble

## Quando usar

- Prototipagem rápida para explorar possibilidades
- Demonstrações e showcases
- Ambientes de desenvolvimento onde o tamanho não importa
- **Não recomendado para produção** — prefira bundles mais específicos

## Instalação

### npm/pnpm/yarn

```bash
pnpm add @tsparticles/engine @tsparticles/all
```

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadAll } from "@tsparticles/all";

await loadAll(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    background: { color: "#000" },
    particles: {
      number: { value: 100 },
      shape: { type: "heart" },
      move: { enable: true, speed: 2 },
    },
  },
});
```

### CDN (script tags)

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/all@4/tsparticles.all.bundle.min.js"></script>
<script>
  (async () => {
    await loadAll(tsParticles);

    await tsParticles.load({
      id: "tsparticles",
      options: {
        particles: {
          number: { value: 100 },
          move: { enable: true, speed: 2 },
        },
      },
    });
  })();
</script>
```

## Diferença entre `tsparticles` e `@tsparticles/all`

Consulte a tabela de comparação na [página bundles-full](/pt/guide/bundles-full) para a análise detalhada.

## Erros comuns

- Usar em produção — prefira `@tsparticles/slim` ou `tsparticles` para bundles menores.
- Chamar `tsParticles.load()` antes de `loadAll(tsParticles)`.

## Veja também

- [Visão geral de bundles](/pt/guide/bundles)
- [Guia de instalação](/pt/guide/installation)
