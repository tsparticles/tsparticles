# Particules de peinture

`particles.paint` regroupe les options de remplissage de particules et de style de trait.

## Exemple

```ts
particles: {
  paint: {
    fill: {
      enable: true,
      color: {
        value: ["#60a5fa", "#a78bfa", "#f472b6"],
      },
    },
    stroke: {
      width: 1,
      color: {
        value: "#ffffff",
      },
    },
  },
}
```

## Remplir (`particles.paint.fill`)

- Définit la couleur intérieure des particules.
- Prend en charge les valeurs statiques, les tableaux et l'animation couleur.

## AVC (`particles.paint.stroke`)

- Définit la largeur et la couleur du contour.
- Utile pour augmenter le contraste des formes.

## Référence source

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Paint.md>
