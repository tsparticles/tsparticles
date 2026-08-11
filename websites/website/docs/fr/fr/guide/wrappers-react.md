# Emballage : @tsparticles/react

Wrapper React officiel pour `tsParticles`.

## Installer

```bash
pnpm add @tsparticles/react @tsparticles/engine @tsparticles/slim
```

## Flux de configuration rapide

1. Installez le package wrapper + moteur + chargeur.
2. Placez `ParticlesProvider` à la racine de votre application (p. ex., `main.tsx` ou `layout.tsx`) — il ne doit être rendu qu'une seule fois pour tout le cycle de vie de l'application.
3. Initialisez une fois avec `ParticlesProvider` et `loadSlim`.
4. Rendre le composant `Particles` avec les options saisies.

## Références Monorepo

- Dossier du package : <https://github.com/tsparticles/tsparticles/tree/main/wrappers/react>
- Application de démonstration : <https://github.com/tsparticles/tsparticles/tree/main/demo/react>

## Lisez-moi

- README du wrapper : <https://github.com/tsparticles/tsparticles/tree/main/wrappers/react#readme>

## Documents associés

- [`/guide/wrappers`](/fr/guide/wrappers)
- [`/guide/frameworks`](/fr/guide/frameworks)
