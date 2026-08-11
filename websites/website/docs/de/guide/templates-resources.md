# Vorlagen und Ressourcen

tsParticles bietet zwei Kategorien von Vorlagen: **Scaffold-Vorlagen** (Framework-Gerüste) und **Anwendungsfall-Vorlagen** (vollständige Beispielanwendungen).

## Schnellstart mit der CLI

Der einfachste Weg, eine Vorlage zu verwenden, ist über die CLI:

```bash
npm create tsparticles@latest
```

Oder verwenden Sie direkt ein bestimmtes Bundle:

```bash
npm create particles@latest
npm create confetti@latest
npm create ribbons@latest
```

Für die nicht-interaktive Nutzung:

```bash
npx tsparticles-create app my-project --template scaffold --framework react
npx tsparticles-create app my-project --template confetti --framework vanilla
```

## Scaffold-Vorlagen

Scaffold-Vorlagen bieten ein minimales Vite + TypeScript-Projektgerüst mit vorinstalliertem tsParticles. Sie sind für die folgenden Frameworks verfügbar:

| Framework | CLI-Option            | Paket                            |
| --------- | --------------------- | -------------------------------- |
| Vanilla   | `--framework vanilla` | `@tsparticles/template-scaffold` |
| React     | `--framework react`   | `@tsparticles/template-scaffold` |
| Vue 3     | `--framework vue3`    | `@tsparticles/template-scaffold` |
| Angular   | `--framework angular` | `@tsparticles/template-scaffold` |
| Svelte    | `--framework svelte`  | `@tsparticles/template-scaffold` |
| Solid     | `--framework solid`   | `@tsparticles/template-scaffold` |

Beispiel:

```bash
npx tsparticles-create app my-react-app --template scaffold --framework react
cd my-react-app
npm install
npm run dev
```

## Anwendungsfall-Vorlagen

Anwendungsfall-Vorlagen sind vollständige Beispielanwendungen, die die praktische Verwendung von tsParticles demonstrieren.

| Vorlage     | Beschreibung                                       | CLI-Vorlagenname | Paket                             |
| ----------- | -------------------------------------------------- | ---------------- | --------------------------------- |
| Login       | Login-/Registrierungsseite mit Partikelhintergrund | `login`          | `@tsparticles/template-login`     |
| Portfolio   | Persönliches Portfolio mit animiertem Hero-Bereich | `portfolio`      | `@tsparticles/template-portfolio` |
| Landing     | Marketing-Landingpage mit wirkungsvollen Partikeln | `landing`        | `@tsparticles/template-landing`   |
| Tic Tac Toe | Tic-Tac-Toe-Spiel mit Konfetti-Feier               | `tictactoe`      | `@tsparticles/template-tictactoe` |
| Confetti    | Konfetti-Kanonen-Demo                              | `confetti`       | `@tsparticles/template-confetti`  |
| Ribbons     | Bandanimations-Demo                                | `ribbons`        | `@tsparticles/template-ribbons`   |
| Particles   | Klassisches particles.js-ähnliches Demo            | `particles`      | `@tsparticles/template-particles` |

Beispiel:

```bash
npx tsparticles-create app my-portfolio --template portfolio --framework vanilla
cd my-portfolio
npm install
npm run dev
```

## npm create-Wrapper

Für bundlespezifische Vorlagen können Sie dedizierte npm create-Wrapper verwenden:

| Befehl                          | Vorlage     | Framework  | Installiertes Bundle     |
| ------------------------------- | ----------- | ---------- | ------------------------ |
| `npm create tsparticles@latest` | Interaktiv  | Interaktiv | Benutzerwahl             |
| `npm create particles@latest`   | `particles` | Vanilla    | `@tsparticles/particles` |
| `npm create confetti@latest`    | `confetti`  | Vanilla    | `@tsparticles/confetti`  |
| `npm create ribbons@latest`     | `ribbons`   | Vanilla    | `@tsparticles/ribbons`   |

## CLI-Referenz

```bash
tsparticles-create app [destination] [options]

Options:
  --template <name>     Template to use (scaffold|login|portfolio|landing|tictactoe|confetti|ribbons|particles)
  --framework <name>    Framework (vanilla|react|vue3|angular|svelte|solid)
  --skip-install        Skip npm install after scaffolding
  -h, --help            Display help
```

## Verwandte Seiten

- [`/guide/frameworks`](/de/guide/frameworks)
- [`/guide/wrappers`](/de/guide/wrappers)
- [`/demos/`](/de/demos/)
