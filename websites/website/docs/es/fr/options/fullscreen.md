# Plein écran

Utilisez `fullScreen` pour contrôler si le canevas occupe la totalité de la fenêtre d'affichage.

## Configuration typique

```ts
fullScreen: {
  enable: true,
  zIndex: -1,
}
```

- `enable` : active le comportement de la fenêtre d'affichage complète.
- `zIndex` : utile pour conserver les particules derrière le contenu de l'application.

## Sections intégrées

Pour les aperçus de documents, les cartes et les panneaux de terrain de jeu :

```ts
fullScreen: {
  enable: false,
}
```

Cela évite les chevauchements avec la mise en page et d’autres canevas.

## Référence source

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/FullScreen.md>
