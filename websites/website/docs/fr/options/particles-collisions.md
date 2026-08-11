# Collisions de particules

`particles.collisions` contrôle le comportement des collisions particule à particule.

## Exemple

```ts
particles: {
  collisions: {
    enable: true,
    mode: "bounce",
  },
}
```

- `enable` : active les collisions.
- `mode` : comportement de collision (`bounce` est le plus courant).

## Conseil sur les performances

Les collisions peuvent être coûteuses lorsque le nombre de particules est élevé. Réglez d'abord avec `particles.number`.

## Référence source

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Collisions.md>
