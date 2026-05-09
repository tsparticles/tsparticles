# Bundle-Anleitung

Diese Seite hilft dir, das passende `tsParticles`-Bundle auszuwaehlen und schnell einzurichten.

## Paketvergleich

| Paket                    | Ideal fuer                                                   | Setup-Stil                                     |
| ------------------------ | ------------------------------------------------------------ | ---------------------------------------------- |
| `@tsparticles/basic`     | Sehr leichte Setups                                          | `tsParticles` + `await loadBasic(tsParticles)` |
| `@tsparticles/slim`      | Die meisten Websites/Apps                                    | `tsParticles` + `await loadSlim(tsParticles)`  |
| `tsparticles`            | Vollstaendiger offizieller Feature-Satz mit Engine-Kontrolle | `tsParticles` + `await loadFull(tsParticles)`  |
| `@tsparticles/all`       | Alle Features, schnelles Prototyping                         | `tsParticles` + `await loadAll(tsParticles)`   |
| `@tsparticles/confetti`  | Konfetti-Effekte mit einem Aufruf                            | `await confetti(options)`                      |
| `@tsparticles/fireworks` | Feuerwerk-Effekte mit einem Aufruf                           | `await fireworks(options)`                     |
| `@tsparticles/particles` | Einfache API fuer Partikel-Hintergruende                     | `await particles(options)`                     |

## Bundle-Anleitungen

- Basic: [`/guide/bundles-basic`](/de/guide/bundles-basic)
- Slim: [`/guide/bundles-slim`](/de/guide/bundles-slim)
- tsparticles (Full): [`/guide/bundles-full`](/de/guide/bundles-full)
- All: [`/guide/bundles-all`](/de/guide/bundles-all)
- Confetti: [`/guide/bundles-confetti`](/de/guide/bundles-confetti)
- Fireworks: [`/guide/bundles-fireworks`](/de/guide/bundles-fireworks)
- Particles: [`/guide/bundles-particles`](/de/guide/bundles-particles)

## Installation

Installiere den Paketpfad, der zu deinem Anwendungsfall passt.

```bash
pnpm add @tsparticles/engine @tsparticles/basic
pnpm add @tsparticles/engine @tsparticles/slim
pnpm add @tsparticles/engine tsparticles
pnpm add @tsparticles/engine @tsparticles/all
pnpm add @tsparticles/confetti
pnpm add @tsparticles/fireworks
pnpm add @tsparticles/particles
```

Brauchst du CDN-Links und weitere Package-Manager-Varianten?

- Siehe [`/guide/installation`](/de/guide/installation).

## Setup-Beispiele

### Engine + Loader-Bundles (`basic`, `slim`, `full`, `all`)

```ts
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

await loadSlim(tsParticles);

await tsParticles.load({
  id: "tsparticles",
  options: {
    particles: {
      number: { value: 80 },
      move: { enable: true, speed: 2 },
    },
  },
});
```

Fuer die anderen Presets tauschst du nur Import/Funktion des Loaders:

- `@tsparticles/basic` -> `loadBasic`
- `tsparticles` -> `loadFull`
- `@tsparticles/all` -> `loadAll`

### Fokussierte APIs (`confetti`, `fireworks`, `particles`)

```ts
import { confetti } from "@tsparticles/confetti";
import { fireworks } from "@tsparticles/fireworks";
import { particles } from "@tsparticles/particles";

await confetti({ count: 80, spread: 60 });
await fireworks({ sounds: false });
await particles({ count: 100, links: true });
```

Diese APIs sind ideal, wenn du schnell integrieren willst, ohne viele Engine-Plugins manuell zu verdrahten.

## Praktische Auswahlregeln

1. Starte in den meisten Projekten mit `@tsparticles/slim`.
2. Nutze `@tsparticles/basic`, wenn Bundle-Groesse oberste Prioritaet hat und die Features einfach sind.
3. Nutze `tsparticles`, wenn du eine full Basis mit vielen Features und `loadFull` brauchst.
4. Nutze `@tsparticles/all` fuer Prototyping oder wenn du sofort viele Features brauchst.
5. Nutze `@tsparticles/confetti`, `@tsparticles/fireworks` oder `@tsparticles/particles`, wenn deine UI einen gezielten Effekt mit minimalem Setup braucht.

## Verwandte Seiten

- Fokussierte Bundles im Playground: [`/playground/bundles`](/de/playground/bundles)
- Einstiegspfad: [`/guide/getting-started`](/de/guide/getting-started)
- Installationsmatrix: [`/guide/installation`](/de/guide/installation)
- Wrapper-Ueberblick: [`/guide/wrappers`](/de/guide/wrappers)
