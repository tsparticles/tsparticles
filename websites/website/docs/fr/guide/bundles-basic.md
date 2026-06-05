# Bundle : Basic

`@tsparticles/basic` est le bundle le plus léger. Il inclut seulement l'essentiel : des cercles qui se déplacent avec opacité et taille animables.

## Fonctionnalités incluses

**Formes :** cercle

**Updaters (animations) :**
- paint (couleur)
- opacity (opacité)
- out-modes (comportement à la sortie de l'écran)
- size (taille)

**Plugins :**
- move (mouvement)
- blend (mélange de couleurs)
- Couleurs HEX, HSL, RGB

**N'inclut pas :**
- Interactions souris/tactile (clic, survol, etc.)
- Liens entre particules (links)
- Autres formes (carrés, étoiles, images, polygones, etc.)
- Émetteurs, absorbeurs, sons
- Rotation, vie, roulement, inclinaison, oscillation

## Quand l'utiliser

- La taille du bundle est la priorité absolue
- Seuls des points qui bougent sont nécessaires
- Pas besoin d'interactions ou de formes complexes

## Installation

### Avec npm/pnpm/yarn

```bash
pnpm add @tsparticles/engine @tsparticles/basic
```

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadBasic } from "@tsparticles/basic";

await loadBasic(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    background: { color: "#ffffff" },
    particles: {
      number: { value: 50 },
      color: { value: ["#5bc0eb", "#fde74c", "#9bc53d"] },
      size: {
        value: { min: 300, max: 400 },
        animation: { enable: true, speed: 100 },
      },
      move: { enable: true, speed: 10 },
    },
  },
});
```

### Avec CDN (balise `<script>`)

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/basic@4/tsparticles.basic.bundle.min.js"></script>
<script>
  (async () => {
    await loadBasic(tsParticles);
    await tsParticles.load({
      id: "tsparticles",
      options: {
        particles: {
          number: { value: 50 },
          move: { enable: true, speed: 1.5 },
        },
      },
    });
  })();
</script>
```

## Erreurs courantes

- Attendre des fonctionnalités qui ne sont pas incluses (ex. `links`, interactions souris), qui nécessitent des bundles supérieurs.
- Appeler `tsParticles.load()` avant `loadBasic(tsParticles)` : les formes et updaters ne sont pas encore enregistrés.
- Installer seulement `@tsparticles/engine` sans bundle : l'engine seul ne dessine rien.

## Voir aussi

- [Vue d'ensemble des bundles](/fr/guide/bundles)
- [Guide d'installation](/fr/guide/installation)
