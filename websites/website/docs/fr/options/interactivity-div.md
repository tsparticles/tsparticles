# Division Interactivité

`interactivity.events.onDiv` applique des modes d'interaction à des éléments HTML spécifiques.

## Exemple

```ts
interactivity: {
  events: {
    onDiv: {
      selectors: ["#cta", ".interactive-zone"],
      enable: true,
      mode: "repulse",
      type: "circle",
    },
  },
  modes: {
    repulse: {
      distance: 140,
      duration: 0.3,
    },
  },
}
```

## Conseils pratiques

- Utilisez-le pour des zones UX ciblées au lieu de réactions sur toile complète.
- Gardez les listes de sélection explicites et faciles à maintenir.

## Référence source

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Div.md>
