# Performance Guide

Here are the main levers to avoid FPS drops.

## 1. Particle count

```ts
particles: {
  number: {
    value: 50,
    density: {
      enable: true,
      area: 900
    }
  }
}
```

Fewer particles = fewer draw calls and fewer collisions.

## 2. Movement and links

- Reduce `move.speed` when you do not need an energetic effect.
- Limit `links.distance` and `links.opacity`.
- Avoid heavy combinations (for example `links` + `collisions` + advanced effects) in fullscreen.

## 3. Interactivity

- Keep only a few active modes.
- On mobile, consider disabling hover mode.

## 4. Retina and resize

```ts
detectRetina: false;
```

Useful in performance-first contexts or on weaker devices.

## 5. Manual lifecycle control

For expensive sections, use explicit controls:

- `start` on user click
- `stop`/`pause` when the section is not visible
- `destroy` on page/component teardown
