# Plantillas y recursos

tsParticles proporciona dos categorías de plantillas: **plantillas de andamio** (esqueletos de framework) y **plantillas de caso de uso** (aplicaciones de ejemplo completas).

## Inicio rápido con CLI

La forma más fácil de usar cualquier plantilla es a través de la CLI:

```bash
npm create tsparticles@latest
```

O use un bundle específico directamente:

```bash
npm create particles@latest
npm create confetti@latest
npm create ribbons@latest
```

Para uso no interactivo:

```bash
npx tsparticles-create app my-project --template scaffold --framework react
npx tsparticles-create app my-project --template confetti --framework vanilla
```

## Plantillas de andamio

Las plantillas de andamio proporcionan un esqueleto de proyecto mínimo con Vite + TypeScript y tsParticles preconfigurado. Están disponibles para los siguientes frameworks:

| Framework | Opción CLI          | Paquete                          |
| --------- | ------------------- | -------------------------------- |
| Vanilla   | `--framework vanilla` | `@tsparticles/template-scaffold` |
| React     | `--framework react`   | `@tsparticles/template-scaffold` |
| Vue 3     | `--framework vue3`    | `@tsparticles/template-scaffold` |
| Angular   | `--framework angular` | `@tsparticles/template-scaffold` |
| Svelte    | `--framework svelte`  | `@tsparticles/template-scaffold` |
| Solid     | `--framework solid`   | `@tsparticles/template-scaffold` |

Ejemplo:

```bash
npx tsparticles-create app my-react-app --template scaffold --framework react
cd my-react-app
npm install
npm run dev
```

## Plantillas de caso de uso

Las plantillas de caso de uso son aplicaciones de ejemplo completas que demuestran el uso real de tsParticles.

| Plantilla   | Descripción                                         | Nombre CLI de plantilla | Paquete                           |
| ----------- | --------------------------------------------------- | ----------------------- | --------------------------------- |
| Login       | Página de inicio de sesión/registro con fondo de partículas | `login`           | `@tsparticles/template-login`     |
| Portfolio   | Portafolio personal con héroe animado               | `portfolio`             | `@tsparticles/template-portfolio` |
| Landing     | Página de aterrizaje de marketing con partículas impactantes | `landing`         | `@tsparticles/template-landing`   |
| Tic Tac Toe | Juego de tres en raya con celebración de confeti    | `tictactoe`             | `@tsparticles/template-tictactoe` |
| Confetti    | Demo de cañón de confeti                            | `confetti`              | `@tsparticles/template-confetti`  |
| Ribbons     | Demo de animación de cintas                         | `ribbons`               | `@tsparticles/template-ribbons`   |
| Particles   | Demo clásico al estilo particles.js                 | `particles`             | `@tsparticles/template-particles` |

Ejemplo:

```bash
npx tsparticles-create app my-portfolio --template portfolio --framework vanilla
cd my-portfolio
npm install
npm run dev
```

## Wrappers de npm create

Para plantillas específicas de un bundle, puede usar wrappers dedicados de npm create:

| Comando                           | Plantilla   | Framework | Bundle instalado           |
| --------------------------------- | ----------- | --------- | -------------------------- |
| `npm create tsparticles@latest`   | Interactiva | Interactivo | Elección del usuario      |
| `npm create particles@latest`     | `particles` | Vanilla    | `@tsparticles/particles`  |
| `npm create confetti@latest`      | `confetti`  | Vanilla    | `@tsparticles/confetti`   |
| `npm create ribbons@latest`       | `ribbons`   | Vanilla    | `@tsparticles/ribbons`    |

## Referencia de CLI

```bash
tsparticles-create app [destination] [options]

Options:
  --template <name>     Plantilla a usar (scaffold|login|portfolio|landing|tictactoe|confetti|ribbons|particles)
  --framework <name>    Framework (vanilla|react|vue3|angular|svelte|solid)
  --skip-install        Omitir npm install después del andamiaje
  -h, --help            Mostrar ayuda
```

## Páginas relacionadas

- [`/guide/frameworks`](/guide/frameworks)
- [`/guide/wrappers`](/guide/wrappers)
- [`/demos/`](/demos/)
