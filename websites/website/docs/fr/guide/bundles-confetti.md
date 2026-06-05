# Bundle : Confetti

`@tsparticles/confetti` expose une API simplifiée pour créer des effets de confettis avec un seul appel de fonction. Ne nécessite pas d'interagir directement avec `tsParticles`.

## Fonctionnalités incluses

**Formes :** cercle, cœur, cartes (symboles français : cœurs, carreaux, trèfles, piques), emoji, images, polygone, carré, étoile

**Plugins internes :** émetteurs, motion (respecte les préférences utilisateur de réduction d'animations)

**Updaters :** life, roll, rotate, tilt, wobble

**API :** `confetti(options)` ou `confetti(canvasId, options)`

## Quand l'utiliser

- Bouton "Félicitations !" ou "Joyeux anniversaire !"
- Effet de célébration rapide
- Vous ne voulez pas configurer l'engine manuellement

## Installation

### Avec npm/pnpm/yarn

```bash
pnpm add @tsparticles/confetti
```

```ts
import { confetti } from "@tsparticles/confetti";

// Effet de base
await confetti({
  particleCount: 100,
  spread: 70,
  origin: { x: 0.5, y: 0.5 },
});

// Sur un canvas spécifique
await confetti("my-canvas-id", {
  particleCount: 50,
  angle: 90,
  spread: 45,
  colors: ["#ff0000", "#00ff00", "#0000ff"],
});
```

### Avec CDN (balise `<script>`)

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/confetti@4/tsparticles.confetti.bundle.min.js"></script>
<script>
  confetti({
    particleCount: 100,
    spread: 70,
    colors: ["#bb0000", "#ffffff"],
  });
</script>
```

### Paramètres principaux

| Paramètre | Type | Défaut | Description |
|---|---|---|---|
| `particleCount` | number | 50 | Nombre de confettis |
| `spread` | number | 60 | Angle de diffusion (degrés) |
| `angle` | number | 90 | Direction (degrés, 90 = vers le bas) |
| `startVelocity` | number | 30 | Vitesse initiale |
| `colors` | string[] | — | Couleurs des confettis |
| `origin` | { x, y } | { 0.5, 0.5 } | Point d'origine (0-1) |
| `drift` | number | 0 | Dérive horizontale |
| `shapes` | string[] | — | Formes : "circle", "heart", "square", "star", "cards" |

## Erreurs courantes

- Penser que `tsParticles` est exporté par `@tsparticles/confetti` — ce n'est pas le cas.
- Réutiliser le même ID de canvas sans le vouloir.
- Appeler `confetti` en boucle sans gérer les performances : utilisez un intervalle raisonnable ou arrêtez l'animation quand elle n'est pas nécessaire.

## Voir aussi

- [Vue d'ensemble des bundles](/fr/guide/bundles)
- [Bundle fireworks](/fr/guide/bundles-fireworks)
