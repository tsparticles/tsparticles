# Bundle : All

`@tsparticles/all` charge **tout** le dépôt tsParticles : chaque forme, interaction, updater, effet, chemin, easing, plugin et exportation. C'est le plus gros bundle, conçu pour le prototypage et les démos.

## Fonctionnalités incluses

Hérite de tout `tsparticles` (full) plus :

**Toutes les formes :** arrow, cards, cog, heart, infinity, matrix, path, ribbon, rounded-polygon, rounded-rect, spiral, squircle

**Toutes les interactions :** cannon, light, particle, pop, particles-repulse

**Tous les effets :** bubble, filter, particles, shadow, trail

**Tous les générateurs de path :** branches, brownian, curl-noise, curves, fractal-noise, grid, levy, perlin-noise, polygon, random, simplex-noise, spiral, svg, zig-zag

**Tous les easing :** back, bounce, circ, cubic, elastic, expo, gaussian, linear, quad, quart, quint, sigmoid, sine, smoothstep

**Tous les plugins couleur :** HEX, HSL, RGB, HSV, HWB, LAB, LCH, Named, OKLAB, OKLCH

**Tous les plugins :** absorbers, background-mask, canvas-mask, emitters (avec toutes les formes), easing (tous), export-image, export-json, export-video, infection, manual-particles, motion, poisson-disc, polygon-mask, responsive, sounds, themes, trail, zoom

**Tous les updaters :** destroy, gradient, life, opacity, orbit, out-modes, paint, roll, rotate, size, tilt, twinkle, wobble

## Quand l'utiliser

- Prototypage rapide pour explorer les possibilités
- Démonstrations et vitrines
- Environnements de développement où la taille n'a pas d'importance
- **Déconseillé en production** : préférez des bundles plus ciblés

## Installation

### Avec npm/pnpm/yarn

```bash
pnpm add @tsparticles/engine @tsparticles/all
```

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadAll } from "@tsparticles/all";

await loadAll(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    background: { color: "#000" },
    particles: {
      number: { value: 100 },
      shape: { type: "heart" },
      move: { enable: true, speed: 2 },
    },
  },
});
```

### Avec CDN (balise `<script>`)

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/all@4/tsparticles.all.bundle.min.js"></script>
<script>
  (async () => {
    await loadAll(tsParticles);

    await tsParticles.load({
      id: "tsparticles",
      options: {
        particles: {
          number: { value: 100 },
          move: { enable: true, speed: 2 },
        },
      },
    });
  })();
</script>
```

## Différence entre `tsparticles` et `@tsparticles/all`

Voir le tableau complet sur la page [bundles-full](/fr/guide/bundles-full) pour la comparaison détaillée.

## Erreurs courantes

- L'utiliser en production — préférez `@tsparticles/slim` ou `tsparticles` pour des bundles plus petits.
- Appeler `tsParticles.load()` avant `loadAll(tsParticles)`.

## Voir aussi

- [Vue d'ensemble des bundles](/fr/guide/bundles)
- [Guide d'installation](/fr/guide/installation)
