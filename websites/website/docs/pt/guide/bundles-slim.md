# Bundle: Slim

`@tsparticles/slim` é o bundle recomendado para a maioria dos projetos. Inclui tudo o que é necessário para animações de partículas modernas com interações de mouse, múltiplas formas e links entre partículas.

## Funcionalidades incluídas

Herda tudo de `@tsparticles/basic` mais:

**Formas:** círculo, quadrado, estrela, polígono, linha, imagem, emoji

**Interações externas (mouse/toque):**

- attract
- bounce
- bubble
- connect
- destroy
- grab
- parallax
- pause
- push
- remove
- repulse
- slow

**Interações entre partículas:**

- attract
- colisões
- links (conexões entre partículas)

**Atualizadores adicionais:**

- life (ciclo de vida)
- rotate

**Plugins:**

- interatividade
- easing-quad
- Plugins de cor HEX, HSL, RGB

## Quando usar

- Ponto de partida recomendado para a maioria dos projetos
- Precisa de múltiplas formas (círculos, estrelas, polígonos, imagens)
- Precisa de interações com mouse (clique, passar, bubble, repulse)
- Precisa de links entre partículas
- Bom equilíbrio entre tamanho do bundle e funcionalidades

## Instalação

### npm/pnpm/yarn

```bash
pnpm add @tsparticles/engine @tsparticles/slim
```

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

await loadSlim(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    background: { color: "#0b1020" },
    particles: {
      number: { value: 80 },
      links: { enable: true, distance: 150 },
      move: { enable: true, speed: 2 },
      shape: { type: ["circle", "star", "square"] },
    },
  },
});
```

### CDN (script tags)

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/slim@4/tsparticles.slim.bundle.min.js"></script>
<script>
  (async () => {
    await loadSlim(tsParticles);

    await tsParticles.load({
      id: "tsparticles",
      options: {
        particles: {
          number: { value: 80 },
          links: { enable: true },
          move: { enable: true, speed: 2 },
        },
      },
    });
  })();
</script>
```

## Erros comuns

- Chamar `tsParticles.load()` antes de `loadSlim(tsParticles)`.
- Misturar versões diferentes entre o motor e o bundle — mantenha-os alinhados.
- Esperar funcionalidades de bundles superiores (emissores, absorvedores, texto, wobble) — precisa de `tsparticles` (full) ou plugins individuais.

## Veja também

- [Visão geral de bundles](/pt/guide/bundles)
- [Guia de instalação](/pt/guide/installation)
