# टेम्पलेट और संसाधन

tsParticles दो श्रेणियों के टेम्पलेट प्रदान करता है: **स्कैफ़ोल्ड टेम्पलेट** (फ्रेमवर्क स्केलेटन) और **उपयोग-केस टेम्पलेट** (पूर्ण उदाहरण अनुप्रयोग)।

## CLI के साथ त्वरित आरंभ

किसी भी टेम्पलेट का उपयोग करने का सबसे आसान तरीका CLI के माध्यम से है:

```bash
npm create tsparticles@latest
```

या सीधे किसी विशिष्ट बंडल का उपयोग करें:

```bash
npm create particles@latest
npm create confetti@latest
npm create ribbons@latest
```

गैर-इंटरैक्टिव उपयोग के लिए:

```bash
npx tsparticles-create app my-project --template scaffold --framework react
npx tsparticles-create app my-project --template confetti --framework vanilla
```

## स्कैफ़ोल्ड टेम्पलेट

स्कैफ़ोल्ड टेम्पलेट tsParticles के साथ पूर्व-कॉन्फ़िगर एक न्यूनतम Vite + TypeScript प्रोजेक्ट स्केलेटन प्रदान करते हैं। ये निम्नलिखित फ्रेमवर्क के लिए उपलब्ध हैं:

| Framework | CLI option            | Package                          |
| --------- | --------------------- | -------------------------------- |
| Vanilla   | `--framework vanilla` | `@tsparticles/template-scaffold` |
| React     | `--framework react`   | `@tsparticles/template-scaffold` |
| Vue 3     | `--framework vue3`    | `@tsparticles/template-scaffold` |
| Angular   | `--framework angular` | `@tsparticles/template-scaffold` |
| Svelte    | `--framework svelte`  | `@tsparticles/template-scaffold` |
| Solid     | `--framework solid`   | `@tsparticles/template-scaffold` |

उदाहरण:

```bash
npx tsparticles-create app my-react-app --template scaffold --framework react
cd my-react-app
npm install
npm run dev
```

## उपयोग-केस टेम्पलेट

उपयोग-केस टेम्पलेट पूर्ण उदाहरण अनुप्रयोग हैं जो वास्तविक दुनिया में tsParticles के उपयोग को प्रदर्शित करते हैं।

| Template    | Description                                     | CLI template name | Package                           |
| ----------- | ----------------------------------------------- | ----------------- | --------------------------------- |
| Login       | Login/register page with particle background    | `login`           | `@tsparticles/template-login`     |
| Portfolio   | Personal portfolio with animated hero           | `portfolio`       | `@tsparticles/template-portfolio` |
| Landing     | Marketing landing page with impactful particles | `landing`         | `@tsparticles/template-landing`   |
| Tic Tac Toe | Tic-tac-toe game with confetti celebration      | `tictactoe`       | `@tsparticles/template-tictactoe` |
| Confetti    | Confetti cannon demo                            | `confetti`        | `@tsparticles/template-confetti`  |
| Ribbons     | Ribbon animation demo                           | `ribbons`         | `@tsparticles/template-ribbons`   |
| Particles   | Classic particles.js-style demo                 | `particles`       | `@tsparticles/template-particles` |

उदाहरण:

```bash
npx tsparticles-create app my-portfolio --template portfolio --framework vanilla
cd my-portfolio
npm install
npm run dev
```

## npm create रैपर

बंडल-विशिष्ट टेम्पलेट के लिए, आप समर्पित npm create रैपर का उपयोग कर सकते हैं:

| Command                         | Template    | Framework   | Installed bundle         |
| ------------------------------- | ----------- | ----------- | ------------------------ |
| `npm create tsparticles@latest` | Interactive | Interactive | User choice              |
| `npm create particles@latest`   | `particles` | Vanilla     | `@tsparticles/particles` |
| `npm create confetti@latest`    | `confetti`  | Vanilla     | `@tsparticles/confetti`  |
| `npm create ribbons@latest`     | `ribbons`   | Vanilla     | `@tsparticles/ribbons`   |

## CLI संदर्भ

```bash
tsparticles-create app [destination] [options]

Options:
  --template <name>     Template to use (scaffold|login|portfolio|landing|tictactoe|confetti|ribbons|particles)
  --framework <name>    Framework (vanilla|react|vue3|angular|svelte|solid)
  --skip-install        Skip npm install after scaffolding
  -h, --help            Display help
```

## संबंधित पृष्ठ

- [`/guide/frameworks`](/guide/frameworks)
- [`/guide/wrappers`](/guide/wrappers)
- [`/demos/`](/demos/)
