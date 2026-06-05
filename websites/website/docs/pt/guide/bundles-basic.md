# Bundle: Basic

`@tsparticles/basic` é o bundle mais leve. Inclui apenas o essencial: círculos que se movem com opacidade e tamanho animáveis.

## Funcionalidades incluídas

**Formas:** círculo

**Atualizadores:**
- paint (cor)
- opacidade
- out-modes (comportamento ao sair da tela)
- tamanho

**Plugins:**
- move
- blend (mesclagem de cores)
- Plugins de cor HEX, HSL, RGB

**Não incluídos:**
- Interações com mouse/toque
- Links entre partículas
- Outras formas (quadrados, estrelas, imagens, polígonos, etc.)
- Emissores, absorvedores, sons
- Rotação, vida, roll, tilt, wobble

## Quando usar

- O tamanho do bundle é sua prioridade máxima
- Você só precisa de pontos se movendo
- Sem interações ou formas complexas necessárias

## Instalação

### npm/pnpm/yarn

```bash
pnpm add @tsparticles/engine @tsparticles/basic
```

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadBasic } from "@tsparticles/basic";

await loadBasic(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    background: { color: "#ffffff" },
    particles: {
      number: { value: 50 },
      color: { value: ["#5bc0eb", "#fde74c", "#9bc53d"] },
      size: {
        value: { min: 300, max: 400 },
        animation: { enable: true, speed: 100 },
      },
      move: { enable: true, speed: 10 },
    },
  },
});
```

### CDN (script tags)

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/basic@4/tsparticles.basic.bundle.min.js"></script>
<script>
  (async () => {
    await loadBasic(tsParticles);
    await tsParticles.load({
      id: "tsparticles",
      options: {
        particles: {
          number: { value: 50 },
          move: { enable: true, speed: 1.5 },
        },
      },
    });
  })();
</script>
```

## Erros comuns

- Esperar funcionalidades não incluídas (ex.: `links`, interações com mouse) — estas exigem bundles superiores.
- Chamar `tsParticles.load()` antes de `loadBasic(tsParticles)` — formas e atualizadores ainda não foram registrados.
- Instalar apenas `@tsparticles/engine` sem um bundle — o motor sozinho não desenha nada.

## Veja também

- [Visão geral de bundles](/pt/guide/bundles)
- [Guia de instalação](/pt/guide/installation)
