# Interattività al passaggio del mouse

`interactivity.events.onHover` controlla le reazioni al passaggio del puntatore.

## Esempio

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

## Guida pratica

- Gli effetti al passaggio del mouse sono più costosi nelle scene dense.
- Sui dispositivi mobili, valuta la possibilità di disattivare le modalità pesanti al passaggio del mouse.

## Riferimento alla fonte

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Hover.md>
