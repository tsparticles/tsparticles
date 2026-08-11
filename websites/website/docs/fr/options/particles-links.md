# Liens de particules

`particles.links` trace des lignes de connexion entre les particules proches.

## Exemple

```ts
particles: {
  links: {
    enable: true,
    distance: 140,
    opacity: 0.28,
    color: "#7aa0ff",
    width: 1,
  },
}
```

- `distance` : distance max pour un lien.
- `opacity` : force visuelle de la ligne.
- `color` : couleur du trait.
- `width` : épaisseur du trait.

## Conseil sur les performances

Les liens peuvent devenir coûteux avec un nombre élevé de particules. Réglez `number.value` et `distance` ensemble.

## Référence source

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Links.md>
