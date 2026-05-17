# Migration von v3.x

Bei `v3.x` sind die groessten Migrationsrisiken die **Options-Kompatibilitaet** und die **Paket-Aenderungen**.

## Prioritaere Aenderungen

- `particles.color` -> `particles.paint.fill`
- `particles.stroke` -> `particles.paint.stroke`

## Paket-Umbenennungen

Einige `v3.x`-Pakete wurden umbenannt oder umstrukturiert:

| v3-Paket | Aktuelles Paket | Hinweis |
|---|---|---|
| `@tsparticles/move-base` | `@tsparticles/plugin-move` | In einem einzigen Plugin zusammengefuehrt |
| `@tsparticles/move-parallax` | `@tsparticles/plugin-move` | In einem einzigen Plugin zusammengefuehrt |
| `@tsparticles/updater-color` | `@tsparticles/updater-paint` | Durch Paint-System ersetzt |
| `@tsparticles/updater-stroke-color` | `@tsparticles/updater-paint` | Durch Paint-System ersetzt |
| `@tsparticles/plugin-hsv-color` | `@tsparticles/plugin-hsv-color` | Nach `plugins/colors/hsv/` verschoben, gleicher Name |

## Beispiele fuer Optionszuordnung

Vorher (`v3.x`-Stil):

```ts
const options = {
  particles: {
    color: {
      value: "#ff0000",
    },
    stroke: {
      width: 2,
      color: "#000000",
    },
  },
};
```

Nachher (aktuell):

```ts
const options = {
  particles: {
    paint: {
      fill: {
        value: "#ff0000",
      },
      stroke: {
        width: 2,
        color: "#000000",
      },
    },
  },
};
```

## Load-API-Migration

Vorher (legacy positional):

```ts
await tsParticles.load("tsparticles", options);
```

Nachher (Objekt-Parameter):

```ts
await tsParticles.load({
  id: "tsparticles",
  options,
});
```

## Empfohlene Schritte

1. Alle `@tsparticles/*`-Pakete auf die neueste Version bringen.
2. Veraltete Optionsschluessel (`particles.color`, `particles.stroke`) durch `particles.paint.*` ersetzen.
3. Umbenannte Pakete in `package.json` aktualisieren (siehe Tabelle oben).
4. Pruefen, dass benutzerdefinierte Plugins/Formen vor `tsParticles.load(...)` geladen werden.
5. Interaktionen und leistungskritische Szenarien erneut testen.

## Ressourcen

- Option-Rename-Matrix: [`/migrations/option-rename-matrix`](/de/migrations/option-rename-matrix)
- `particles.paint`: [`/options/particles-paint`](/de/options/particles-paint)
