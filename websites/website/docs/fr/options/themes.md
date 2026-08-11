# Thèmes

`themes` vous permet de définir des ensembles d'options nommés (par exemple clair et sombre) et de basculer au moment de l'exécution.

## Exemple

```ts
themes: [
  {
    name: "dark",
    default: {
      value: true,
      mode: "dark",
    },
    options: {
      background: {
        color: "#000000",
      },
    },
  },
  {
    name: "light",
    default: {
      value: true,
      mode: "light",
    },
    options: {
      background: {
        color: "#ffffff",
      },
    },
  },
];
```

## Conseils pratiques

- Conserver un objet d'options de base stable.
- Remplacez uniquement ce qui diffère par thème.
- Associez-le à l'état du mode sombre au niveau de l'application.

## Référence source

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Themes.md>
