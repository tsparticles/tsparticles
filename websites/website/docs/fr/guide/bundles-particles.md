# Bundle : Particles

`@tsparticles/particles` expose une API simplifiée pour créer des fonds de particules interactifs. C'est une alternative plus riche à `@tsparticles/basic` mais avec une API dédiée au lieu de configurer l'engine manuellement.

## Fonctionnalités incluses

**Formes :** cercle (de basic)

**Plugins internes :** interactivity (liens, collisions)

**Interactions :** links (liens entre particules), collisions

**API :** `particles(options)` ou `particles(canvasId, options)`

## Quand l'utiliser

- Fond de particules pour un site web
- Fond avec liens entre particules (style "nœuds")
- Vous ne voulez pas configurer l'engine manuellement

## Installation

### Avec npm/pnpm/yarn

```bash
pnpm add @tsparticles/particles
```

```ts
import { particles } from "@tsparticles/particles";

// Fond avec liens
await particles({
  count: 120,
  links: true,
  color: "#ffffff",
  linksColor: "#00d8ff",
  radius: 3,
  speed: 2,
  opacity: 0.8,
});

// Sur un canvas spécifique
await particles("my-canvas", {
  count: 80,
  shape: ["circle", "square"],
  links: true,
});

// Avec couleurs personnalisées
await particles({
  count: 100,
  color: ["#ff6b6b", "#4ecdc4", "#45b7d1"],
  links: false,
});
```

### Avec CDN (balise `<script>`)

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/particles@4/tsparticles.particles.bundle.min.js"></script>
<script>
  particles({
    radius: 3,
    speed: 2,
    opacity: 0.8,
    links: true,
    linksWidth: 140,
    color: "#ffffff",
    linksColor: "#00d8ff",
  });
</script>
```

### Paramètres principaux

| Paramètre | Type | Défaut | Description |
|---|---|---|---|
| `count` | number | 50 | Nombre de particules |
| `radius` | number | 3 | Rayon des particules |
| `speed` | number | 2 | Vitesse de déplacement |
| `opacity` | number | 0.8 | Opacité (0-1) |
| `color` | string \| string[] | "#ffffff" | Couleur(s) des particules |
| `links` | boolean | false | Afficher les liens |
| `linksColor` | string | "#ffffff" | Couleur des liens |
| `linksWidth` | number | 1 | Épaisseur des liens |
| `shape` | string[] | ["circle"] | Formes des particules |

## Erreurs courantes

- Penser que `tsParticles` est exporté par `@tsparticles/particles` — ce n'est pas le cas.
- Réutiliser le même ID de canvas sans le vouloir.
- Attendre des formes avancées (étoiles, polygones) — le bundle particles est basé sur basic et utilise seulement des cercles.

## Voir aussi

- [Vue d'ensemble des bundles](/fr/guide/bundles)
- [Guide pour démarrer](/fr/guide/getting-started)
