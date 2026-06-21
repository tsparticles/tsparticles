# Contexte et toile

Cette section contrôle le calque de canevas et le comportement en plein écran.

## Propriétés principales

- `background.color`
- `background.opacity`
- `background.image`
- `background.position`
- `background.repeat`
- `background.size`

## `background`

```ts
background: {
  color: "#0b1020",
  image: "",
  position: "50% 50%",
  repeat: "no-repeat",
  size: "cover"
}
```

- `color` : couleur de fond de la toile.
- `opacity` : canal alpha pour le calque d'arrière-plan.
- `image` : image de fond optionnelle.
- `position`, `repeat`, `size` : comportement de type CSS.
- `element` : sélecteur CSS, `HTMLCanvasElement` ou `OffscreenCanvas` optionnel pour le draw callback. S'il est omis, le canvas des particules est utilisé.
- `draw` : callback optionnel par frame `(context, delta) => void` pour le rendu personnalisé de l'arrière-plan.

## `fullScreen`

```ts
fullScreen: {
  enable: true,
  zIndex: -1
}
```

- `enable` : rend la fenêtre d'affichage complète du canevas.
- `zIndex` : utile pour placer des particules derrière votre contenu.

Pour les terrains de jeux intégrés et les aperçus de documents en ligne, définissez :

```ts
fullScreen: {
  enable: false,
}
```

## `detectRetina`

```ts
detectRetina: true;
```

Améliore le rendu sur les écrans HiDPI, mais augmente la charge GPU/CPU.

## Notes pratiques

- Pour les pages de destination, utilisez `fullScreen.enable: true` avec `zIndex: -1`.
- Si vous constatez des ralentissements sur mobile, essayez `detectRetina: false`.
- Si une configuration est conçue pour le plein écran, désactivez `fullScreen` avant de l'intégrer dans une section délimitée.
