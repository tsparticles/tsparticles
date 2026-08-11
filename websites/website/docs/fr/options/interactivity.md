# Interactivité

Les options `interactivity` définissent la façon dont les particules réagissent au survol/clic.

Pour des références ciblées :

- [`Interactivity Click`](/fr/options/interactivity-click)
- [`Interactivity Hover`](/fr/options/interactivity-hover)
- [`Interactivity Div`](/fr/options/interactivity-div)
- [`Interactivity Events`](/fr/options/interactivity-events)
- [`Interactivity Modes`](/fr/options/interactivity-modes)

## Structure de base

```ts
interactivity: {
  events: {
    onHover: {
      enable: true,
      mode: ["grab", "bubble"]
    },
    onClick: {
      enable: true,
      mode: ["push", "repulse"]
    }
  },
  modes: {
    grab: {
      distance: 170,
      links: {
        opacity: 0.45
      }
    },
    bubble: {
      distance: 180,
      size: 12,
      duration: 2
    },
    push: {
      quantity: 6
    },
    repulse: {
      distance: 130,
      duration: 0.35
    }
  }
}
```

## Événements les plus utilisés

- `onHover` : feedback immédiat pour les utilisateurs.
- `onClick` : rafales ou actions ciblées.
- `resize` : maintient le comportement du canevas cohérent lors du redimensionnement de la fenêtre.
- `onDiv` : cibler les interactions sur des éléments spécifiques.

## Bonne pratique

- Évitez d'activer trop de modes à la fois sur les appareils bas de gamme.
- Gardez `distance` modéré pour éviter les pics de performances.
- Si l'effet est lourd, utilisez le contrôle manuel avec `Start/Pause`.

## Références détaillées

- Cliquez sur : <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Click.md>
- Survol : <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Hover.md>
- Div : <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Div.md>
