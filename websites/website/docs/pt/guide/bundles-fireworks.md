# Bundle: Fireworks

`@tsparticles/fireworks` fornece uma API simplificada para criar efeitos de fogos de artifício com uma única chamada de função. Suporta sons, cores personalizadas e controle de instância (pausar/reproduzir).

## Funcionalidades incluídas

**Formas:** linha, círculo (do basic)

**Plugins internos:** emissores, emitters-shape-square, blend (mesclagem), sons

**Atualizadores:** destroy, life, paint, rotate

**API:** `fireworks(options)` — retorna uma instância controlável

## Quando usar

- Efeito de Ano Novo ou celebração
- UI de celebração
- Você não quer configurar o motor manualmente

## Instalação

### npm/pnpm/yarn

```bash
pnpm add @tsparticles/fireworks
```

```ts
import { fireworks } from "@tsparticles/fireworks";

// Efeito básico
const instance = await fireworks({
  colors: ["#ffffff", "#ff0000", "#00ff00", "#0000ff"],
  sounds: true,
});

// Controle de instância
instance?.pause();
instance?.play();

// Em um canvas específico
await fireworks("my-canvas", {
  rate: 3,
  speed: { min: 10, max: 25 },
  sounds: false,
});
```

### CDN (script tag)

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/fireworks@4/tsparticles.fireworks.bundle.min.js"></script>
<script>
  // Fogos imediatos
  fireworks();
</script>
```

### Principais parâmetros

| Parâmetro    | Tipo         | Padrão | Descrição                 |
| ------------ | ------------ | ------ | ------------------------- |
| `colors`     | string[]     | —      | Cores da explosão         |
| `rate`       | number       | —      | Fogos por segundo         |
| `speed`      | { min, max } | —      | Velocidade das partículas |
| `sounds`     | boolean      | true   | Ativar efeitos sonoros    |
| `gravity`    | number       | —      | Gravidade (padrão: 0)     |
| `opacity`    | number       | —      | Opacidade (0-1)           |
| `brightness` | { min, max } | —      | Brilho da explosão        |

## Erros comuns

- Pensar que `tsParticles` é exportado por `@tsparticles/fireworks` — não é.
- Chamar `fireworks()` em um loop sem gerenciar a instância — o efeito já é contínuo.
- Não parar a instância ao sair da página — chame `instance?.pause()` ou `instance?.stop()`.

## Veja também

- [Visão geral de bundles](/pt/guide/bundles)
- [Bundle Confetti](/pt/guide/bundles-confetti)
