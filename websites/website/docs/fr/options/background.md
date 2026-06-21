# Contexte et toile

Cette section contrôle le calque de canevas et le comportement en plein écran.

## Ordre des calques (de l'arrière vers l'avant)

1. **Arrière-plan CSS** (`color`, `image`, `position`, `repeat`, `size`) — appliqué comme style DOM du canevas
2. **`clear()`** — effacement des pixels du canevas par trame
3. **`background.element` dessin automatique** — si défini, `ctx.drawImage(element, ...)`
4. **`background.draw` callback** — si défini, appelé avec le contexte de rendu principal + delta
5. **Particules** — dessinées par-dessus

`element` et `draw` sont des **calques indépendants**. Les deux sont facultatifs et peuvent être utilisés ensemble ou séparément.

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

| Clé        | Type                                                                                         | Description                                                                                           |
| ---------- | -------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `color`    | `string` / `object`                                                                          | Couleur de fond de la toile.                                                                          |
| `opacity`  | `number`                                                                                     | Canal alpha pour la couleur de fond, de `0` à `1`.                                                    |
| `image`    | `string`                                                                                     | Valeur CSS `background-image` (ex. `url('...')`).                                                     |
| `position` | `string`                                                                                     | Valeur CSS `background-position`.                                                                     |
| `repeat`   | `string`                                                                                     | Valeur CSS `background-repeat`.                                                                       |
| `size`     | `string`                                                                                     | Valeur CSS `background-size`.                                                                         |
| `element`  | `string` / `HTMLCanvasElement` / `OffscreenCanvas` / `HTMLVideoElement` / `HTMLImageElement` | Élément externe dessiné automatiquement chaque trame via `drawImage`. Non géré par le moteur.         |
| `draw`     | `(context, delta) => void`                                                                   | Callback par trame pour le rendu personnalisé de l'arrière-plan sur le contexte principal du canevas. |

### `element`

Quand `element` est défini, le contenu visuel actuel de l'élément est dessiné sur le canevas principal chaque trame via `ctx.drawImage()`. L'élément **n'est pas géré par le moteur** — le code externe gère son rendu.

Types d'éléments pris en charge :

- `HTMLCanvasElement` / `OffscreenCanvas`
- `HTMLVideoElement` (dessine la trame actuelle)
- `HTMLImageElement`
- Chaîne de sélecteur CSS correspondant à l'un des éléments ci-dessus dans le DOM

```json
{
  "background": {
    "element": "#my-bg-canvas"
  }
}
```

```ts
// Dessiner automatiquement un élément <video> externe comme arrière-plan
tsParticles.load({
  id: "tsparticles",
  options: {
    background: {
      element: "#bg-video",
    },
  },
});
```

### `draw`

Un callback par trame pour le rendu personnalisé de l'arrière-plan. Reçoit toujours le **contexte principal du canevas** (`OffscreenCanvasRenderingContext2D | CanvasRenderingContext2D`), jamais le contexte de l'élément.

```json
{
  "background": {
    "draw": "(ctx, delta) => { ctx.fillStyle = 'blue'; ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height); }"
  }
}
```

(TypeScript utilise une référence de fonction, pas une chaîne.)

```ts
import { type BackgroundDrawContext, type IDelta } from "@tsparticles/engine";

const drawBackground = (ctx: BackgroundDrawContext, delta: IDelta): void => {
  ctx.fillStyle = "#ff0000";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};
```

### Élément + Draw combinés

Les deux couches s'exécutent indépendamment chaque trame. L'élément est dessiné en premier, puis le callback draw :

```ts
import { type BackgroundDrawContext, type IDelta } from "@tsparticles/engine";

tsParticles.load({
  id: "tsparticles",
  options: {
    background: {
      element: "#bg-canvas",
      draw: (ctx: BackgroundDrawContext, delta: IDelta) => {
        ctx.fillStyle = `rgba(0,0,0,${0.05 * delta.factor})`;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      },
    },
  },
});
```

## `fullScreen`

```ts
fullScreen: {
  enable: true,
  zIndex: -1
}
```

- `enable` : rend la fenêtre d'affichage complète du canevas.
- `zIndex` : utile pour placer des particules derrière votre contenu.

Pour les terrains de jeux intégrés et les aperçus de documents en ligne, définissez :

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
