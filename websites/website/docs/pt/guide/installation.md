# Instalação

## Escolha seu caminho

| Cenário | Comando |
|---|---|
| Início rápido (recomendado) | `pnpm add @tsparticles/engine @tsparticles/slim` |
| Configuração mínima | `pnpm add @tsparticles/engine @tsparticles/basic` |
| Conjunto completo de funcionalidades | `pnpm add @tsparticles/engine tsparticles` |
| Tudo no repositório | `pnpm add @tsparticles/engine @tsparticles/all` |
| Apenas confete | `pnpm add @tsparticles/confetti` |
| Apenas fogos de artifício | `pnpm add @tsparticles/fireworks` |
| Fundo de partículas | `pnpm add @tsparticles/particles` |
| Efeito ribbon | `pnpm add @tsparticles/ribbons` |

> **Importante**: `@tsparticles/engine` sozinho não desenha nada. Você deve sempre adicionar um bundle (para carregar formas e animações) ou plugins individuais. Consulte o [guia de bundles](/pt/guide/bundles).

## npm

```bash
# engine + slim (recomendado para a maioria dos projetos)
npm install @tsparticles/engine @tsparticles/slim

# engine + basic (mínimo)
npm install @tsparticles/engine @tsparticles/basic

# engine + full (tsparticles)
npm install @tsparticles/engine tsparticles

# engine + all
npm install @tsparticles/engine @tsparticles/all

# Bundles com API dedicada (sem engine explícito)
npm install @tsparticles/confetti
npm install @tsparticles/fireworks
npm install @tsparticles/particles
npm install @tsparticles/ribbons
```

## yarn

```bash
yarn add @tsparticles/engine @tsparticles/slim
# ... mesmo padrão para outros bundles
```

## pnpm

```bash
pnpm add @tsparticles/engine @tsparticles/slim
# ... mesmo padrão para outros bundles
```

## CDN (script tags)

Todos os pacotes estão disponíveis no jsDelivr, unpkg e cdnjs.

### jsDelivr

| Bundle | URL |
|---|---|
| Engine | `https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js` |
| Basic | `https://cdn.jsdelivr.net/npm/@tsparticles/basic@4/tsparticles.basic.bundle.min.js` |
| Slim | `https://cdn.jsdelivr.net/npm/@tsparticles/slim@4/tsparticles.slim.bundle.min.js` |
| Full (`tsparticles`) | `https://cdn.jsdelivr.net/npm/tsparticles@4/tsparticles.bundle.min.js` |
| All | `https://cdn.jsdelivr.net/npm/@tsparticles/all@4/tsparticles.all.bundle.min.js` |
| Confetti | `https://cdn.jsdelivr.net/npm/@tsparticles/confetti@4/tsparticles.confetti.bundle.min.js` |
| Fireworks | `https://cdn.jsdelivr.net/npm/@tsparticles/fireworks@4/tsparticles.fireworks.bundle.min.js` |
| Particles | `https://cdn.jsdelivr.net/npm/@tsparticles/particles@4/tsparticles.particles.bundle.min.js` |
| Ribbons | `https://cdn.jsdelivr.net/npm/@tsparticles/ribbons@4/tsparticles.ribbons.bundle.min.js` |
| Compatibilidade particles.js | `https://cdn.jsdelivr.net/npm/@tsparticles/pjs@4/tsparticles.pjs.min.js` |

### unpkg

Mesma estrutura: `https://unpkg.com/{nome-do-pacote}@{versão}/{arquivo}`

Exemplo:
`https://unpkg.com/@tsparticles/slim@4/tsparticles.slim.bundle.min.js`

### cdnjs

`https://cdnjs.com/libraries/tsparticles`

## Exemplos de importação

### Com bundler (importação ES module)

```ts
// Engine + loader do bundle
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

await loadSlim(tsParticles);
await tsParticles.load({ id: "tsparticles", options: { ... } });
```

### Com CommonJS (require)

```ts
const { tsParticles } = require("@tsparticles/engine");
const { loadSlim } = require("@tsparticles/slim");

(async () => {
  await loadSlim(tsParticles);
  await tsParticles.load({ id: "tsparticles", options: { ... } });
})();
```

### Com CDN (script tag)

```html
<!-- 1. Engine -->
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
<!-- 2. Bundle (expõe loadBasic/loadSlim/loadFull/loadAll globalmente) -->
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/slim@4/tsparticles.slim.bundle.min.js"></script>
<!-- 3. Seu script -->
<script>
  (async () => {
    await loadSlim(tsParticles);  // registrar funcionalidades
    await tsParticles.load({
      id: "tsparticles",
      options: {
        particles: {
          number: { value: 60 },
          move: { enable: true },
        },
      },
    });
  })();
</script>
```

Com bundles de API dedicada:

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/confetti@4/tsparticles.confetti.bundle.min.js"></script>
<script>
  confetti({ particleCount: 100, spread: 70 });
</script>
```

## Páginas relacionadas

- [Primeiros passos](/pt/guide/getting-started)
- [Guia de bundles](/pt/guide/bundles)
- [Wrappers de frameworks](/pt/guide/wrappers)
