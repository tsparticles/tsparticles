# Bundle : tsparticles (Full)

`tsparticles` (npm : `tsparticles`, loader : `loadFull`) est le bundle officiel complet. Il inclut toutes les fonctionnalités du bundle Slim plus les émetteurs, absorbeurs, formes de texte, animations avancées (wobble, roll, tilt, twinkle, destroy).

## Fonctionnalités incluses

Hérite de tout `@tsparticles/slim` plus :

**Formes supplémentaires :** text (texte avec polices personnalisées)

**Interactions externes supplémentaires :**

- drag (glisser les particules avec la souris)
- trail (traînée derrière la souris)

**Updaters supplémentaires :**

- destroy (destruction des particules avec animation)
- roll (roulement)
- tilt (inclinaison 3D)
- twinkle (scintillement intermittent)
- wobble (oscillation)

**Plugins :**

- absorbers (absorbeurs — trous noirs qui aspirent les particules)
- emitters (émetteurs — sources continues de particules)
- emitters-shape-circle, emitters-shape-square (formes pour émetteurs)

## Quand l'utiliser

- Besoin d'émetteurs (particules qui apparaissent en continu)
- Besoin d'absorbeurs (particules qui sont aspirées)
- Besoin de formes de texte avec polices personnalisées
- Besoin d'animations avancées (wobble, tilt, roll, twinkle)
- Bon point d'arrivée avant de passer à des plugins individuels

## Installation

### Avec npm/pnpm/yarn

```bash
pnpm add @tsparticles/engine tsparticles
```

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadFull } from "tsparticles";

await loadFull(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    background: { color: "#000" },
    particles: {
      number: { value: 50 },
      shape: { type: "text", options: { text: ["🔥", "✨", "⭐"] } },
      size: { value: 24 },
      move: { enable: true, speed: 1 },
      wobble: { enable: true, distance: 10 },
    },
    emitters: {
      direction: "top",
      rate: { quantity: 2, delay: 0.3 },
    },
  },
});
```

### Avec CDN (balise `<script>`)

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/tsparticles@4/tsparticles.bundle.min.js"></script>
<script>
  (async () => {
    await loadFull(tsParticles);

    await tsParticles.load({
      id: "tsparticles",
      options: {
        particles: {
          number: { value: 80 },
          move: { enable: true, speed: 2 },
        },
        absorbers: [{ color: "#ff0000", size: { value: 50 } }],
      },
    });
  })();
</script>
```

## Différence entre `tsparticles` et `@tsparticles/all`

| Aspect                  | `tsparticles` (full)                                    | `@tsparticles/all`                                                                   |
| ----------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Taille                  | Contenue                                                | Très grande                                                                          |
| Formes                  | circle, square, star, polygon, line, image, emoji, text | Toutes les formes (cœur, cartes, flèches, spirales, cog, rounded-rect, etc.)         |
| Interactions            | Slim + drag + trail                                     | Toutes (cannon, light, pop, particle, repulse)                                       |
| Path                    | Easing quad uniquement                                  | 14 générateurs de path                                                               |
| Effets                  | Aucun                                                   | 5 effets (bubble, filter, shadow, etc.)                                              |
| Exportations            | Aucune                                                  | Image, JSON, Video                                                                   |
| Plugins supplémentaires | absorbers, emitters                                     | Tous (sounds, themes, trail, zoom, polygon-mask, canvas-mask, background-mask, etc.) |
| Easing                  | Quad                                                    | 15 easing                                                                            |

## Erreurs courantes

- Confondre `tsparticles` avec `@tsparticles/all` — ce ne sont pas les mêmes packages.
- Appeler `tsParticles.load()` avant `loadFull(tsParticles)`.
- Le package npm est `tsparticles` (pas `@tsparticles/full`), le loader est `loadFull`.

## Voir aussi

- [Vue d'ensemble des bundles](/fr/guide/bundles)
- [Guide d'installation](/fr/guide/installation)
