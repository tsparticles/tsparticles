# Movimento

`motion` è utile quando hai bisogno di controllo a livello di animazione, incluso il comportamento a movimento ridotto.

## Struttura di base

```ts
motion: {
  disable: false,
  reduce: {
    factor: 4,
    value: true,
  },
}
```

- `disable`: interrompe il comportamento relativo al movimento.
- `reduce`: consente un'animazione più morbida su dispositivi vincolati o contesti a movimento ridotto.

## Guida pratica

- Mantieni questo valore predefinito a meno che tu non abbia requisiti di accessibilità/prestazioni.
- Test con preferenze di movimento ridotto e dispositivi di fascia bassa.

## Riferimento alla fonte

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Motion.md>
