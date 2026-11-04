# Migration depuis v2.x

Le passage de `v2.x` à la version actuelle comporte généralement deux zones de rupture principales :

1. La migration de la signature de `tsParticles.load(...)`.
2. La migration des clés d'options (notamment couleur et stroke).

## Migration de l'API load (important)

Dans les versions modernes, `load` accepte un **seul objet de paramètres**.

Avant (style positionnel `v2.x`) :

```ts
await tsParticles.load("tsparticles", {
  particles: {
    number: {
      value: 80,
    },
  },
});
```

Après (objet unique) :

```ts
await tsParticles.load({
  id: "tsparticles",
  options: {
    particles: {
      number: {
        value: 80,
      },
    },
  },
});
```

Vous pouvez aussi passer `element`, `url` et `index` dans le même objet.

```ts
await tsParticles.load({
  element: document.getElementById("tsparticles") as HTMLElement,
  url: "/particles.json",
  index: 0,
});
```

## Migration des options principales

- `particles.color` -> `particles.paint.fill`
- `particles.stroke` -> `particles.paint.stroke`

Avant :

```ts
particles: {
  color: { value: "#00ffcc" },
  stroke: { width: 1, color: "#003344" }
}
```

Après :

```ts
particles: {
  paint: {
    fill: { color: { value: "#00ffcc" } },
    stroke: { width: 1, color: "#003344" }
  }
}
```

## Étapes recommandées

1. Mettez à jour tous les paquets `@tsparticles/*` ensemble.
2. Vérifiez que les versions des wrappers (React/Vue/Angular/etc.) sont sur la même ligne majeure.
3. Convertissez tous les anciens appels `tsParticles.load(id, options)` en paramètres objet.
4. Migrez les clés connues (`color`, `stroke`) vers `paint.fill`/`paint.stroke`.
5. Lancez une passe de régression visuelle sur vos configurations les plus complexes.

## Checklist

- Assurez-vous que le lockfile ne contient pas de versions majeures mélangées.
- Vérifiez que le bundle choisi (`basic`, `slim`, `all`) correspond toujours aux fonctionnalités activées.
- Retestez les hooks du cycle de vie du canvas (`loaded`, `particlesLoaded`, chemins de cleanup).

## Documentation utile des options

- Matrice des renommages: [`/migrations/option-rename-matrix`](/fr/migrations/option-rename-matrix)
- `particles.paint`: [`/options/particles-paint`](/fr/options/particles-paint)
- Note de migration `particles.color`: [`/options/particles-color`](/fr/options/particles-color)
- Note de migration `particles.stroke`: [`/options/particles-stroke`](/fr/options/particles-stroke)

## Références

- Règle d'alignement des versions: [`/migrations/releases`](/fr/migrations/releases)
- Releases du dépôt: <https://github.com/tsparticles/tsparticles/releases>
