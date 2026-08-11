# Paleta de Partículas

`particles.palette` importa uma paleta nomeada e aplica padrões de cores de partículas.

## Exemplo

```ts
particles: {
  palette: "sunset",
  shape: {
    type: "circle",
  },
}
```

## O que isso muda

- Define `particles.paint.fill` ou `particles.paint.stroke` com base na configuração da paleta.
- Se a paleta tiver diversas variantes de cores, `particles.paint` será importado como uma matriz de variantes.
- Habilita `particles.blend` com o modo de mesclagem de paleta.
- Mantém sua configuração compacta ao reutilizar conjuntos de cores.

## Novo formato de paleta (para paletas personalizadas)

```ts
const palette = {
  name: "My Palette",
  background: "#0b1020",
  blendMode: "screen",
  colors: {
    fill: {
      enable: true,
      value: ["#6ee7ff", "#8b5cf6", "#f472b6"],
    },
  },
};
```

`colors` pode ser:

- um único objeto variante (`{ fill?, stroke? }`)
- uma matriz de objetos variantes (cada variante pode definir `fill`, `stroke` ou ambos)

## Notas

- IDs de paleta desconhecidos são ignorados.
- Os valores `particles.paint.fill`, `particles.paint.stroke` ou `particles.blend` explícitos substituem os padrões importados.

## Referência da fonte

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Palette.md>
