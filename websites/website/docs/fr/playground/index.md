# Aire de jeux

Répartir par cas d'utilisation :

- [`Configs Playground`](/fr/playground/configs) : démos plus riches avec des options entièrement modifiables.
- [`Shapes Playground`](/fr/playground/shapes) : demos ciblees sur `shape.type` avec options specifiques par forme lorsque disponibles.
- [`Presets Playground`](/fr/playground/presets) : démos officielles des noms de préréglages (`{ preset: "..." }`).
- [`Palettes Playground`](/fr/playground/palettes) : démos axées sur la palette du projet de préréglages.
- [`Bundles Playground`](/fr/playground/bundles) : terrains de jeux dédiés pour `@tsparticles/confetti`, `@tsparticles/fireworks`, `@tsparticles/particles` et `@tsparticles/ribbons`.

L'exécution est toujours **déclenchée par l'utilisateur uniquement** (pas de lecture automatique).

## Flux partagé

La disposition est cohérente sur toutes les aires de jeux :

1. Aperçu du canevas en premier.
2. Commandes pour Démarrer/Pause/Reprendre/Détruire.
3. Éditeur JSON pour les options.

4. Choisissez une démo dans le menu.
5. Appuyez sur `Start` pour l'exécuter (pas de lecture automatique).
6. Modifiez le JSON dans l'éditeur.
7. Appuyez à nouveau sur `Start` pour recharger avec vos nouvelles options.
8. Utilisez `Pause`/`Resume` pour contrôler les performances et l'utilisation du processeur.

> Remarque : `Destroy` libère entièrement l'instance de conteneur.

## Flux de travail suggéré

- Prototypez ici jusqu'à ce que l'effet soit stable.
- Copiez le JSON final dans votre projet.
- Tapez-le avec `ISourceOptions` dans le code de l'application.
