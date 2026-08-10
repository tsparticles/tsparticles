# Palette de particules

`particles.palette` importe une palette nommée et applique les couleurs par défaut des particules.

## Exemple

```ts
particles: {
  palette: "sunset",
  shape: {
    type: "circle",
  },
}
```

## Ce que ça change

- Définit `particles.paint.fill` ou `particles.paint.stroke` en fonction de la configuration de la palette.
- Si la palette comporte plusieurs variantes de couleurs, `particles.paint` est importé sous forme de tableau de variantes.
- Active `particles.blend` avec le mode de fusion de la palette.
- Maintient votre configuration compacte lors de la réutilisation des jeux de couleurs.

## Nouveau format de palette (pour les palettes personnalisées)

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

`colors` peut être :

- un seul objet variante (`{ fill?, stroke? }`)
- un tableau d'objets variantes (chaque variante peut définir `fill`, `stroke`, ou les deux)

## Remarques

- Les identifiants de palette inconnus sont ignorés.
- Les valeurs explicites `particles.paint.fill`, `particles.paint.stroke` ou `particles.blend` remplacent les valeurs par défaut importées.

## Référence source

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Palette.md>
