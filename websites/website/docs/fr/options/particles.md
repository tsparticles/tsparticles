# Particles

Options inside `particles` control particle appearance and movement.

## Most-used groups

- `particles.number`
- `particles.move`
- `particles.links`
- `particles.palette`
- `particles.paint`
- `particles.shape`
- `particles.size`
- `particles.opacity`

See detailed pages:

- [`Particles Number`](/options/particles-number)
- [`Particles Move`](/options/particles-move)
- [`Particles Links`](/options/particles-links)
- [`Particles Palette`](/options/particles-palette)
- [`Particles Paint`](/options/particles-paint)
- [`Particles Shape`](/options/particles-shape)

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

- `value`: base particle count.
- `density.enable`: adapts count to the container size.

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

- `speed`: perceived movement speed.
- `outModes.default`: edge behavior (`out`, `bounce`, ...).

## `particles.links`

```ts
links: {
  enable: true,
  distance: 140,
  opacity: 0.28,
  color: "#7aa0ff"
}
```

Enables links between particles, useful for "network" hero sections.

## `particles.palette`

```ts
palette: "sunset";
```

- Imports colors and blend defaults from a registered palette id.
- Populates `paint.fill` or `paint.stroke` automatically depending on the palette.
- With multi-variant palettes, `paint` is loaded as an array of variants.
- Useful with presets and demos when you want to swap color mood quickly.

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

- `shape.type`: single type or list of types.
- `size.value`: recommended range for natural variation.
- `opacity.value`: average transparency.

## Advanced groups to check next

- `particles.collisions`
- `particles.life`
- `particles.orbit`
- `particles.roll`
- `particles.rotate`
- `particles.tilt`
- `particles.twinkle`
- `particles.wobble`

Detailed pages:

- [`Particles Bounce`](/options/particles-bounce)
- [`Particles Paint`](/options/particles-paint)
- [`Particles Destroy`](/options/particles-destroy)
- [`Particles Group`](/options/particles-group)
- [`Particles Collisions`](/options/particles-collisions)
- [`Particles Life`](/options/particles-life)
- [`Particles Palette`](/options/particles-palette)
- [`Particles Opacity`](/options/particles-opacity)
- [`Particles Orbit`](/options/particles-orbit)
- [`Particles Repulse`](/options/particles-repulse)
- [`Particles Roll`](/options/particles-roll)
- [`Particles Rotate`](/options/particles-rotate)
- [`Particles Shadow`](/options/particles-shadow)
- [`Particles Size`](/options/particles-size)
- [`Particles Tilt`](/options/particles-tilt)
- [`Particles Twinkle`](/options/particles-twinkle)
- [`Particles Wobble`](/options/particles-wobble)
- [`Particles ZIndex`](/options/particles-zindex)
- [`Particles Move`](/options/particles-move)
- [`Particles Number`](/options/particles-number)
- [`Particles Links`](/options/particles-links)
- [`Particles Shape`](/options/particles-shape)

Source pages: <https://github.com/tsparticles/tsparticles/tree/main/markdown/Options/Particles>
