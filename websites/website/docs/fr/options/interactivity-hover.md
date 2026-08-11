# Survol d'interactivité

`interactivity.events.onHover` contrôle les réactions au survol du pointeur.

## Exemple

```ts
interactivity: {
  events: {
    onHover: {
      enable: true,
      mode: ["grab", "bubble"],
    },
  },
  modes: {
    grab: {
      distance: 160,
      links: {
        opacity: 0.4,
      },
    },
    bubble: {
      distance: 180,
      size: 12,
      duration: 2,
    },
  },
}
```

## Conseils pratiques

- Les effets de survol sont plus coûteux sur les scènes denses.
- Sur mobile, pensez à désactiver les modes de survol intensif.

## Référence source

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Hover.md>
