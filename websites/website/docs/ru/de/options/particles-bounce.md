# Partikel prallen ab

`particles.bounce` passt das Rückprallverhalten an, wenn Kollisionen oder Grenzen die Rückpralllogik anwenden.

## Beispiel

```ts
particles: {
  bounce: {
    horizontal: {
      value: 1,
    },
    vertical: {
      value: 1,
    },
  },
}
```

## Praktische Anleitung

- Werte um `1` sorgen für natürliche Rebounds.
- Höhere Werte können energisch, aber weniger realistisch wirken.

## Quellenangabe

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Bounce.md>
