# Modes d'interactivité

`interactivity.modes` définit les paramètres spécifiques au mode utilisés par les événements.

## Exemple

```ts
interactivity: {
  modes: {
    grab: {
      distance: 170,
      links: {
        opacity: 0.45,
      },
    },
    bubble: {
      distance: 180,
      size: 12,
      duration: 2,
    },
    push: {
      quantity: 6,
    },
    repulse: {
      distance: 130,
      duration: 0.35,
    },
  },
}
```

## Conseils pratiques

- Activez uniquement les modes que vous utilisez réellement.
- Gardez les distances modérées pour des performances stables.
- Utilisez les commandes Démarrage/Pause pour les combinaisons de modes coûteuses.

Pages connexes :

- [`Interactivity Click`](/fr/options/interactivity-click)
- [`Interactivity Hover`](/fr/options/interactivity-hover)
- [`Interactivity Div`](/fr/options/interactivity-div)

## Référence source

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Modes.md>
