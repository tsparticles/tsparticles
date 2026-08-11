# Interattività

Le opzioni `interactivity` definiscono il modo in cui le particelle reagiscono al passaggio del mouse/clic.

Per riferimenti mirati:

- [`Interactivity Click`](/it/options/interactivity-click)
- [`Interactivity Hover`](/it/options/interactivity-hover)
- [`Interactivity Div`](/it/options/interactivity-div)
- [`Interactivity Events`](/it/options/interactivity-events)
- [`Interactivity Modes`](/it/options/interactivity-modes)

## Struttura di base

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

## Eventi più utilizzati

- `onHover`: feedback immediato per gli utenti.
- `onClick`: raffiche o azioni mirate.
- `resize`: mantiene coerente il comportamento della tela durante il ridimensionamento della finestra.
- `onDiv`: mira alle interazioni su elementi specifici.

## Migliori pratiche

- Evita di abilitare troppe modalità contemporaneamente sui dispositivi di fascia bassa.
- Mantieni un `distance` moderato per evitare picchi di prestazioni.
- Se l'effetto è pesante, utilizza il controllo manuale con `Start/Pause`.

## Riferimenti dettagliati

- Fai clic su: <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Click.md>
- Passa il mouse: <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Hover.md>
- Div.: <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Interactivity/Div.md>
