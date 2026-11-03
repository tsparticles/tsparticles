# Migration depuis v1.x

Passer de `v1.x` à la version actuelle demande généralement une mise à jour complète des dépendances et une vérification de la configuration.

Les principaux blocages pratiques sont :

1. Les anciens schémas de paquets et d'imports.
2. La forme de l'appel `tsParticles.load(...)`.
3. Les clés d'options mises à jour dans les schémas modernes.

## Migration de l'API load

La `load` moderne accepte un seul objet de paramètres.

Avant (style positionnel historique) :

```ts
await tsParticles.load("tsparticles", oldOptions);
```

Après :

```ts
await tsParticles.load({
  id: "tsparticles",
  options: oldOptions,
});
```

Si vous chargez depuis un JSON :

```ts
await tsParticles.load({
  id: "tsparticles",
  url: "/particles.json",
});
```

## Migration des options principales

Commencez par rechercher ces clés dans vos configurations :

- `particles.color` -> `particles.paint.fill`
- `particles.stroke` -> `particles.paint.stroke`

Exemple de réécriture :

```ts
// avant
particles: {
  color: { value: ["#ff6b6b", "#4ecdc4"] },
  stroke: { width: 0 }
}

// après
particles: {
  paint: {
    fill: { value: ["#ff6b6b", "#4ecdc4"] },
    stroke: { width: 0 }
  }
}
```

## Étapes recommandées

1. Remplacez les anciens noms de paquets par les paquets `@tsparticles/*` actuels.
2. Partez de `@tsparticles/engine` + `@tsparticles/slim`, puis ajoutez les plugins nécessaires.
3. Convertissez les anciens appels `load` vers la signature objet `load({ ... })`.
4. Validez les clés d'options avec la documentation actuelle et corrigez les champs renommés ou supprimés.
5. Lancez des vérifications visuelles et de performance sur desktop et mobile.

## Checklist

- Supprimez les imports obsolètes de l'ancienne structure de paquets.
- Confirmez que les interactions, les liens et les formes personnalisées fonctionnent toujours comme prévu.
- Pour les configurations de style `particles.js`, envisagez la couche de compatibilité.

## Documentation utile des options

- Matrice des renommages: [`/migrations/option-rename-matrix`](/fr/migrations/option-rename-matrix)
- `particles.paint`: [`/options/particles-paint`](/fr/options/particles-paint)
- Note de migration `particles.color`: [`/options/particles-color`](/fr/options/particles-color)
- Note de migration `particles.stroke`: [`/options/particles-stroke`](/fr/options/particles-stroke)

## Références

- Compatibilité historique et bridge particles.js: [`/migrations/particles-js`](/fr/migrations/particles-js)
- Matrice d'installation: [`/guide/installation`](/fr/guide/installation)
- Releases du dépôt: <https://github.com/tsparticles/tsparticles/releases>
