---
# Modelli e risorse

tsParticles fornisce due categorie di modelli: **modelli scaffold** (scheletri di framework) e **modelli per casi d'uso** (applicazioni di esempio complete).

## Avvio rapido con la CLI

Il modo più semplice per utilizzare qualsiasi modello è tramite la CLI:

```bash
npm create tsparticles@latest
```

Oppure utilizza direttamente un bundle specifico:

```bash
npm create particles@latest
npm create confetti@latest
npm create ribbons@latest
```

Per un utilizzo non interattivo:

```bash
npx tsparticles-create app my-project --template scaffold --framework react
npx tsparticles-create app my-project --template confetti --framework vanilla
```

## Modelli scaffold

I modelli scaffold forniscono uno scheletro di progetto minimo Vite + TypeScript con tsParticles preconfigurato. Sono disponibili per i seguenti framework:

| Framework | Opzione CLI        | Pacchetto                        |
| --------- | ----------------- | -------------------------------- |
| Vanilla   | `--framework vanilla` | `@tsparticles/template-scaffold` |
| React     | `--framework react`   | `@tsparticles/template-scaffold` |
| Vue 3     | `--framework vue3`    | `@tsparticles/template-scaffold` |
| Angular   | `--framework angular` | `@tsparticles/template-scaffold` |
| Svelte    | `--framework svelte`  | `@tsparticles/template-scaffold` |
| Solid     | `--framework solid`   | `@tsparticles/template-scaffold` |

Esempio:

```bash
npx tsparticles-create app my-react-app --template scaffold --framework react
cd my-react-app
npm install
npm run dev
```

## Modelli per casi d'uso

I modelli per casi d'uso sono applicazioni di esempio complete che dimostrano l'utilizzo reale di tsParticles.

| Modello    | Descrizione                                       | Nome CLI modello | Pacchetto                         |
| ---------- | ------------------------------------------------- | ---------------- | --------------------------------- |
| Login      | Pagina di login/registrazione con sfondo a particelle | `login`        | `@tsparticles/template-login`     |
| Portfolio  | Portfolio personale con hero animato              | `portfolio`      | `@tsparticles/template-portfolio` |
| Landing    | Pagina di atterraggio marketing con particelle d'impatto | `landing`   | `@tsparticles/template-landing`   |
| Tic Tac Toe| Gioco del tris con festa di coriandoli           | `tictactoe`      | `@tsparticles/template-tictactoe` |
| Confetti   | Demo del cannone di coriandoli                    | `confetti`       | `@tsparticles/template-confetti`  |
| Ribbons    | Demo di animazione a nastri                       | `ribbons`        | `@tsparticles/template-ribbons`   |
| Particles  | Demo classica in stile particles.js               | `particles`      | `@tsparticles/template-particles` |

Esempio:

```bash
npx tsparticles-create app my-portfolio --template portfolio --framework vanilla
cd my-portfolio
npm install
npm run dev
```

## Wrapper npm create

Per i modelli specifici di un bundle, puoi utilizzare wrapper npm create dedicati:

| Comando                           | Modello     | Framework | Bundle installato           |
| -------------------------------- | ----------- | --------- | --------------------------- |
| `npm create tsparticles@latest`  | Interattivo | Interattivo | Scelta dell'utente         |
| `npm create particles@latest`    | `particles` | Vanilla    | `@tsparticles/particles`    |
| `npm create confetti@latest`     | `confetti`  | Vanilla    | `@tsparticles/confetti`     |
| `npm create ribbons@latest`      | `ribbons`   | Vanilla    | `@tsparticles/ribbons`      |

## Riferimento CLI

```bash
tsparticles-create app [destination] [options]

Options:
  --template <name>     Template to use (scaffold|login|portfolio|landing|tictactoe|confetti|ribbons|particles)
  --framework <name>    Framework (vanilla|react|vue3|angular|svelte|solid)
  --skip-install        Skip npm install after scaffolding
  -h, --help            Display help
```

## Pagine correlate

- [`/guide/frameworks`](/guide/frameworks)
- [`/guide/wrappers`](/guide/wrappers)
- [`/demos/`](/demos/)
