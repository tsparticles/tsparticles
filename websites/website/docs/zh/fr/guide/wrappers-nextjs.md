# Emballage : @tsparticles/nextjs

Wrapper Next.js officiel construit sur `@tsparticles/react`.

## Installer

```bash
pnpm add @tsparticles/nextjs @tsparticles/engine @tsparticles/slim
```

## Flux de configuration rapide

1. Installez le wrapper Next.js et les dépendances.
2. Continuez le rendu côté client uniquement pour le canevas de particules.
3. Placez `NextParticlesProvider` à la racine de votre application (`layout.tsx` ou `_app.tsx`) — il ne doit être rendu qu'une seule fois.
4. Initialisez le moteur une fois et restituez le composant wrapper.

## Références Monorepo

- Dossier du package : <https://github.com/tsparticles/tsparticles/tree/main/wrappers/nextjs>
- Applications de démonstration : <https://github.com/tsparticles/tsparticles/tree/main/demo/nextjs>, <https://github.com/tsparticles/tsparticles/tree/main/demo/nextjs-legacy>

## Lisez-moi

- README du wrapper : <https://github.com/tsparticles/tsparticles/tree/main/wrappers/nextjs#readme>

## Documents associés

- [`/guide/wrappers`](/fr/guide/wrappers)
- [`/guide/frameworks`](/fr/guide/frameworks)
