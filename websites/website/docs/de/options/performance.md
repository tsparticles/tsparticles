# Leistungsleitfaden

Hier sind die wichtigsten Hebel, um FPS-Einbrüche zu vermeiden.

## 1) Partikelanzahl

```ts
particles: {
  number: {
    value: 50,
    density: {
      enable: true,
      area: 900
    }
  }
}
```

Weniger Partikel = weniger Draw Calls und weniger Kollisionen.

## 2) Bewegung und Links

- Reduzieren Sie `move.speed`, wenn Sie keine energetische Wirkung benötigen.
- Begrenzen Sie `links.distance` und `links.opacity`.
- Vermeiden Sie schwere Kombinationen (z. B. `links` + `collisions` + erweiterte Effekte) im Vollbildmodus.

## 3) Interaktivität

- Behalten Sie nur wenige aktive Modi bei.
- Erwägen Sie auf Mobilgeräten, den Hover-Modus zu deaktivieren.

## 4) Netzhaut und Größe ändern

```ts
detectRetina: false;
```

Nützlich in leistungsorientierten Kontexten oder auf schwächeren Geräten.

## 5) Manuelle Lebenszykluskontrolle

Verwenden Sie für teure Abschnitte explizite Steuerelemente:

- `start` bei Benutzerklick
- `stop`/`pause`, wenn der Abschnitt nicht sichtbar ist
- `destroy` beim Seiten-/Komponenten-Teardown
