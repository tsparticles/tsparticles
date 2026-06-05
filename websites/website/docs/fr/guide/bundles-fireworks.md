# Bundle : Fireworks

`@tsparticles/fireworks` expose une API simplifiée pour créer des effets de feux d'artifice avec un seul appel. Prend en charge les sons, les couleurs personnalisées et le contrôle de l'instance (pause/play).

## Fonctionnalités incluses

**Formes :** ligne, cercle (de basic)

**Plugins internes :** émetteurs, emitters-shape-square, blend (mélange), sons (sounds)

**Updaters :** destroy, life, paint, rotate

**API :** `fireworks(options)`, retourne une instance contrôlable

## Quand l'utiliser

- Effet Nouvel An ou fête
- UI de célébration
- Vous ne voulez pas configurer l'engine manuellement

## Installation

### Avec npm/pnpm/yarn

```bash
pnpm add @tsparticles/fireworks
```

```ts
import { fireworks } from "@tsparticles/fireworks";

// Effet de base
const instance = await fireworks({
  colors: ["#ffffff", "#ff0000", "#00ff00", "#0000ff"],
  sounds: true,
});

// Contrôle de l'instance
instance?.pause();
instance?.play();

// Sur un canvas spécifique
await fireworks("my-canvas", {
  rate: 3,
  speed: { min: 10, max: 25 },
  sounds: false,
});
```

### Avec CDN (balise `<script>`)

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/fireworks@4/tsparticles.fireworks.bundle.min.js"></script>
<script>
  // Feux d'artifice immédiats
  fireworks();
</script>
```

### Paramètres principaux

| Paramètre | Type | Défaut | Description |
|---|---|---|---|
| `colors` | string[] | — | Couleurs d'explosion |
| `rate` | number | — | Feux par seconde |
| `speed` | { min, max } | — | Vitesse des particules |
| `sounds` | boolean | true | Active les effets sonores |
| `gravity` | number | — | Gravité (défaut : 0) |
| `opacity` | number | — | Opacité (0-1) |
| `brightness` | { min, max } | — | Luminosité de l'explosion |

## Erreurs courantes

- Penser que `tsParticles` est exporté par `@tsparticles/fireworks` — ce n'est pas le cas.
- Appeler `fireworks()` en boucle sans gérer l'instance : l'effet est déjà continu, pas besoin d'intervalle.
- Ne pas arrêter l'instance quand l'utilisateur change de page : appelez `instance?.pause()` ou `instance?.stop()`.

## Voir aussi

- [Vue d'ensemble des bundles](/fr/guide/bundles)
- [Bundle confetti](/fr/guide/bundles-confetti)
