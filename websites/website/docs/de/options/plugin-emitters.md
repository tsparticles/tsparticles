# Plugin-Option: Emitter

`emitters` erzeugt Partikel dynamisch und ist Plugin-gesteuert.

## Beispiel

```ts
emitters: {
  position: {
    x: 50,
    y: 50,
  },
  rate: {
    quantity: 5,
    delay: 0.2,
  },
}
```

## Notizen

- Ideal für Burst-Effekte und dynamische Partikelerzeugung.
- Halten Sie die Emissionsraten im Gleichgewicht, um Leistungsspitzen zu vermeiden.

## Quellenangabe

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Plugins/Emitters.md>
