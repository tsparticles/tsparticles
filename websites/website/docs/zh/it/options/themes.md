# Temi

`themes` ti consente di definire set di opzioni con nome (ad esempio chiaro e scuro) e di cambiarli in fase di esecuzione.

## Esempio

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

## Guida pratica

- Mantenere un oggetto opzioni di base stabile.
- Sostituisci solo ciò che differisce per tema.
- Associa con lo stato della modalità oscura a livello di app.

## Riferimento alla fonte

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Themes.md>
