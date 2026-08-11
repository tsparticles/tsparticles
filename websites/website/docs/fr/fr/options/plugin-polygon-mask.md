# Option du plugin : Masque de polygone

`polygonMask` contraint les particules à des régions SVG ou basées sur des polygones.

## Exemple

```ts
polygonMask: {
  enable: true,
  type: "inline",
  move: {
    radius: 10,
  },
  url: "https://particles.js.org/images/smalldeer.svg",
}
```

## Remarques

- Utilisez des chemins SVG optimisés pour de meilleures performances d'exécution.
- Valider le chargement du chemin et le comportement de repli.

## Référence source

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Plugins/PolygonMask.md>
