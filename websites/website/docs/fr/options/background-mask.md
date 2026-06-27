# Masque de fond

`backgroundMask` permet aux particules de traverser ou de se mélanger à un calque d'arrière-plan masqué.

## Exemples

### Couverture statique (legacy)

```ts
backgroundMask: {
  enable: true,
  cover: {
    color: {
      value: "#0b1020",
    },
    opacity: 1,
  },
}
```

### Draw callback dynamique _(depuis 4.3.0)_

```ts
backgroundMask: {
  enable: true,
  cover: {
    draw: (ctx) => {
      const t = performance.now() * 0.001;
      ctx.fillStyle = `hsl(${(t * 30) % 360}, 70%, 50%)`;
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    },
  },
}
```

### Élément externe _(depuis 4.3.0)_

```ts
backgroundMask: {
  enable: true,
  cover: {
    element: "#myVideo",
    opacity: 0.8,
  },
}
```

## Propriétés

| Propriété   | Type                       | Description                                                        |
| ----------- | -------------------------- | ------------------------------------------------------------------ |
| `enable`    | `boolean`                  | Active le masquage du fond                                         |
| `composite` | `GlobalCompositeOperation` | Opération de composition canvas (par défaut : `"destination-out"`) |
| `cover`     | `BackgroundMaskCover`      | Configuration du couvercle                                         |

### `cover` (BackgroundMaskCover)

| Propriété | Type                                                                                         | Description                                                                                      |
| --------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `color`   | `string` / `OptionsColor`                                                                    | Couleur de couverture                                                                            |
| `image`   | `string`                                                                                     | URL de l'image de couverture                                                                     |
| `opacity` | `number`                                                                                     | Niveau alpha de couverture (0..1, par défaut : `1`)                                              |
| `element` | `string` / `HTMLCanvasElement` / `OffscreenCanvas` / `HTMLVideoElement` / `HTMLImageElement` | Élément externe ou sélecteur CSS dessiné automatiquement à chaque frame _(depuis 4.3.0)_         |
| `draw`    | `(context: BackgroundDrawContext, delta: IDelta) => void`                                    | Callback de dessin personnalisé sur le contexte canvas principal à chaque frame _(depuis 4.3.0)_ |

### Ordre des calques _(depuis 4.3.0)_

1. `clear()` — effacement des pixels du canvas
2. `cover.element` dessin automatique (si défini)
3. `cover.draw` callback (si défini)
4. Couverture statique (couleur/image) — solution de repli
5. Opération de composition globale

## Quand l'utiliser

- Effets de type projecteur.
- Sections de héros riches en contraste.
- Interactions superposées sur fond sombre.

## Référence source

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/BackgroundMask.md>
