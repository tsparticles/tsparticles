# v5 माइग्रेशन गाइड — E10 कार्यशील मसौदा

स्थिति: E10 कार्यशील मसौदा, 2026-11-27 को अपडेट किया गया। मौजूदा उम्मीदवार के लिए इंस्टॉल किए गए पैकेज और ब्राउज़र की E9 जाँच सफल रही। यह गाइड engine, wrappers, bundles और रंगों के लागू v5 contracts बताती है। अपडेट किए गए E10 आकार मानदंड के अनुसार E0 size ceilings निदान-संदर्भ के रूप में दिखाई जाती हैं; इन्हें पास नहीं माना गया है। Callback-विहीन renderer follow-up सभी 30 E0 runtime checks पास करता है, जिनमें forced HDR पंक्तियाँ भी शामिल हैं। M4/500 में update और render तय E0 सीमाओं के भीतर हैं; frame p95 7.20 ms है, जो ऐतिहासिक E5 संदर्भ से 0.05 ms अधिक है। Hardware HDR जाँच और आवश्यक दस्तावेज़ समीक्षा अभी खुली हैं।

MCP से बना TypeScript उदाहरण और सभी 20 CLI scaffolds (Vanilla और 19 frameworks) type-check, production build और Chrome startup बिना page या console errors के पास करते हैं। पैक किए गए सभी नौ template families में हटाए गए Vue 2, Nuxt 2 या Nuxt 3 variants नहीं हैं। नौ मसौदों की भाषाई समीक्षा और hardware पर HDR/browser जाँच अभी खुली हैं। ये आंतरिक मसौदे हैं, प्रकाशन के लिए अंतिम migration guides नहीं।

मौजूदा वेबसाइट के default और स्थानीयकृत Vanilla guides byte-for-byte समान हैं और प्रकाशित v4 CDN packages का उपयोग करते हैं। उनके singleton उदाहरण v5 migration page तैयार होने तक v4 दस्तावेज़ बने रहेंगे; वे v5 consumer checks में नहीं गिने जाते।

## Engine का स्वामित्व

`tsParticles` singleton के imports को `createEngine()` से बदलें। लौटे instance को application scope में रखें, हर loader को दें और wrappers/providers को स्पष्ट रूप से दें। स्थानीय variable का नाम `tsParticles` रह सकता है। Component teardown केवल अपने container का प्रबंधन करता है; उसी engine के असंबंधित containers को नष्ट नहीं करना चाहिए।

E2 implementation में random/logger customization और animation scheduling हर instance के स्वामित्व में हैं। Custom plugins को `container.engine` (या `container.pluginManager.engine`) में register करें, ताकि runtime services owning engine का उपयोग करें।

## हटाए गए Framework Integrations

| Integration                                | Migration लक्ष्य                                       | हटाना / सत्यापन           |
| ------------------------------------------ | ---------------------------------------------------- | ------------------------ |
| Vue 2 wrapper, demo और starter references  | Application को Vue 3 और `@tsparticles/vue3` पर ले जाएँ | E1 में हटे; E9 में दोबारा जाँचे |
| Nuxt 2 wrapper, demo और starter references | Nuxt 4 और `@tsparticles/nuxt4` पर जाएँ                | E1 में हटे; E9 में दोबारा जाँचे |
| Nuxt 3 wrapper, demo और starter references | Nuxt 4 और `@tsparticles/nuxt4` पर जाएँ                | E1 में हटे; E9 में दोबारा जाँचे |

Framework upgrade application migration है, package rename भर नहीं। E0 reference search [`../../e0/retirement-references.txt`](../../e0/retirement-references.txt) में है। हटाते समय installers, generated strings, documentation और translations भी जाँचें। Matrix में वे maintained consumers भी हैं जिन्हें explicit engines चाहिए।

## अप्रचलित APIs

RGB लौटाने वाला `colorMix()` हटा दिया गया। Engine के पुराने `getStyleFromRgb()` और `getStyleFromHsl()` helpers, HSV plugin का `getStyleFromHsv()`, और OKLCH package का local `getStyleFromOklch()` formatter भी हटाए गए। RGB को `rgbToOklch()` से, HSL को `rgbToOklch(hslToRgbFloat(color))` से बदलें। HSV options को registered HSV color manager के जरिए `rangeColorToOklch(engine.pluginManager, { value: { hsv: color } })` से हल करें। Canonical परिणाम engine के `getStyleFromOklch()` को दें; यह destination gamut और HDR settings संभालता है। यदि output को सचमुच केवल RGB होना है, तो `mapOklchToSrgb(result).rgb` उपयोग करें।

### Interactor Lifecycle Hooks

Interactor base classes default no-op `reset()` देती हैं। External interactor base भी no-op `clear()` देती है। Manager interactor initialization के बाद, redraw initialization सहित, custom hooks चुनता है। State रखने या reset के दौरान काम करने वाले overrides बनाए रखें; `noImplicitOverride` में TypeScript `override` modifier जोड़ें।

[अप्रचलित API सूची](../../e9/deprecated-migrations.md) में हटाए गए color formatters, Confetti और Ribbons options तथा रखे गए opt-in particles.js compatibility surface का विवरण है। Compiler को Stencil 5 पर ले जाते समय, यदि hydration से पहले registration पूरा होना चाहिए, तो `applyPolyfills()` हटाएँ और `defineCustomElements()` का इंतज़ार करें। मौजूदा tsParticles Stencil wrapper Stencil 4 उपयोग करता है और अभी `applyPolyfills()` घोषित करता है।

## रंग, Options और Public Contracts

Color inputs अब भी समर्थित RGB, HSL, HSV, HWB, Lab, LCH, OKLab, CSS strings, arrays और ranges स्वीकारते हैं। Particle animation अब OKLCH contract उपयोग करता है: पुराने HSL components `{ h, s, l }` को `{ h, c, l }` से बदलें। Hue कोण रहता है; chroma और lightness v5 की OKLCH numeric scale उपयोग करते हैं और alpha अलग opacity value है। HSL saturation को chroma में copy न करें। Input boundary पर रंग बदलें या engine से parse कराने के लिए समर्थित CSS/RGB input रखें। Color extension point लागू करने वाले managers वर्तमान OKLCH manager contract का पालन करें; accepted inputs, gamut mapping, alpha और HDR के लिए [color decisions](../../../V5-COLOR-DECISIONS.md) देखें।

## E1 में लागू Explicit-Engine APIs

```ts
import { createEngine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const engine = createEngine();
await loadSlim(engine);
const container = await engine.load({ id: "particles", options: {} });
container?.destroy();
```

Root, `/lazy` और browser module entries engine नहीं बनाते और `globalThis` पर object प्रकाशित नहीं करते। Classic Rollup scripts factory/loader namespace देते हैं:

```js
const engine = tsParticles.createEngine();
await tsParticles.loadSlim(engine);
await engine.load({ id: "particles", options: {} });
```

Standalone bundle में engine definitions होते हैं; external feature scripts के लिए पहले matching engine और dependencies चाहिए। Package versions समान रखें। Namespace में definitions हैं, engine नहीं। दूसरा bundle load करने से पहले बनाया engine नष्ट नहीं होता। एक canvas का मालिक केवल एक engine हो सकता है, अलग bundles की engine copies में भी। Canvas transfer करने से पहले owner नष्ट करें। अलग canvases पर समान IDs, engines के बीच स्वतंत्र रहती हैं।

जब अलग plugin registries, random sources, loggers, schedulers या container ownership चाहिए तो अलग engine उपयोग करें। जिस engine में feature चाहिए, उस हर engine पर उसे register करें:

```ts
import { createEngine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const editor = createEngine();
const preview = createEngine();
await Promise.all([loadSlim(editor), loadSlim(preview)]);

const editorContainer = await editor.load({ id: "editor", options: {} });
const previewContainer = await preview.load({ id: "preview", options: {} });

editorContainer?.destroy();
previewContainer?.destroy();
```

Convenience packages `createConfetti(engine)`, `createFireworks(engine)`, `createParticles(engine)` और `createRibbons(engine)` export करते हैं। लौटाया callable उसी engine से बंधा होता है और `init`, `create`, `version` रखता है:

```ts
import { createEngine } from "@tsparticles/engine";
import { createConfetti } from "@tsparticles/confetti";

const confetti = createConfetti(createEngine());
await confetti({ count: 30, spread: 70 });
```

`initPjs(engine)` `{ particlesJS, pJSDom, Particles }` लौटाता है; ये compatibility APIs `globalThis` पर नहीं रखी जातीं। `loadConfigs(engine)` catalog और palettes को उस engine पर स्पष्ट रूप से register करता है।

| Wrapper family                                | Engine ownership और registration                                                                                                            |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| React / Next.js                               | `engine` को `ParticlesProvider` दें और आवश्यक plugins load करने वाला `init` registrar दें।                                                        |
| Vue 3                                         | `{ engine, init }` से particles provider install करें; descendants में `useParticlesProvider()` call करें।                                         |
| Angular                                       | `service.init(engine, registrar)` को engine दें और हर स्वतंत्र engine के लिए अलग service provider रखें। Convenience components को `engine` input दें। |
| Preact, Solid, Inferno, Svelte, Stencil, Riot | Component/provider API से engine दें और उपलब्ध होने पर `initParticlesEngine(engine, registrar)` से initialize करें।                                 |
| Qwik                                          | Client पर बनाएँ/register करें और `noSerialize` से रखें; server rendering में engine न बनाएँ।                                                         |
| Custom elements                               | `.engine` को property के रूप में set करें; यह serialized HTML attribute नहीं है।                                                                    |
| Nuxt 4                                        | Configured initialization module से export हुए `engine` और `registerParticles` उपयोग करें।                                                      |

Framework-specific signatures और SSR सीमाएँ हर wrapper README में हैं। Provider के भीतर module-level implicit engine दोबारा न बनाएँ।

Component teardown केवल उसका अपना container नष्ट करता है। Shared engine का lifecycle application के पास है; उसे हटाने से पहले pending loads पूरे करें और containers नष्ट करें। Runtime services हर engine के स्वामित्व में हैं; container load से पहले उन्हें configure करें:

```ts
const engine = createEngine();
engine.setRandom(myRandomFn);
engine.setLogger(myLogger);
engine.setAnimationFunctions(requestFrame, cancelFrame);
const container = await engine.load({ id: "particles", options });
```

पुराने global APIs `setParticlesRandom`, `getParticlesRandom`, `getParticlesRandomFn`, `setParticlesLogger` और `getParticlesLogger` हटा दिए गए हैं। इनके बदले `engine.setRandom`, `engine.getRandom`, `engine.getRandomFn`, `engine.setLogger` और `engine.getLogger` उपयोग करें। Custom plugins owner को `container.engine` या `container.pluginManager.engine` से पा सकते हैं। Runtime helpers को explicit random provider दें; owner engine का stable `getRandomFn()` provider उपयोग करें, ताकि source में बाद के बदलाव अन्य engines को प्रभावित न करें। Animation scheduling भी प्रति-engine है; container frames उसी scheduler द्वारा cancel होते हैं जिसने उन्हें बनाया।

### Initialization का क्रम

`initParticlesEngine` देने वाले wrappers में application initialization के समय `initParticlesEngine(engine, registrar)` call करें। Components पहले mount हो सकते हैं; वे उसी engine के initialization का इंतज़ार करते हैं और implicit engine नहीं बनाते। jQuery के लिए `$.particles(engine).init(registrar)` उपयोग करें। React/Vue providers और Angular service initialization यही चरण पूरा करते हैं। Registration विफल होने पर मौजूदा waiters reject होते हैं और initialization फिर आज़माई जा सकती है।

## Module और Browser Entrypoints

Standard ESM API के लिए package root import करें। Deferred entrypoint के लिए `/lazy` subpath लें; dynamic loading पुराना singleton वापस नहीं लाता। Installed-package checks root और `/lazy` पर ESM `import`, CJS `require` और `browser` condition जाँचते हैं।

Classic browser output में Rollup namespace factories और feature loaders रखता है। Namespace script load होने के बाद engine बनाएँ और हर loader को दें। External feature scripts को matching engine और साझा dependencies चाहिए; bundle browser README का क्रम और मेल खाते versions अपनाएँ। Standalone bundle चुने हुए features रखता है। Browser entrypoint load करने या package root import करने से engine अपने आप नहीं बनता।

## Package सीमाएँ और हटाए गए Singleton APIs

Runtime types और `createEngine` को `@tsparticles/engine` से import करें, फिर केवल आवश्यक feature packages जोड़ें, जैसे `@tsparticles/slim` या dedicated interaction/shape/updater package। Convenience packages अलग adapters हैं। दूसरे package के internal `dist` या source path के बजाय घोषित exports उपयोग करें। Installed-package E10 report वर्तमान `exports`, declarations और resolution checks का आधार है।

Export किया गया engine singleton और global engine mutation helpers हटा दिए गए हैं। `setParticlesRandom`, `getParticlesRandom`, `getParticlesRandomFn`, `setParticlesLogger` और `getParticlesLogger` को container-owning engine के methods से बदलें। यदि application `tsParticles.load`, `tsParticles.loadJSON` या `tsParticles.dom` उपयोग करती थी, तो explicit engine पर वे operations call करें या लौटाया container रखें। Imported ESM/CJS package से `window.tsParticles` न लें; classic browser bundles documented namespace अलग से देते हैं।
