# Bundle: Confetti

`@tsparticles/confetti` fornece uma API simplificada para criar efeitos de confete com uma única chamada de função. Sem necessidade de interagir diretamente com `tsParticles`.

## Funcionalidades incluídas

**Formas:** círculo, coração, cartas (naipes franceses: copas, ouros, paus, espadas), emoji, imagens, polígono, quadrado, estrela

**Plugins internos:** emissores, motion (respeita a preferência de movimento reduzido do usuário)

**Atualizadores:** life, roll, rotate, tilt, wobble

**API:** `confetti(options)` ou `confetti(canvasId, options)`

## Quando usar

- Botão "Parabéns!" ou "Feliz Aniversário!"
- Efeito de celebração rápido
- Você não quer configurar o motor manualmente

## Instalação

### npm/pnpm/yarn

```bash
pnpm add @tsparticles/confetti
```

```ts
import { confetti } from "@tsparticles/confetti";

// Efeito básico
await confetti({
  particleCount: 100,
  spread: 70,
  origin: { x: 0.5, y: 0.5 },
});

// Em um canvas específico
await confetti("my-canvas-id", {
  particleCount: 50,
  angle: 90,
  spread: 45,
  colors: ["#ff0000", "#00ff00", "#0000ff"],
});
```

### CDN (script tag)

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/confetti@4/tsparticles.confetti.bundle.min.js"></script>
<script>
  confetti({
    particleCount: 100,
    spread: 70,
    colors: ["#bb0000", "#ffffff"],
  });
</script>
```

### Principais parâmetros

| Parâmetro | Tipo | Padrão | Descrição |
|---|---|---|---|
| `particleCount` | number | 50 | Número de peças de confete |
| `spread` | number | 60 | Ângulo de dispersão (graus) |
| `angle` | number | 90 | Direção (graus, 90 = para baixo) |
| `startVelocity` | number | 30 | Velocidade inicial |
| `colors` | string[] | — | Cores do confete |
| `origin` | { x, y } | { 0.5, 0.5 } | Ponto de origem (0-1) |
| `drift` | number | 0 | Deriva horizontal |
| `shapes` | string[] | — | Formas: "circle", "heart", "square", "star", "cards" |

## Erros comuns

- Pensar que `tsParticles` é exportado por `@tsparticles/confetti` — não é.
- Reutilizar o mesmo ID de canvas sem intenção.
- Chamar `confetti` em um loop sem gerenciar performance — use um intervalo razoável ou pare a animação quando terminar.

## Veja também

- [Visão geral de bundles](/pt/guide/bundles)
- [Bundle Fireworks](/pt/guide/bundles-fireworks)
