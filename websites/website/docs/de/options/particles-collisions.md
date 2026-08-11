# Teilchenkollisionen

`particles.collisions` steuert das Kollisionsverhalten von Partikel zu Partikel.

## Beispiel

```ts
particles: {
  collisions: {
    enable: true,
    mode: "bounce",
  },
}
```

- `enable`: aktiviert Kollisionen.
- `mode`: Kollisionsverhalten (`bounce` ist am häufigsten).

## Leistungstipp

Kollisionen können bei hohen Partikelzahlen kostspielig sein. Stimmen Sie zuerst mit `particles.number` ab.

## Quellenangabe

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Particles/Collisions.md>
