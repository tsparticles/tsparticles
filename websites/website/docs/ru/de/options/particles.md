# Partikel

Optionen in `particles` steuern das Aussehen und die Bewegung der Partikel.

## Am häufigsten verwendete Gruppen

- `particles.number`
- `particles.move`
- `particles.links`
- `particles.palette`
- `particles.paint`
- `particles.shape`
- `particles.size`
- `particles.opacity`

Siehe detaillierte Seiten:

- [`Particles Number`](/de/options/particles-number)
- [`Particles Move`](/de/options/particles-move)
- [`Particles Links`](/de/options/particles-links)
- [`Particles Palette`](/de/options/particles-palette)
- [`Particles Paint`](/de/options/particles-paint)
- [`Particles Shape`](/de/options/particles-shape)

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

- `value`: Basispartikelanzahl.
- `density.enable`: Passt die Anzahl an die Containergröße an.

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

- `speed`: wahrgenommene Bewegungsgeschwindigkeit.
- `outModes.default`: Kantenverhalten (`out`, `bounce`, ...).

## `particles.links`

```ts
links: {
  enable: true,
  distance: 140,
  opacity: 0.28,
  color: "#7aa0ff"
}
```

Ermöglicht Verknüpfungen zwischen Partikeln, nützlich für „Netzwerk“-Heldenabschnitte.

## `particles.palette`

```ts
palette: "sunset";
```

- Importiert Farben und Mischstandards von einer registrierten Paletten-ID.
- Füllt je nach Palette automatisch `paint.fill` oder `paint.stroke` aus.
- Bei Paletten mit mehreren Varianten wird `paint` als Array von Varianten geladen.
- Nützlich mit Voreinstellungen und Demos, wenn Sie die Farbstimmung schnell ändern möchten.

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

- `shape.type`: einzelner Typ oder Liste von Typen.
- `size.value`: empfohlener Bereich für natürliche Variation.
- `opacity.value`: durchschnittliche Transparenz.

## Erweiterte Gruppen, die als Nächstes überprüft werden müssen

- `particles.collisions`
- `particles.life`
- `particles.orbit`
- `particles.roll`
- `particles.rotate`
- `particles.tilt`
- `particles.twinkle`
- `particles.wobble`

Detaillierte Seiten:

- [`Particles Bounce`](/de/options/particles-bounce)
- [`Particles Paint`](/de/options/particles-paint)
- [`Particles Destroy`](/de/options/particles-destroy)
- [`Particles Group`](/de/options/particles-group)
- [`Particles Collisions`](/de/options/particles-collisions)
- [`Particles Life`](/de/options/particles-life)
- [`Particles Palette`](/de/options/particles-palette)
- [`Particles Opacity`](/de/options/particles-opacity)
- [`Particles Orbit`](/de/options/particles-orbit)
- [`Particles Repulse`](/de/options/particles-repulse)
- [`Particles Roll`](/de/options/particles-roll)
- [`Particles Rotate`](/de/options/particles-rotate)
- [`Particles Shadow`](/de/options/particles-shadow)
- [`Particles Size`](/de/options/particles-size)
- [`Particles Tilt`](/de/options/particles-tilt)
- [`Particles Twinkle`](/de/options/particles-twinkle)
- [`Particles Wobble`](/de/options/particles-wobble)
- [`Particles ZIndex`](/de/options/particles-zindex)
- [`Particles Move`](/de/options/particles-move)
- [`Particles Number`](/de/options/particles-number)
- [`Particles Links`](/de/options/particles-links)
- [`Particles Shape`](/de/options/particles-shape)

Quellseiten: <https://github.com/tsparticles/tsparticles/tree/main/markdown/Options/Particles>
