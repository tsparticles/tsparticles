# Partículas

As opções dentro de `particles` controlam a aparência e o movimento das partículas.

## Grupos mais usados

- `particles.number`
- `particles.move`
- `particles.links`
- `particles.palette`
- `particles.paint`
- `particles.shape`
- `particles.size`
- `particles.opacity`

Veja páginas detalhadas:

- [`Particles Number`](/pt/options/particles-number)
- [`Particles Move`](/pt/options/particles-move)
- [`Particles Links`](/pt/options/particles-links)
- [`Particles Palette`](/pt/options/particles-palette)
- [`Particles Paint`](/pt/options/particles-paint)
- [`Particles Shape`](/pt/options/particles-shape)

## `particles.number`

```ts
particles: {
  number: {
    value: 70,
    density: {
      enable: true,
      area: 800
    }
  }
}
```

- `value`: contagem de partículas base.
- `density.enable`: adapta a contagem ao tamanho do contêiner.

## `particles.move`

```ts
move: {
  enable: true,
  speed: 1.6,
  direction: "none",
  outModes: {
    default: "out"
  }
}
```

- `speed`: velocidade de movimento percebida.
- `outModes.default`: comportamento de borda (`out`, `bounce`, ...).

## `particles.links`

```ts
links: {
  enable: true,
  distance: 140,
  opacity: 0.28,
  color: "#7aa0ff"
}
```

Ativa links entre partículas, úteis para seções heróicas de "rede".

## `particles.palette`

```ts
palette: "sunset";
```

- Importa cores e padrões de mesclagem de um ID de paleta registrado.
- Preenche `paint.fill` ou `paint.stroke` automaticamente dependendo da paleta.
- Com paletas multivariadas, `paint` é carregado como uma matriz de variantes.
- Útil com predefinições e demonstrações quando você deseja mudar rapidamente o clima das cores.

## `particles.shape`, `size`, `opacity`

```ts
shape: {
  type: ["circle", "square"]
},
size: {
  value: {
    min: 1,
    max: 5
  }
},
opacity: {
  value: 0.7
}
```

- `shape.type`: tipo único ou lista de tipos.
- `size.value`: faixa recomendada para variação natural.
- `opacity.value`: transparência média.

## Grupos avançados para verificar a seguir

- `particles.collisions`
- `particles.life`
- `particles.orbit`
- `particles.roll`
- `particles.rotate`
- `particles.tilt`
- `particles.twinkle`
- `particles.wobble`

Páginas detalhadas:

- [`Particles Bounce`](/pt/options/particles-bounce)
- [`Particles Paint`](/pt/options/particles-paint)
- [`Particles Destroy`](/pt/options/particles-destroy)
- [`Particles Group`](/pt/options/particles-group)
- [`Particles Collisions`](/pt/options/particles-collisions)
- [`Particles Life`](/pt/options/particles-life)
- [`Particles Palette`](/pt/options/particles-palette)
- [`Particles Opacity`](/pt/options/particles-opacity)
- [`Particles Orbit`](/pt/options/particles-orbit)
- [`Particles Repulse`](/pt/options/particles-repulse)
- [`Particles Roll`](/pt/options/particles-roll)
- [`Particles Rotate`](/pt/options/particles-rotate)
- [`Particles Shadow`](/pt/options/particles-shadow)
- [`Particles Size`](/pt/options/particles-size)
- [`Particles Tilt`](/pt/options/particles-tilt)
- [`Particles Twinkle`](/pt/options/particles-twinkle)
- [`Particles Wobble`](/pt/options/particles-wobble)
- [`Particles ZIndex`](/pt/options/particles-zindex)
- [`Particles Move`](/pt/options/particles-move)
- [`Particles Number`](/pt/options/particles-number)
- [`Particles Links`](/pt/options/particles-links)
- [`Particles Shape`](/pt/options/particles-shape)

Páginas de origem: <https://github.com/tsparticles/tsparticles/tree/main/markdown/Options/Particles>
