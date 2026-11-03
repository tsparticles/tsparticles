# Migration von v1.x

Der Wechsel von `v1.x` auf die aktuelle Version erfordert meist eine vollständige Aktualisierung der Abhängigkeiten und eine Prüfung der Konfiguration.

Die größten praktischen Hindernisse sind:

1. Alte Paket- und Importmuster.
2. Die Form des `tsParticles.load(...)`-Aufrufs.
3. Aktualisierte Optionsschlüssel in modernen Schemata.

## Migration der Load-API

Das moderne `load` akzeptiert ein einziges Parameterobjekt.

Vorher (klassischer positioneller Stil):

```ts
await tsParticles.load("tsparticles", oldOptions);
```

Nachher:

```ts
await tsParticles.load({
  id: "tsparticles",
  options: oldOptions,
});
```

Wenn du aus JSON lädst:

```ts
await tsParticles.load({
  id: "tsparticles",
  url: "/particles.json",
});
```

## Wichtige Optionsmigrationen

Suche zuerst nach diesen Schlüsseln in deinen Konfigurationen:

- `particles.color` -> `particles.paint.fill`
- `particles.stroke` -> `particles.paint.stroke`

Beispiel für die Umschreibung:

```ts
// vorher
particles: {
  color: { value: ["#ff6b6b", "#4ecdc4"] },
  stroke: { width: 0 }
}

// nachher
particles: {
  paint: {
    fill: { color: { value: ["#ff6b6b", "#4ecdc4"] } },
    stroke: { width: 0 }
  }
}
```

## Empfohlene Schritte

1. Ersetze alte Paketnamen durch die aktuellen `@tsparticles/*`-Pakete.
2. Starte mit `@tsparticles/engine` + `@tsparticles/slim` und füge dann die benötigten Plugins hinzu.
3. Wandle alte `load`-Aufrufe in die objektbasierte Signatur `load({ ... })` um.
4. Prüfe die Optionsschlüssel anhand der aktuellen Dokumentation und korrigiere umbenannte oder entfernte Felder.
5. Führe visuelle und Performance-Prüfungen auf Desktop und Mobilgeräten durch.

## Checkliste

- Entferne veraltete Importe aus der alten Paketstruktur.
- Stelle sicher, dass Interaktionen, Links und benutzerdefinierte Formen weiterhin wie erwartet funktionieren.
- Für Konfigurationen im `particles.js`-Stil solltest du die Kompatibilitätsschicht in Betracht ziehen.

## Nützliche Optionsdokumentation

- Options-Rename-Matrix: [`/migrations/option-rename-matrix`](/de/migrations/option-rename-matrix)
- `particles.paint`: [`/options/particles-paint`](/de/options/particles-paint)
- Migrationshinweis `particles.color`: [`/options/particles-color`](/de/options/particles-color)
- Migrationshinweis `particles.stroke`: [`/options/particles-stroke`](/de/options/particles-stroke)

## Referenzen

- Legacy-Kompatibilität und particles.js-Bridge: [`/migrations/particles-js`](/de/migrations/particles-js)
- Installationsmatrix: [`/guide/installation`](/de/guide/installation)
- Releases des Repositorys: <https://github.com/tsparticles/tsparticles/releases>
