# Interactivité Clic

`interactivity.events.onClick` définit ce qui se passe lorsque les utilisateurs cliquent/appuyent sur le canevas.

## Exemple

```ts
interactivity: {
  events: {
    onClick: {
      enable: true,
      mode: ["push", "repulse"],
    },
  },
  modes: {
    push: {
      quantity: 4,
    },
    repulse: {
      distance: 120,
      duration: 0.4,
    },
  },
}
```

## Conseils pratiques

- Commencez avec un mode, puis combinez les modes uniquement si nécessaire.
- Gardez `quantity` et `distance` modérés pour un FPS stable.

## Référence source

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Click.md>
