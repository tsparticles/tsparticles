# Migration von v2.x

Der Wechsel von `v2.x` zur aktuellen Version hat meist zwei wichtige Breaking Areas:

1. Die Migration der Signatur von `tsParticles.load(...)`.
2. Die Migration der Optionsschlüssel (insbesondere Farbe und Stroke).

## Migration der Load-API (wichtig)

In modernen Versionen akzeptiert `load` ein **einziges Parameterobjekt**.

Vorher (positioneller `v2.x`-Stil):

```ts
await tsParticles.load("tsparticles", {
  particles: {
    number: {
      value: 80,
    },
  },
});
```

Nachher (einzelnes Objekt):

```ts
await tsParticles.load({
  id: "tsparticles",
  options: {
    particles: {
      number: {
        value: 80,
      },
    },
  },
});
```

Du kannst `element`, `url` und `index` im selben Objekt übergeben.

```ts
await tsParticles.load({
  element: document.getElementById("tsparticles") as HTMLElement,
  url: "/particles.json",
  index: 0,
});
```

## Wichtige Optionsmigrationen

- `particles.color` -> `particles.paint.fill`
- `particles.stroke` -> `particles.paint.stroke`

Vorher:

```ts
particles: {
  color: { value: "#00ffcc" },
  stroke: { width: 1, color: "#003344" }
}
```

Nachher:

```ts
particles: {
  paint: {
    fill: { color: { value: "#00ffcc" } },
    stroke: { width: 1, color: "#003344" }
  }
}
```

## Empfohlene Schritte

1. Aktualisiere alle `@tsparticles/*`-Pakete gemeinsam.
2. Prüfe, ob die Wrapper-Versionen (React/Vue/Angular/usw.) auf derselben Major-Linie liegen.
3. Wandle alle alten `tsParticles.load(id, options)`-Aufrufe in Objektparameter um.
4. Migriere bekannte Optionsschlüssel (`color`, `stroke`) nach `paint.fill`/`paint.stroke`.
5. Führe eine visuelle Regressionsprüfung deiner komplexesten Konfigurationen durch.

## Checkliste

- Stelle sicher, dass die Lockfile keine gemischten Major-Versionen enthält.
- Prüfe, ob die gewählte Bundle-Variante (`basic`, `slim`, `all`) noch zu den aktivierten Funktionen passt.
- Teste die Canvas-Lifecycle-Hooks erneut (`loaded`, `particlesLoaded`, Cleanup-Pfade).

## Nützliche Optionsdokumentation

- Options-Rename-Matrix: [`/migrations/option-rename-matrix`](/de/migrations/option-rename-matrix)
- `particles.paint`: [`/options/particles-paint`](/de/options/particles-paint)
- Migrationshinweis `particles.color`: [`/options/particles-color`](/de/options/particles-color)
- Migrationshinweis `particles.stroke`: [`/options/particles-stroke`](/de/options/particles-stroke)

## Referenzen

- Regel zur Versionsausrichtung: [`/migrations/releases`](/de/migrations/releases)
- Releases des Repositorys: <https://github.com/tsparticles/tsparticles/releases>
