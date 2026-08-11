# Interattività Fare clic

`interactivity.events.onClick` definisce cosa succede quando gli utenti fanno clic/toccano l'area di disegno.

## Esempio

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

## Guida pratica

- Inizia con una modalità, quindi combina le modalità solo se necessario.
- Mantieni `quantity` e `distance` moderati per FPS stabili.

## Riferimento alla fonte

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Click.md>
