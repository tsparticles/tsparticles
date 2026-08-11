# Versioning & Migration

Utilisez cette section pour naviguer entre les versions majeures de `tsParticles`, suivre les releases et comprendre le versioning.

## Guides de migration

- [`Migrer depuis v3.x`](/fr/migrations/from-v3)
- [`Migrer depuis v2.x`](/fr/migrations/from-v2)
- [`Migrer depuis v1.x`](/fr/migrations/from-v1)

## Parcours rapide

- Depuis `v3.x`: commencez par [`/fr/migrations/from-v3`](/fr/migrations/from-v3) (focus: changements de clés d'options + renommages de paquets).
- Depuis `v2.x`: commencez par [`/fr/migrations/from-v2`](/fr/migrations/from-v2) (focus: API `load(...)` + options).
- Depuis `v1.x`: commencez par [`/fr/migrations/from-v1`](/fr/migrations/from-v1) (focus: paquets, loaders, options).

## Où la migration casse généralement

Les migrations majeures cassent à deux endroits :

1. **Forme de l'API Load** (anciens paramètres positionnels vs nouveau paramètre objet).
2. **Schéma des options** (clés renommées/déplacées).

Si votre application compile mais affiche un rendu incorrect, commencez par les options.

## Recherche rapide

- [Matrice des renommages d'options](/fr/migrations/option-rename-matrix) — correspondance entre clés legacy et actuelles.

## Aussi utile

- [Changelog](/fr/migrations/changelog) — dernières notes de version.
- [Releases et Versioning](/fr/migrations/releases) — règles d'alignement des versions et checklist de publication.
- [Migration depuis particles.js](/fr/migrations/particles-js) — migrer depuis `particles.js` ou `canvas-confetti`.
