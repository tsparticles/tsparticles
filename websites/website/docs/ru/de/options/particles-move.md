# Partikel bewegen sich

`particles.move` definiert Richtung, Geschwindigkeit und Verhalten außerhalb der Leinwand.

## Beispiel

```ts
particles: {
  move: {
    enable: true,
    speed: 1.6,
    direction: "none",
    outModes: {
      default: "out",
    },
  },
}
```

- `enable`: schaltet die Bewegung ein.
- `speed`: primäre wahrgenommene Bewegungsintensität.
- `direction`: feste Richtung oder freie Bewegung.
- `outModes`: Verhalten an Leinwandgrenzen.

## Quellenangabe

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Move.md>
