# Graphique de dépendance

Il s'agit d'une carte pratique de la superposition des packages exposée dans le fichier README principal `tsParticles`.

Pour le graphique complet et exhaustif, voir :

- <https://github.com/tsparticles/tsparticles/blob/main/README.md#dependency-graph>

## Flux de packages de haut niveau

```text
tsParticles Engine
`- tsParticles Basic
   |- tsParticles Particles
   |- tsParticles Confetti
   |- tsParticles Fireworks
   `- tsParticles Slim
      `- tsparticles
         `- tsParticles All
```

## Comment utiliser cette carte

- Commencez à partir de `engine` + `slim` pour la plupart des applications de production.
- Passez à `tsparticles` si vous avez besoin d'interactions/plugins intégrés supplémentaires.
- Passez à `all` uniquement lorsque vous avez besoin de l'ensemble complet des fonctionnalités.
- Utilisez des bundles dédiés (`confetti`, `fireworks`, `particles`) pour des effets ciblés.

## Pages connexes

- [`/guide/getting-started`](/fr/guide/getting-started)
- [`/guide/installation`](/fr/guide/installation)
- [`/options/performance`](/fr/options/performance)
