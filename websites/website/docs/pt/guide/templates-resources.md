---
# Modelos e Recursos

O tsParticles fornece duas categorias de modelos: **modelos de scaffold** (esqueletos de framework) e **modelos de caso de uso** (aplicações de exemplo completas).

## Início rápido com CLI

A maneira mais fácil de usar qualquer modelo é através da CLI:

```bash
npm create tsparticles@latest
```

Ou use um bundle específico diretamente:

```bash
npm create particles@latest
npm create confetti@latest
npm create ribbons@latest
```

Para uso não interativo:

```bash
npx tsparticles-create app my-project --template scaffold --framework react
npx tsparticles-create app my-project --template confetti --framework vanilla
```

## Modelos de scaffold

Os modelos de scaffold fornecem um esqueleto de projeto Vite + TypeScript mínimo com tsParticles pré-configurado. Eles estão disponíveis para os seguintes frameworks:

| Framework | Opção CLI          | Pacote                           |
| --------- | ------------------ | -------------------------------- |
| Vanilla   | `--framework vanilla` | `@tsparticles/template-scaffold` |
| React     | `--framework react`   | `@tsparticles/template-scaffold` |
| Vue 3     | `--framework vue3`    | `@tsparticles/template-scaffold` |
| Angular   | `--framework angular` | `@tsparticles/template-scaffold` |
| Svelte    | `--framework svelte`  | `@tsparticles/template-scaffold` |
| Solid     | `--framework solid`   | `@tsparticles/template-scaffold` |

Exemplo:

```bash
npx tsparticles-create app my-react-app --template scaffold --framework react
cd my-react-app
npm install
npm run dev
```

## Modelos de caso de uso

Os modelos de caso de uso são aplicações de exemplo completas que demonstram o uso real do tsParticles.

| Modelo     | Descrição                                          | Nome do modelo CLI | Pacote                            |
| ---------- | -------------------------------------------------- | ------------------ | --------------------------------- |
| Login      | Página de login/registro com fundo de partículas   | `login`            | `@tsparticles/template-login`     |
| Portfolio  | Portfólio pessoal com hero animado                 | `portfolio`        | `@tsparticles/template-portfolio` |
| Landing    | Página de landing marketing com partículas impactantes | `landing`      | `@tsparticles/template-landing`   |
| Tic Tac Toe| Jogo da velha com celebração de confete            | `tictactoe`        | `@tsparticles/template-tictactoe` |
| Confetti   | Demonstração de canhão de confete                  | `confetti`         | `@tsparticles/template-confetti`  |
| Ribbons    | Demonstração de animação de fitas                  | `ribbons`          | `@tsparticles/template-ribbons`   |
| Particles  | Demonstração clássica estilo particles.js          | `particles`        | `@tsparticles/template-particles` |

Exemplo:

```bash
npx tsparticles-create app my-portfolio --template portfolio --framework vanilla
cd my-portfolio
npm install
npm run dev
```

## Wrappers npm create

Para modelos específicos de bundle, você pode usar wrappers npm create dedicados:

| Comando                           | Modelo      | Framework | Bundle instalado          |
| --------------------------------- | ----------- | --------- | ------------------------- |
| `npm create tsparticles@latest`   | Interativo  | Interativo | Escolha do usuário       |
| `npm create particles@latest`     | `particles` | Vanilla    | `@tsparticles/particles` |
| `npm create confetti@latest`      | `confetti`  | Vanilla    | `@tsparticles/confetti`  |
| `npm create ribbons@latest`       | `ribbons`   | Vanilla    | `@tsparticles/ribbons`   |

## Referência da CLI

```bash
tsparticles-create app [destination] [options]

Options:
  --template <name>     Template to use (scaffold|login|portfolio|landing|tictactoe|confetti|ribbons|particles)
  --framework <name>    Framework (vanilla|react|vue3|angular|svelte|solid)
  --skip-install        Skip npm install after scaffolding
  -h, --help            Display help
```

## Páginas relacionadas

- [`/guide/frameworks`](/guide/frameworks)
- [`/guide/wrappers`](/guide/wrappers)
- [`/demos/`](/demos/)
