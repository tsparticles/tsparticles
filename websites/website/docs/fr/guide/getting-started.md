# Mise en route

tsParticles est une bibliothèque JavaScript/TypeScript pour créer des animations de particules, confettis, feux d'artifice et bien plus. Elle fonctionne dans tous les navigateurs modernes et est disponible en package npm ou via CDN avec une balise `<script>`.

## Architecture : moteur + bundle

`@tsparticles/engine` seul **ne fait rien de visible**. Il contient uniquement le moteur interne (boucle d'animation, canvas, gestion des événements) mais **aucune forme, aucune interaction, aucun effet visuel**. Pour voir quelque chose, vous devez charger au moins un **bundle** ou des **plugins individuels**.

| Concept                                                                                 | Rôle                                                                                     |
| --------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `@tsparticles/engine`                                                                   | Moteur de base. Exporte `tsParticles`, les types, les options. Seul, il ne dessine rien. |
| Bundle (`@tsparticles/basic`, `@tsparticles/slim`, etc.)                                | Package préassemblé qui enregistre formes, interactions et updaters sur l'engine.        |
| Plugins individuels (`@tsparticles/shape-circle`, `@tsparticles/updater-opacity`, etc.) | Packages individuels à combiner pour un bundle personnalisé.                             |

## Choisissez votre parcours

### Parcours A — npm/pnpm/yarn (projets modernes avec bundler)

Installez le moteur + un bundle :

```bash
pnpm add @tsparticles/engine @tsparticles/slim
```

Puis dans votre code :

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

(async () => {
  // 1. Enregistre toutes les fonctionnalités du bundle slim sur l'engine
  await loadSlim(tsParticles);

  // 2. Crée l'animation
  await tsParticles.load({
    id: "tsparticles", // ID du conteneur HTML
    options: {
      background: {
        color: "#0b1020",
      },
      particles: {
        number: { value: 80 },
        links: {
          enable: true,
          distance: 150,
          opacity: 0.35,
        },
        move: {
          enable: true,
          speed: 2,
        },
      },
    },
  });
})();
```

Le conteneur HTML :

```html
<div id="tsparticles"></div>
```

### Parcours B — CDN avec balise `<script>` (pas de bundler, HTML vanilla)

Chargez d'abord l'engine, puis le bundle. Les fichiers CDN exposent tout sur `window` — pas besoin d'`import`.

```html
<!DOCTYPE html>
<html>
  <head>
    <!-- tsParticles engine -->
    <script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
    <!-- Bundle slim (expose loadSlim globalement) -->
    <script src="https://cdn.jsdelivr.net/npm/@tsparticles/slim@4/tsparticles.slim.bundle.min.js"></script>
  </head>
  <body>
    <div id="tsparticles"></div>
    <script>
      (async () => {
        // loadSlim est disponible globalement après avoir chargé le bundle CDN
        await loadSlim(tsParticles);

        await tsParticles.load({
          id: "tsparticles",
          options: {
            background: { color: "#0b1020" },
            particles: {
              number: { value: 80 },
              links: { enable: true, distance: 150 },
              move: { enable: true, speed: 2 },
            },
          },
        });
      })();
    </script>
  </body>
</html>
```

> **Note** : même avec les bundles CDN, vous devez appeler `loadSlim(tsParticles)` (ou `loadBasic` / `loadFull` / `loadAll`) avant d'utiliser `tsParticles.load()`. Les bundles CDN exposent la fonction de loader globalement mais ne l'appellent pas automatiquement.

Le même schéma s'applique pour `@tsparticles/basic` → `loadBasic`, `tsparticles` → `loadFull`, `@tsparticles/all` → `loadAll`.

### Parcours C — Bundles spécialisés avec API dédiée (confettis, feux d'artifice, particules)

Certains bundles ont leur propre API simplifiée, sans passer par `tsParticles.load()` :

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="https://cdn.jsdelivr.net/npm/@tsparticles/confetti@4/tsparticles.confetti.bundle.min.js"></script>
  </head>
  <body>
    <script>
      confetti({ particleCount: 100, spread: 70 });
    </script>
  </body>
</html>
```

Même chose pour `fireworks()`, `particles()`, `ribbons()`.

## Quel bundle choisir ?

| Bundle                   | npm                      | Quand l'utiliser                                                                                                                             |
| ------------------------ | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `@tsparticles/basic`     | `loadBasic(tsParticles)` | Minimum vital : cercles, mouvement, opacité, taille.                                                                                         |
| `@tsparticles/slim`      | `loadSlim(tsParticles)`  | **Choix recommandé pour la plupart des projets.** Ajoute les interactions (clic/survol), liens entre particules, images, étoiles, polygones. |
| `tsparticles`            | `loadFull(tsParticles)`  | Ensemble complet de fonctionnalités officielles : émetteurs, absorbeurs, formes texte, roll, wobble, trail.                                  |
| `@tsparticles/all`       | `loadAll(tsParticles)`   | **Tout** le dépôt : chaque forme, interaction, effet, easing, chemin, export. Pour prototypage uniquement.                                   |
| `@tsparticles/confetti`  | `confetti(options)`      | Confettis en un appel. API dédiée.                                                                                                           |
| `@tsparticles/fireworks` | `fireworks(options)`     | Feux d'artifice en un appel. API dédiée.                                                                                                     |
| `@tsparticles/particles` | `particles(options)`     | Fond de particules simplifié. API dédiée.                                                                                                    |
| `@tsparticles/ribbons`   | `ribbons(options)`       | Effet rubans. API dédiée.                                                                                                                    |

Plus de détails : [`/guide/bundles`](/fr/guide/bundles).

## Utiliser des préréglages prédéfinis

Le package `@tsparticles/configs` contient des dizaines de configurations prêtes à l'emploi (absorbeurs, bulles, neige, étoiles, gravité, collisions, etc.).

```bash
pnpm add @tsparticles/engine @tsparticles/slim @tsparticles/configs
```

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import "@tsparticles/configs";

await loadSlim(tsParticles);

// Charge un préréglage par nom
await tsParticles.load({
  id: "tsparticles",
  options: { preset: "snow" },
});
```

Avec CDN :

```html
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@4/tsparticles.engine.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/slim@4/tsparticles.slim.bundle.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsparticles/configs@4/tsparticles.configs.min.js"></script>
<script>
  (async () => {
    await loadSlim(tsParticles);
    tsParticles.load({ id: "tsparticles", options: { preset: "snow" } });
  })();
</script>
```

## Références rapides

- Documentation des options : [`/options/`](/fr/options/)
- Guide des bundles : [`/guide/bundles`](/fr/guide/bundles)
- Catalogue de préréglages : [`/demos/presets`](/fr/demos/presets)
- Catalogue de palettes : [`/demos/palettes`](/fr/demos/palettes)
- Catalogue de formes : [`/demos/shapes`](/fr/demos/shapes)
- Wrappers pour frameworks : [`/guide/wrappers`](/fr/guide/wrappers)
- Formats couleur : [`/guide/color-formats`](/fr/guide/color-formats)
- Cycle de vie du conteneur : [`/guide/container-lifecycle`](/fr/guide/container-lifecycle)
- Plugins et personnalisation : [`/guide/plugins-customization`](/fr/guide/plugins-customization)

## Résolution des problèmes

| Problème                                               | Cause probable                                                                  | Solution                                                                                                                  |
| ------------------------------------------------------ | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Écran blanc, aucune particule                          | `#tsparticles` n'existe pas dans le DOM quand vous appelez `tsParticles.load()` | Vérifiez que le DIV est présent avant le script, ou utilisez `DOMContentLoaded`                                           |
| Écran blanc, aucune particule                          | Vous avez installé seulement `@tsparticles/engine`                              | Vous devez aussi installer un bundle (`@tsparticles/slim`) ou des plugins, car l'engine seul n'a pas de formes à dessiner |
| Erreur "loadBasic/loadSlim/loadFull is not a function" | Bundle non installé ou import erroné                                            | `pnpm add @tsparticles/slim` et importez `{ loadSlim }`                                                                   |
| Les particules ne bougent pas                          | `move.enable` n'est pas défini à `true`                                         | Ajoutez `move: { enable: true, speed: 2 }`                                                                                |
| Fonctionnalité manquante (ex. liens, collisions)       | Le bundle choisi n'inclut pas cette fonctionnalité                              | Passez à un bundle plus riche (`@tsparticles/slim` ou `tsparticles`) ou installez le plugin spécifique                    |
| Erreurs de type TypeScript                             | Versions des packages non alignées                                              | Maintenez engine et bundle sur la même version majeure/mineure                                                            |
