# Bundle : Slim

`@tsparticles/slim` est le bundle recommandé pour la plupart des projets. Il inclut tout le nécessaire pour créer des animations de particules modernes avec interactions souris, formes multiples et liens.

## Fonctionnalités incluses

Hérite de tout `@tsparticles/basic` plus :

**Formes :** cercle, carré, étoile, polygone, ligne, image, emoji

**Interactions externes (souris/tactile) :**
- attract
- bounce
- bubble
- connect
- destroy
- grab
- parallax
- pause
- push
- remove
- repulse
- slow

**Interactions entre particules :**
- attract
- collisions
- links (liens entre particules)

**Updaters supplémentaires :**
- life (vie/cycle)
- rotate (rotation)

**Plugins :**
- interactivity (plugin pour activer les interactions)
- easing-quad (easing quadratique pour les animations)
- Couleurs HEX, HSL, RGB

## Quand l'utiliser

- Point de départ recommandé pour la plupart des projets
- Besoin de formes multiples (cercles, étoiles, polygones, images)
- Besoin d'interactions souris (clic, survol, bubble, repulse)
- Besoin de liens entre particules (links)
- Bon équilibre entre taille du bundle et fonctionnalités

## Installation

### Avec npm/pnpm/yarn

```bash
pnpm add @tsparticles/engine @tsparticles/slim
```

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

await loadSlim(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    background: { color: "#0b1020" },
    particles: {
      number: { value: 80 },
      links: { enable: true, distance: 150 },
      move: { enable: true, speed: 2 },
      shape: { type: ["circle", "star", "square"] },
    },
  },
});
```

### Avec CDN (balise `<script>`)

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/slim@4/tsparticles.slim.bundle.min.js"></script>
<script>
  (async () => {
    await loadSlim(tsParticles);

    await tsParticles.load({
      id: "tsparticles",
      options: {
        particles: {
          number: { value: 80 },
          links: { enable: true },
          move: { enable: true, speed: 2 },
        },
      },
    });
  })();
</script>
```

## Erreurs courantes

- Appeler `tsParticles.load()` avant `loadSlim(tsParticles)`.
- Mélanger des versions différentes entre engine et bundle — maintenez-les alignés.
- Attendre des fonctionnalités qui sont seulement dans les bundles supérieurs (émetteurs, absorbeurs, texte, wobble) : `tsparticles` (full) ou des plugins individuels sont nécessaires.

## Voir aussi

- [Vue d'ensemble des bundles](/fr/guide/bundles)
- [Guide d'installation](/fr/guide/installation)
