# Bundles गाइड

यह पेज आपको सही `tsParticles` bundle चुनने और उसे जल्दी setup करने में मदद करता है।

## पैकेज तुलना

| पैकेज                    | किसके लिए बेहतर                          | setup स्टाइल                                   |
| ------------------------ | ---------------------------------------- | ---------------------------------------------- |
| `@tsparticles/basic`     | बहुत हल्के सेटअप                         | `tsParticles` + `await loadBasic(tsParticles)` |
| `@tsparticles/slim`      | ज्यादातर वेबसाइट/ऐप्स                    | `tsParticles` + `await loadSlim(tsParticles)`  |
| `tsparticles`            | official full फीचर सेट और engine control | `tsParticles` + `await loadFull(tsParticles)`  |
| `@tsparticles/all`       | सभी फीचर्स, तेज prototyping              | `tsParticles` + `await loadAll(tsParticles)`   |
| `@tsparticles/confetti`  | one-call confetti effects                | `await confetti(options)`                      |
| `@tsparticles/fireworks` | one-call fireworks effects               | `await fireworks(options)`                     |
| `@tsparticles/particles` | सरल particles background API             | `await particles(options)`                     |

## Bundle guides

- Basic: [`/guide/bundles-basic`](/hi/guide/bundles-basic)
- Slim: [`/guide/bundles-slim`](/hi/guide/bundles-slim)
- tsparticles (Full): [`/guide/bundles-full`](/hi/guide/bundles-full)
- All: [`/guide/bundles-all`](/hi/guide/bundles-all)
- Confetti: [`/guide/bundles-confetti`](/hi/guide/bundles-confetti)
- Fireworks: [`/guide/bundles-fireworks`](/hi/guide/bundles-fireworks)
- Particles: [`/guide/bundles-particles`](/hi/guide/bundles-particles)

## इंस्टॉलेशन

अपने use case के अनुसार पैकेज path इंस्टॉल करें।

```bash
pnpm add @tsparticles/engine @tsparticles/basic
pnpm add @tsparticles/engine @tsparticles/slim
pnpm add @tsparticles/engine tsparticles
pnpm add @tsparticles/engine @tsparticles/all
pnpm add @tsparticles/confetti
pnpm add @tsparticles/fireworks
pnpm add @tsparticles/particles
```

CDN links और दूसरे package-manager variants चाहिए?

- देखें [`/guide/installation`](/hi/guide/installation)।

## Setup उदाहरण

### Engine + loader bundles (`basic`, `slim`, `full`, `all`)

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

बाकी presets के लिए सिर्फ loader import/function बदलें:

- `@tsparticles/basic` -> `loadBasic`
- `tsparticles` -> `loadFull`
- `@tsparticles/all` -> `loadAll`

### Focused APIs (`confetti`, `fireworks`, `particles`)

```ts
import { confetti } from "@tsparticles/confetti";
import { fireworks } from "@tsparticles/fireworks";
import { particles } from "@tsparticles/particles";

await confetti({ count: 80, spread: 60 });
await fireworks({ sounds: false });
await particles({ count: 100, links: true });
```

ये APIs तब शानदार हैं जब आप बहुत सारे engine plugins manually wire किए बिना जल्दी integration चाहते हैं।

## व्यावहारिक चयन नियम

1. ज्यादातर प्रोजेक्ट्स में `@tsparticles/slim` से शुरू करें।
2. अगर bundle size आपकी top priority है और features सरल हैं, तो `@tsparticles/basic` चुनें।
3. full baseline और `loadFull` चाहिए हो तो `tsparticles` चुनें।
4. prototyping के लिए या तुरंत ज्यादा features चाहिए हों तो `@tsparticles/all` चुनें।
5. UI में focused effect और minimal setup चाहिए हो तो `@tsparticles/confetti`, `@tsparticles/fireworks` या `@tsparticles/particles` चुनें।

## संबंधित पेज

- Playground focused bundles: [`/playground/bundles`](/hi/playground/bundles)
- Getting started path: [`/guide/getting-started`](/hi/guide/getting-started)
- Installation matrix: [`/guide/installation`](/hi/guide/installation)
- Wrappers overview: [`/guide/wrappers`](/hi/guide/wrappers)
