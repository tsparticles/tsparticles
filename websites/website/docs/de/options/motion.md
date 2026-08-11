# Bewegung

`motion` ist nützlich, wenn Sie eine Steuerung auf Animationsebene benötigen, einschließlich Verhalten bei reduzierter Bewegung.

## Grundstruktur

```ts
motion: {
  disable: false,
  reduce: {
    factor: 4,
    value: true,
  },
}
```

- `disable`: Stoppt bewegungsbezogenes Verhalten.
- `reduce`: ermöglicht weichere Animationen auf eingeschränkten Geräten oder Kontexten mit reduzierter Bewegung.

## Praktische Anleitung

- Behalten Sie die Standardeinstellungen bei, es sei denn, Sie haben Anforderungen an die Zugänglichkeit/Leistung.
- Testen Sie mit bewegungsreduzierten Präferenzen und Low-End-Geräten.

## Quellenangabe

- <https://github.com/tsparticles/tsparticles/blob/main/markdown/Options/Motion.md>
