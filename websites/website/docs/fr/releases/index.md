# Versions et versionnage

Ce projet est désormais livré à partir d'un seul référentiel : `tsparticles/tsparticles`.

<WebsiteVersionInfo />

## Où se déroule le travail de publication

- Racine Monorepo : <https://github.com/tsparticles/tsparticles>
- Offres groupées : <https://github.com/tsparticles/tsparticles/tree/main/bundles>
- Moteur : <https://github.com/tsparticles/tsparticles/tree/main/engine>
- Emballages : <https://github.com/tsparticles/tsparticles/tree/main/wrappers>
- Préréglages : <https://github.com/tsparticles/tsparticles/tree/main/presets>
- Palettes : <https://github.com/tsparticles/tsparticles/tree/main/palettes>

## Règle d'alignement des versions

- Gardez tous les packages `@tsparticles/*` alignés sur la même ligne de version.
- Évitez de mélanger différentes lignes bêta ou versions majeures dans une seule application.

## Liste de contrôle pratique pour la publication

1. Vérifiez les versions du package cible dans les fichiers de l'espace de travail `package.json`.
2. Créez et testez les projets concernés.
3. Validez les liens vers les documents et le comportement du terrain de jeu.
4. Publiez à partir du flux de publication monorepo.
