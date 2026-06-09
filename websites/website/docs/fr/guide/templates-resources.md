---
# Modèles et ressources

tsParticles propose deux catégories de modèles : les **modèles d'échafaudage** (squelettes de framework) et les **modèles d'usage** (applications d'exemple complètes).

## Démarrage rapide avec la CLI

Le moyen le plus simple d'utiliser un modèle est via la CLI :

```bash
npm create tsparticles@latest
```

Ou utilisez directement un bundle spécifique :

```bash
npm create particles@latest
npm create confetti@latest
npm create ribbons@latest
```

Pour une utilisation non interactive :

```bash
npx tsparticles-create app my-project --template scaffold --framework react
npx tsparticles-create app my-project --template confetti --framework vanilla
```

## Modèles d'échafaudage

Les modèles d'échafaudage fournissent un squelette de projet Vite + TypeScript minimal avec tsParticles préconfiguré. Ils sont disponibles pour les frameworks suivants :

| Framework | Option CLI            | Package                           |
| --------- | --------------------- | --------------------------------- |
| Vanilla   | `--framework vanilla` | `@tsparticles/template-scaffold` |
| React     | `--framework react`   | `@tsparticles/template-scaffold` |
| Vue 3     | `--framework vue3`    | `@tsparticles/template-scaffold` |
| Angular   | `--framework angular` | `@tsparticles/template-scaffold` |
| Svelte    | `--framework svelte`  | `@tsparticles/template-scaffold` |
| Solid     | `--framework solid`   | `@tsparticles/template-scaffold` |

Exemple :

```bash
npx tsparticles-create app my-react-app --template scaffold --framework react
cd my-react-app
npm install
npm run dev
```

## Modèles d'usage

Les modèles d'usage sont des applications d'exemple complètes qui illustrent une utilisation réelle de tsParticles.

| Modèle     | Description                                       | Nom du modèle CLI | Package                          |
| ---------- | ------------------------------------------------- | ----------------- | -------------------------------- |
| Login      | Page de connexion/inscription avec fond de particules | `login`        | `@tsparticles/template-login`    |
| Portfolio  | Portfolio personnel avec hero animé               | `portfolio`       | `@tsparticles/template-portfolio`|
| Landing    | Page d'atterrissage marketing avec particules percutantes | `landing`  | `@tsparticles/template-landing`  |
| Tic Tac Toe| Jeu de morpion avec célébration en confettis      | `tictactoe`       | `@tsparticles/template-tictactoe`|
| Confetti   | Démo de canon à confettis                         | `confetti`        | `@tsparticles/template-confetti` |
| Ribbons    | Démo d'animation de rubans                        | `ribbons`         | `@tsparticles/template-ribbons`  |
| Particles  | Démo classique style particles.js                 | `particles`       | `@tsparticles/template-particles`|

Exemple :

```bash
npx tsparticles-create app my-portfolio --template portfolio --framework vanilla
cd my-portfolio
npm install
npm run dev
```

## Raccourcis npm create

Pour les modèles spécifiques à un bundle, vous pouvez utiliser des raccourcis dédiés npm create :

| Commande                         | Modèle      | Framework | Bundle installé           |
| -------------------------------- | ----------- | --------- | ------------------------- |
| `npm create tsparticles@latest`  | Interactif  | Interactif | Choix de l'utilisateur   |
| `npm create particles@latest`    | `particles` | Vanilla    | `@tsparticles/particles` |
| `npm create confetti@latest`     | `confetti`  | Vanilla    | `@tsparticles/confetti`  |
| `npm create ribbons@latest`      | `ribbons`   | Vanilla    | `@tsparticles/ribbons`   |

## Référence CLI

```bash
tsparticles-create app [destination] [options]

Options:
  --template <name>     Modèle à utiliser (scaffold|login|portfolio|landing|tictactoe|confetti|ribbons|particles)
  --framework <name>    Framework (vanilla|react|vue3|angular|svelte|solid)
  --skip-install        Ignorer npm install après l'échafaudage
  -h, --help            Afficher l'aide
```

## Pages connexes

- [`/guide/frameworks`](/fr/guide/frameworks)
- [`/guide/wrappers`](/fr/guide/wrappers)
- [`/demos/`](/fr/demos/)
