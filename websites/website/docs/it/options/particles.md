# Particelle

Le opzioni all'interno di `particles` controllano l'aspetto e il movimento delle particelle.

## Gruppi più utilizzati

- `particles.number`
- `particles.move`
- `particles.links`
- `particles.palette`
- `particles.paint`
- `particles.shape`
- `particles.size`
- `particles.opacity`

Vedi le pagine dettagliate:

- [`Particles Number`](/it/options/particles-number)
- [`Particles Move`](/it/options/particles-move)
- [`Particles Links`](/it/options/particles-links)
- [`Particles Palette`](/it/options/particles-palette)
- [`Particles Paint`](/it/options/particles-paint)
- [`Particles Shape`](/it/options/particles-shape)

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

- `value`: conteggio delle particelle di base.
- `density.enable`: adatta il conteggio alla dimensione del contenitore.

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

- `speed`: velocità di movimento percepita.
- `outModes.default`: comportamento dei bordi (`out`, `bounce`, ...).

## `particles.links`

```ts
links: {
  enable: true,
  distance: 140,
  opacity: 0.28,
  color: "#7aa0ff"
}
```

Abilita i collegamenti tra le particelle, utili per le sezioni eroe "di rete".

## `particles.palette`

```ts
palette: "sunset";
```

- Importa i colori e fonde le impostazioni predefinite da un ID tavolozza registrato.
- Popola `paint.fill` o `paint.stroke` automaticamente a seconda della tavolozza.
- Con tavolozze multi-variante, `paint` viene caricato come un array di varianti.
- Utile con preimpostazioni e demo quando desideri cambiare rapidamente l'umore del colore.

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

- `shape.type`: singolo tipo o elenco di tipi.
- `size.value`: intervallo consigliato per variazione naturale.
- `opacity.value`: trasparenza media.

## Gruppi avanzati da controllare successivamente

- `particles.collisions`
- `particles.life`
- `particles.orbit`
- `particles.roll`
- `particles.rotate`
- `particles.tilt`
- `particles.twinkle`
- `particles.wobble`

Pagine dettagliate:

- [`Particles Bounce`](/it/options/particles-bounce)
- [`Particles Paint`](/it/options/particles-paint)
- [`Particles Destroy`](/it/options/particles-destroy)
- [`Particles Group`](/it/options/particles-group)
- [`Particles Collisions`](/it/options/particles-collisions)
- [`Particles Life`](/it/options/particles-life)
- [`Particles Palette`](/it/options/particles-palette)
- [`Particles Opacity`](/it/options/particles-opacity)
- [`Particles Orbit`](/it/options/particles-orbit)
- [`Particles Repulse`](/it/options/particles-repulse)
- [`Particles Roll`](/it/options/particles-roll)
- [`Particles Rotate`](/it/options/particles-rotate)
- [`Particles Shadow`](/it/options/particles-shadow)
- [`Particles Size`](/it/options/particles-size)
- [`Particles Tilt`](/it/options/particles-tilt)
- [`Particles Twinkle`](/it/options/particles-twinkle)
- [`Particles Wobble`](/it/options/particles-wobble)
- [`Particles ZIndex`](/it/options/particles-zindex)
- [`Particles Move`](/it/options/particles-move)
- [`Particles Number`](/it/options/particles-number)
- [`Particles Links`](/it/options/particles-links)
- [`Particles Shape`](/it/options/particles-shape)

Pagine di origine: <https://github.com/tsparticles/tsparticles/tree/main/markdown/Options/Particles>
