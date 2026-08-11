# Guide des performances

Voici les principaux leviers pour éviter les baisses de FPS.

## 1) Nombre de particules

```ts
particles: {
  number: {
    value: 50,
    density: {
      enable: true,
      area: 900
    }
  }
}
```

Moins de particules = moins d'appels de tirage et moins de collisions.

## 2) Mouvement et liens

- Réduisez `move.speed` lorsque vous n'avez pas besoin d'un effet énergétique.
- Limite `links.distance` et `links.opacity`.
- Évitez les combinaisons lourdes (par exemple `links` + `collisions` + effets avancés) en plein écran.

## 3) Interactivité

- Ne conservez que quelques modes actifs.
- Sur mobile, pensez à désactiver le mode survol.

## 4) Rétine et redimensionnement

```ts
detectRetina: false;
```

Utile dans des contextes axés sur les performances ou sur des appareils plus faibles.

## 5) Contrôle manuel du cycle de vie

Pour les sections coûteuses, utilisez des contrôles explicites :

- `start` au clic de l'utilisateur
- `stop`/`pause` lorsque la section n'est pas visible
- `destroy` lors du démontage de la page/du composant
