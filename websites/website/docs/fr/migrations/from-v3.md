# Migrer depuis v3.x

Depuis `v3.x`, les principaux risques de migration sont la **compatibilité des options** et les **changements de paquets**.

## Changements prioritaires

- `particles.color` -> `particles.paint.fill`
- `particles.stroke` -> `particles.paint.stroke`

## Renommage des paquets

Certains paquets `v3.x` ont été renommés ou restructurés :

| Paquet v3                           | Paquet actuel                   | Note                                         |
| ----------------------------------- | ------------------------------- | -------------------------------------------- |
| `@tsparticles/move-base`            | `@tsparticles/plugin-move`      | Fusionnés en un seul plugin                  |
| `@tsparticles/move-parallax`        | `@tsparticles/plugin-move`      | Fusionnés en un seul plugin                  |
| `@tsparticles/updater-color`        | `@tsparticles/updater-paint`    | Remplacé par le système paint                |
| `@tsparticles/updater-stroke-color` | `@tsparticles/updater-paint`    | Remplacé par le système paint                |
| `@tsparticles/plugin-hsv-color`     | `@tsparticles/plugin-hsv-color` | Déplacé dans `plugins/colors/hsv/`, même nom |
| (non nécessaire en v3 - intégré)    | `@tsparticles/plugin-interactivity` | Requis pour que tous les plugins d'interaction (grab, bubble, repulse, etc.) fonctionnent |

## Exemples de correspondance des options

Avant (style `v3.x`) :

```ts
const options = {
  particles: {
    color: {
      value: "#ff0000",
    },
    stroke: {
      width: 2,
      color: "#000000",
    },
  },
};
```

Après (actuel) :

```ts
const options = {
  particles: {
    paint: {
      fill: {
        value: "#ff0000",
      },
      stroke: {
        width: 2,
        color: "#000000",
      },
    },
  },
};
```

## Migration de la Load API

Avant (appel positionnel legacy) :

```ts
await tsParticles.load("tsparticles", options);
```

Après (paramètre objet) :

```ts
await tsParticles.load({
  id: "tsparticles",
  options,
});
```

## Étapes recommandées

1. Alignez tous les paquets `@tsparticles/*` sur la dernière version disponible.
2. Remplacez les clés d'options obsolètes (`particles.color`, `particles.stroke`) par `particles.paint.*`.
3. Mettez à jour les paquets renommés dans `package.json` (voir tableau ci-dessus).
4. Si vous utilisez des plugins d'interaction (grab, bubble, repulse, etc.), installez `@tsparticles/plugin-interactivity` et chargez-le avec `await loadInteractivityPlugin(tsParticles)` avant de charger tout plugin d'interaction.
5. Vérifiez que les plugins/formes personnalisés sont chargés avant `tsParticles.load(...)`.
6. Retestez les interactions et les scènes critiques pour les performances.

## Fonctions de chargement granulaires

Certains paquets exposent des fonctions de chargement individuelles pour charger uniquement ce dont vous avez besoin, réduisant ainsi la taille du bundle.

### Plugins

- **`@tsparticles/plugin-absorbers`** : `loadAbsorbersPluginSimple` (cycle de vie et dessin des absorbeurs uniquement), `loadAbsorbersInteraction` (interaction clic/souris uniquement) ou `loadAbsorbersPlugin` (les deux).
- **`@tsparticles/plugin-emitters`** : `loadEmittersPluginSimple` (cycle de vie et dessin des émetteurs uniquement), `loadEmittersInteraction` (interaction clic/souris uniquement) ou `loadEmittersPlugin` (les deux).

### Formes

- **`@tsparticles/shape-polygon`** : `loadGenericPolygonShape` (polygone) ou `loadTriangleShape` (triangle) individuellement, ou `loadPolygonShape` pour les deux.
- **`@tsparticles/shape-cards`** : `loadClubsSuitShape`, `loadDiamondsSuitShape`, `loadHeartsSuitShape`, `loadSpadesSuitShape` (couleurs individuelles), `loadCardSuitsShape` (toutes les couleurs), `loadFullCardsShape` (images de cartes) ou `loadCardsShape` (tout).

Tous les autres paquets de formes (arrow, circle, cog, emoji, heart, image, infinity, line, matrix, path, rounded-polygon, rounded-rect, spiral, square, squircle, star, text) exportent directement une seule fonction `load*Shape`.

## Ressources

- Matrice des renommages: [`/migrations/option-rename-matrix`](/fr/migrations/option-rename-matrix)
- `particles.paint`: [`/options/particles-paint`](/fr/options/particles-paint)
