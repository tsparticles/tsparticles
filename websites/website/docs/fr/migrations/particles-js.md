# Migration et compatibilité

Si vous migrez depuis `particles.js`, suivez cet ordre :

1. remplacez l'ancien script/package par `@tsparticles/engine` + bundle (`@tsparticles/slim`)
2. déplacez votre ancienne configuration et mappez progressivement les champs non pris en charge
3. testez les interactions (survol/clic/liens) une par une

## Notes de migration canoniques

- Source officielle du guide de migration : [`tsparticles/markdown/pjsMigration.md`](https://github.com/tsparticles/tsparticles/blob/main/markdown/pjsMigration.md)
- Des exemples de compatibilité hérités sont disponibles dans les dossiers de démonstration.

## Package de compatibilité

Si vous avez besoin d'une couche pont lors de la migration d'anciennes configurations :

- npm : <https://www.npmjs.com/package/@tsparticles/pjs>
- jsDelivr : <https://www.jsdelivr.com/package/npm/@tsparticles/pjs>

Lectures complémentaires :

- Article sur la migration : <https://dev.to/matteobruni/migrating-from-particles-js-to-tsparticles-2a6m>
- 5 raisons de changer : <https://dev.to/matteobruni/5-reasons-to-use-tsparticles-and-not-particles-js-1gbe>

## Conseils de cartographie courants

- L'ancienne initialisation `particlesJS(...)` devient `tsParticles.load({ id, options })`.
- De nombreuses valeurs héritées ont encore des équivalents directs sous `particles`, `interactivity` et `detectRetina`.
- La nouvelle architecture basée sur des plugins signifie que certaines fonctionnalités avancées nécessitent un chargement explicite de packages.

## Liste de contrôle de migration pour la production

- Vérifier la parité visuelle sur ordinateur et mobile.
- Vérifier l'impact CPU/GPU sur les appareils bas de gamme.
- Vérifiez qu'aucune touche d'option n'est ignorée en silence.
- Épinglez les versions exactes du package avant la semaine de sortie.

## Migration de canvas-confetti vers `@tsparticles/confetti`

Si vous migrez depuis `canvas-confetti`, le changement le plus simple consiste à remplacer les appels impératifs par des appels API `@tsparticles/confetti`.

## Cartographie typique

- `confetti({...})` -> `await confetti({...})`
- canevas personnalisé -> `const local = await confetti.create(canvas, defaults)` puis `await local({...})`
- tirs répétés -> conservez vos minuteries/boucles existantes, appelez `await confetti(...)` dans ces rappels

## Exemple de conversion

Avant (style `canvas-confetti`) :

```ts
import confetti from "canvas-confetti";

confetti({
  particleCount: 90,
  spread: 70,
  origin: { x: 0.5, y: 0.6 },
});
```

Après (`@tsparticles/confetti`) :

```ts
import { confetti } from "@tsparticles/confetti";

await confetti({
  count: 90,
  spread: 70,
  position: { x: 50, y: 60 },
});
```

## Remarques sur le nom de l'option

- `particleCount` -> `count`
- `origin.x`/`origin.y` dans `0..1` -> `position.x`/`position.y` dans `0..100`
- `startVelocity`, `spread`, `angle` et `colors` gardent la même sémantique

Pour obtenir l'API complète et les aides, voir : <https://github.com/tsparticles/tsparticles/tree/main/bundles/confetti#readme>
