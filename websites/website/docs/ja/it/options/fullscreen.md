# Schermo intero

Utilizza `fullScreen` per controllare se la tela occupa l'intera visualizzazione.

## Configurazione tipica

```ts
fullScreen: {
  enable: true,
  zIndex: -1,
}
```

- `enable`: attiva/disattiva il comportamento dell'intera finestra.
- `zIndex`: utile per mantenere le particelle dietro il contenuto dell'app.

## Sezioni incorporate

Per anteprime di documenti, schede e pannelli di gioco:

```ts
fullScreen: {
  enable: false,
}
```

Ciò evita la sovrapposizione con il layout della pagina e altre tele.

## Riferimento alla fonte

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/FullScreen.md>
