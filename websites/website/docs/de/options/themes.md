# Themen

Mit `themes` können Sie benannte Optionssätze definieren (z. B. hell und dunkel) und zur Laufzeit wechseln.

## Beispiel

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

## Praktische Anleitung

- Behalten Sie ein stabiles Basisoptionsobjekt bei.
- Überschreiben Sie nur das, was je nach Thema unterschiedlich ist.
- Koppeln Sie mit dem Dunkelmodusstatus auf App-Ebene.

## Quellenangabe

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Themes.md>
