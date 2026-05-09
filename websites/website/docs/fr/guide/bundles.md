# Guide des bundles

Cette page vous aide a choisir le bon bundle `tsParticles` et a le configurer rapidement.

## Comparaison des packages

| Package                  | Ideal pour                                                           | Style de setup                                 |
| ------------------------ | -------------------------------------------------------------------- | ---------------------------------------------- |
| `@tsparticles/basic`     | Configurations tres legeres                                          | `tsParticles` + `await loadBasic(tsParticles)` |
| `@tsparticles/slim`      | La plupart des sites/apps                                            | `tsParticles` + `await loadSlim(tsParticles)`  |
| `tsparticles`            | Ensemble complet de fonctionnalites officielles avec controle engine | `tsParticles` + `await loadFull(tsParticles)`  |
| `@tsparticles/all`       | Toutes les fonctionnalites, prototypage rapide                       | `tsParticles` + `await loadAll(tsParticles)`   |
| `@tsparticles/confetti`  | Effets confettis en un appel                                         | `await confetti(options)`                      |
| `@tsparticles/fireworks` | Effets feux d'artifice en un appel                                   | `await fireworks(options)`                     |
| `@tsparticles/particles` | API simple pour fond de particules                                   | `await particles(options)`                     |

## Guides par bundle

- Basic: [`/guide/bundles-basic`](/fr/guide/bundles-basic)
- Slim: [`/guide/bundles-slim`](/fr/guide/bundles-slim)
- tsparticles (Full): [`/guide/bundles-full`](/fr/guide/bundles-full)
- All: [`/guide/bundles-all`](/fr/guide/bundles-all)
- Confetti: [`/guide/bundles-confetti`](/fr/guide/bundles-confetti)
- Fireworks: [`/guide/bundles-fireworks`](/fr/guide/bundles-fireworks)
- Particles: [`/guide/bundles-particles`](/fr/guide/bundles-particles)

## Installation

Installez le parcours package qui correspond a votre cas d'usage.

```bash
pnpm add @tsparticles/engine @tsparticles/basic
pnpm add @tsparticles/engine @tsparticles/slim
pnpm add @tsparticles/engine tsparticles
pnpm add @tsparticles/engine @tsparticles/all
pnpm add @tsparticles/confetti
pnpm add @tsparticles/fireworks
pnpm add @tsparticles/particles
```

Besoin de liens CDN et d'autres variantes de gestionnaires de packages ?

- Voir [`/guide/installation`](/fr/guide/installation).

## Exemples de setup

### Bundles avec engine + loader (`basic`, `slim`, `full`, `all`)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

await loadSlim(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    particles: {
      number: { value: 80 },
      move: { enable: true, speed: 2 },
    },
  },
});
```

Pour les autres presets, remplacez uniquement l'import/fonction du loader :

- `@tsparticles/basic` -> `loadBasic`
- `tsparticles` -> `loadFull`
- `@tsparticles/all` -> `loadAll`

### API ciblees (`confetti`, `fireworks`, `particles`)

```ts
import { confetti } from "@tsparticles/confetti";
import { fireworks } from "@tsparticles/fireworks";
import { particles } from "@tsparticles/particles";

await confetti({ count: 80, spread: 60 });
await fireworks({ sounds: false });
await particles({ count: 100, links: true });
```

Ces API sont ideales si vous voulez integrer rapidement sans connecter manuellement de nombreux plugins engine.

## Regles pratiques de selection

1. Commencez avec `@tsparticles/slim` dans la plupart des projets.
2. Utilisez `@tsparticles/basic` si la taille du bundle est votre priorite principale et que les fonctionnalites restent simples.
3. Utilisez `tsparticles` quand vous avez besoin d'une base full avec beaucoup de fonctionnalites et `loadFull`.
4. Utilisez `@tsparticles/all` pour le prototypage ou quand vous avez besoin de nombreuses fonctionnalites immediatement.
5. Utilisez `@tsparticles/confetti`, `@tsparticles/fireworks` ou `@tsparticles/particles` quand votre UI a besoin d'un effet cible avec un setup minimal.

## Pages associees

- Bundles cibles dans le playground : [`/playground/bundles`](/fr/playground/bundles)
- Parcours de demarrage : [`/guide/getting-started`](/fr/guide/getting-started)
- Matrice d'installation : [`/guide/installation`](/fr/guide/installation)
- Vue d'ensemble des wrappers : [`/guide/wrappers`](/fr/guide/wrappers)
