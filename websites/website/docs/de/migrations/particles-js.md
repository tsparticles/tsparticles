# Migration und Kompatibilität

Wenn Sie von `particles.js` migrieren, verwenden Sie diese Reihenfolge:

1. Ersetzen Sie das alte Skript/Paket durch `@tsparticles/engine` + Bundle (`@tsparticles/slim`)
2. Verschieben Sie Ihre alte Konfiguration und ordnen Sie nicht unterstützte Felder schrittweise zu
3. Testen Sie die Interaktionen (Hover/Klick/Links) nacheinander

## Hinweise zur kanonischen Migration

- Offizielle Quelle des Migrationsleitfadens: [`tsparticles/markdown/pjsMigration.md`](https://github.com/tsparticles/tsparticles/blob/main/markdown/pjsMigration.md)

- Beispiele für die Legacy-Kompatibilität sind in den Demo-Ordnern verfügbar.

## Kompatibilitätspaket

Wenn Sie beim Migrieren älterer Konfigurationen eine Bridge-Ebene benötigen:

- npm: <https://www.npmjs.com/package/@tsparticles/pjs>
- jsDelivr: <https://www.jsdelivr.com/package/npm/@tsparticles/pjs>

Weiterführende Literatur:

- Migrationsartikel: <https://dev.to/matteobruni/migrating-from-particles-js-to-tsparticles-2a6m>
- 5 Gründe für einen Wechsel: <https://dev.to/matteobruni/5-reasons-to-use-tsparticles-and-not-particles-js-1gbe>

## Allgemeine Mapping-Tipps

- Die alte `particlesJS(...)`-Initialisierung wird zu `tsParticles.load({ id, options })`.
- Viele Legacy-Werte haben immer noch direkte Entsprechungen unter `particles`, `interactivity` und `detectRetina`.
- Die neue plugin-gesteuerte Architektur bedeutet, dass einige erweiterte Funktionen das explizite Laden von Paketen erfordern.

## Migrationscheckliste für die Produktion

- Überprüfen Sie die visuelle Parität auf Desktop und Mobilgeräten.
- Überprüfen Sie die CPU-/GPU-Auswirkungen auf Low-End-Geräten.
- Stellen Sie sicher, dass keine Optionstasten stillschweigend ignoriert werden.
- Genaue Paketversionen vor der Veröffentlichungswoche anheften.

## Migration von Canvas-Confetti zu `@tsparticles/confetti`

Wenn Sie von `canvas-confetti` migrieren, besteht der einfachste Wechsel darin, imperative Aufrufe durch `@tsparticles/confetti` API-Aufrufe zu ersetzen.

## Typische Zuordnung

- `confetti({...})` -> `await confetti({...})`
- Benutzerdefinierte Leinwand -> `const local = await confetti.create(canvas, defaults)` dann `await local({...})`
- wiederholte Aufnahmen -> behalten Sie Ihre vorhandenen Timer/Schleifen bei, rufen Sie `await confetti(...)` in diesen Rückrufen auf

## Beispielkonvertierung

Vorher (Stil `canvas-confetti`):

```ts
import confetti from "canvas-confetti";

confetti({
  particleCount: 90,
  spread: 70,
  origin: { x: 0.5, y: 0.6 },
});
```

Nach (`@tsparticles/confetti`):

```ts
import { confetti } from "@tsparticles/confetti";

await confetti({
  count: 90,
  spread: 70,
  position: { x: 50, y: 60 },
});
```

## Hinweise zum Optionsnamen

- `particleCount` -> `count`
- `origin.x`/`origin.y` in `0..1` -> `position.x`/`position.y` in `0..100`
- `startVelocity`, `spread`, `angle` und `colors` behalten die gleiche Semantik bei

Die vollständige API und Hilfsprogramme finden Sie unter: <https://github.com/tsparticles/tsparticles/tree/main/bundles/confetti#readme>
