# Particules

Les options à l’intérieur de `particles` contrôlent l’apparence et le mouvement des particules.

## Groupes les plus utilisés

- `particles.number`
- `particles.move`
- `particles.links`
- `particles.palette`
- `particles.paint`
- `particles.shape`
- `particles.size`
- `particles.opacity`

Voir les pages détaillées :

- [`Particles Number`](/fr/options/particles-number)
- [`Particles Move`](/fr/options/particles-move)
- [`Particles Links`](/fr/options/particles-links)
- [`Particles Palette`](/fr/options/particles-palette)
- [`Particles Paint`](/fr/options/particles-paint)
- [`Particles Shape`](/fr/options/particles-shape)

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

- `value` : nombre de particules de base.
- `density.enable` : adapte le comptage à la taille du conteneur.

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

- `speed` : vitesse de déplacement perçue.
- `outModes.default` : comportement des bords (`out`, `bounce`, ...).

## `particles.links`

```ts
links: {
  enable: true,
  distance: 140,
  opacity: 0.28,
  color: "#7aa0ff"
}
```

Active les liens entre les particules, utiles pour les sections héros "réseau".

## `particles.palette`

```ts
palette: "sunset";
```

- Importe les couleurs et les valeurs par défaut de mélange à partir d'un identifiant de palette enregistré.
- Remplit automatiquement `paint.fill` ou `paint.stroke` en fonction de la palette.
- Avec les palettes multi-variantes, `paint` est chargé sous forme d'un tableau de variantes.
- Utile avec les préréglages et les démos lorsque vous souhaitez changer rapidement d'ambiance de couleur.

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

- `shape.type` : type unique ou liste de types.
- `size.value` : plage recommandée pour la variation naturelle.
- `opacity.value` : transparence moyenne.

## Groupes avancés à vérifier ensuite

- `particles.collisions`
- `particles.life`
- `particles.orbit`
- `particles.roll`
- `particles.rotate`
- `particles.tilt`
- `particles.twinkle`
- `particles.wobble`

Pages détaillées :

- [`Particles Bounce`](/fr/options/particles-bounce)
- [`Particles Paint`](/fr/options/particles-paint)
- [`Particles Destroy`](/fr/options/particles-destroy)
- [`Particles Group`](/fr/options/particles-group)
- [`Particles Collisions`](/fr/options/particles-collisions)
- [`Particles Life`](/fr/options/particles-life)
- [`Particles Palette`](/fr/options/particles-palette)
- [`Particles Opacity`](/fr/options/particles-opacity)
- [`Particles Orbit`](/fr/options/particles-orbit)
- [`Particles Repulse`](/fr/options/particles-repulse)
- [`Particles Roll`](/fr/options/particles-roll)
- [`Particles Rotate`](/fr/options/particles-rotate)
- [`Particles Shadow`](/fr/options/particles-shadow)
- [`Particles Size`](/fr/options/particles-size)
- [`Particles Tilt`](/fr/options/particles-tilt)
- [`Particles Twinkle`](/fr/options/particles-twinkle)
- [`Particles Wobble`](/fr/options/particles-wobble)
- [`Particles ZIndex`](/fr/options/particles-zindex)
- [`Particles Move`](/fr/options/particles-move)
- [`Particles Number`](/fr/options/particles-number)
- [`Particles Links`](/fr/options/particles-links)
- [`Particles Shape`](/fr/options/particles-shape)

Pages sources : <https://github.com/tsparticles/tsparticles/tree/main/markdown/Options/Particles>
