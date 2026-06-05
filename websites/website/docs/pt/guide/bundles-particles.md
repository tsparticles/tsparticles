# Bundle: Particles

`@tsparticles/particles` fornece uma API simplificada para criar fundos de partículas interativos. Uma alternativa mais rica a `@tsparticles/basic` com uma API dedicada em vez de configuração manual do motor.

## Funcionalidades incluídas

**Formas:** círculo (do basic)

**Plugins internos:** interatividade (links, colisões)

**Interações:** links (conexões entre partículas), colisões

**API:** `particles(options)` ou `particles(canvasId, options)`

## Quando usar

- Fundo de partículas para um site
- Fundo com links entre partículas (efeito estilo nó)
- Você não quer configurar o motor manualmente

## Instalação

### npm/pnpm/yarn

```bash
pnpm add @tsparticles/particles
```

```ts
import { particles } from "@tsparticles/particles";

// Fundo com links
await particles({
  count: 120,
  links: true,
  color: "#ffffff",
  linksColor: "#00d8ff",
  radius: 3,
  speed: 2,
  opacity: 0.8,
});

// Em um canvas específico
await particles("my-canvas", {
  count: 80,
  shape: ["circle", "square"],
  links: true,
});

// Com cores personalizadas
await particles({
  count: 100,
  color: ["#ff6b6b", "#4ecdc4", "#45b7d1"],
  links: false,
});
```

### CDN (script tag)

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/particles@4/tsparticles.particles.bundle.min.js"></script>
<script>
  particles({
    radius: 3,
    speed: 2,
    opacity: 0.8,
    links: true,
    linksWidth: 140,
    color: "#ffffff",
    linksColor: "#00d8ff",
  });
</script>
```

### Principais parâmetros

| Parâmetro | Tipo | Padrão | Descrição |
|---|---|---|---|
| `count` | number | 50 | Número de partículas |
| `radius` | number | 3 | Raio das partículas |
| `speed` | number | 2 | Velocidade de movimento |
| `opacity` | number | 0.8 | Opacidade (0-1) |
| `color` | string \| string[] | "#ffffff" | Cor(es) das partículas |
| `links` | boolean | false | Mostrar links |
| `linksColor` | string | "#ffffff" | Cor dos links |
| `linksWidth` | number | 1 | Espessura dos links |
| `shape` | string[] | ["circle"] | Formas das partículas |

## Erros comuns

- Pensar que `tsParticles` é exportado por `@tsparticles/particles` — não é.
- Reutilizar o mesmo ID de canvas sem intenção.
- Esperar formas avançadas (estrelas, polígonos) — o bundle particles é baseado no basic e usa apenas círculos.

## Veja também

- [Visão geral de bundles](/pt/guide/bundles)
- [Primeiros passos](/pt/guide/getting-started)
