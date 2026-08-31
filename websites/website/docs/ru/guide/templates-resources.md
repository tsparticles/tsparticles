# Templates and Resources

tsParticles provides two categories of templates: **scaffold templates** (framework skeletons) and **use-case templates** (complete example applications).

## Quick start with CLI

The easiest way to use any template is through the CLI:

```bash
npm create tsparticles@latest
```

Or use a specific bundle directly:

```bash
npm create particles@latest
npm create confetti@latest
npm create ribbons@latest
```

For non-interactive usage:

```bash
npx tsparticles-create app my-project --template scaffold --framework react
npx tsparticles-create app my-project --template confetti --framework vanilla
```

## Scaffold templates

Scaffold templates provide a minimal Vite + TypeScript project skeleton with tsParticles pre-configured. They are available for the following frameworks:

| Framework | CLI option            | Package                          |
| --------- | --------------------- | -------------------------------- |
| Vanilla   | `--framework vanilla` | `@tsparticles/template-scaffold` |
| React     | `--framework react`   | `@tsparticles/template-scaffold` |
| Vue 3     | `--framework vue3`    | `@tsparticles/template-scaffold` |
| Angular   | `--framework angular` | `@tsparticles/template-scaffold` |
| Svelte    | `--framework svelte`  | `@tsparticles/template-scaffold` |
| Solid     | `--framework solid`   | `@tsparticles/template-scaffold` |

Example:

```bash
npx tsparticles-create app my-react-app --template scaffold --framework react
cd my-react-app
npm install
npm run dev
```

## Use-case templates

Use-case templates are complete example applications that demonstrate real-world tsParticles usage.

| Template    | Description                                     | CLI template name | Package                           |
| ----------- | ----------------------------------------------- | ----------------- | --------------------------------- |
| Login       | Login/register page with particle background    | `login`           | `@tsparticles/template-login`     |
| Portfolio   | Personal portfolio with animated hero           | `portfolio`       | `@tsparticles/template-portfolio` |
| Landing     | Marketing landing page with impactful particles | `landing`         | `@tsparticles/template-landing`   |
| Tic Tac Toe | Tic-tac-toe game with confetti celebration      | `tictactoe`       | `@tsparticles/template-tictactoe` |
| Confetti    | Confetti cannon demo                            | `confetti`        | `@tsparticles/template-confetti`  |
| Ribbons     | Ribbon animation demo                           | `ribbons`         | `@tsparticles/template-ribbons`   |
| Particles   | Classic particles.js-style demo                 | `particles`       | `@tsparticles/template-particles` |

Example:

```bash
npx tsparticles-create app my-portfolio --template portfolio --framework vanilla
cd my-portfolio
npm install
npm run dev
```

## npm create wrappers

For bundle-specific templates, you can use dedicated npm create wrappers:

| Command                         | Template    | Framework   | Installed bundle         |
| ------------------------------- | ----------- | ----------- | ------------------------ |
| `npm create tsparticles@latest` | Interactive | Interactive | User choice              |
| `npm create particles@latest`   | `particles` | Vanilla     | `@tsparticles/particles` |
| `npm create confetti@latest`    | `confetti`  | Vanilla     | `@tsparticles/confetti`  |
| `npm create ribbons@latest`     | `ribbons`   | Vanilla     | `@tsparticles/ribbons`   |

## CLI reference

```bash
tsparticles-create app [destination] [options]

Options:
  --template <name>     Template to use (scaffold|login|portfolio|landing|tictactoe|confetti|ribbons|particles)
  --framework <name>    Framework (vanilla|react|vue3|angular|svelte|solid)
  --skip-install        Skip npm install after scaffolding
  -h, --help            Display help
```

## Related pages

- [`/guide/frameworks`](/guide/frameworks)
- [`/guide/wrappers`](/guide/wrappers)
- [`/demos/`](/demos/)
