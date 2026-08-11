# Options reference

`tsParticles` के options काफी deep हैं, इसलिए हर sub-option में जाने से पहले यह पेज एक practical map देता है।

## अपना configuration path चुनें

- **तेज़ visual result**: preset से शुरू करें और key fields override करें।
- **पूर्ण नियंत्रण**: `particles`, `interactivity`, और `background` manually define करें।
- **config-first approach**: `@tsparticles/configs` से शुरू करें और चरणबद्ध तरीके से refine करें।

## Quick guide (local)

- [`Background & Canvas`](/hi/options/background)
- [`Background Mask`](/hi/options/background-mask)
- [`Full Screen`](/hi/options/fullscreen)
- [`Motion`](/hi/options/motion)
- [`Manual Particles`](/hi/options/manual-particles)
- [`Themes`](/hi/options/themes)
- [`Particles`](/hi/options/particles)
- [`Particles Number`](/hi/options/particles-number)
- [`Particles Move`](/hi/options/particles-move)
- [`Particles Links`](/hi/options/particles-links)
- [`Particles Palette`](/hi/options/particles-palette)
- [`Particles Shape`](/hi/options/particles-shape)
- [`Particles Collisions`](/hi/options/particles-collisions)
- [`Particles Life`](/hi/options/particles-life)
- [`Particles Orbit`](/hi/options/particles-orbit)
- [`Particles Roll`](/hi/options/particles-roll)
- [`Particles Rotate`](/hi/options/particles-rotate)
- [`Interactivity`](/hi/options/interactivity)
- [`Interactivity Click`](/hi/options/interactivity-click)
- [`Interactivity Hover`](/hi/options/interactivity-hover)
- [`Interactivity Div`](/hi/options/interactivity-div)
- [`Interactivity Events`](/hi/options/interactivity-events)
- [`Interactivity Modes`](/hi/options/interactivity-modes)
- [`Plugin: Absorbers`](/hi/options/plugin-absorbers)
- [`Plugin: Emitters`](/hi/options/plugin-emitters)
- [`Plugin: Infection`](/hi/options/plugin-infection)
- [`Plugin: Polygon Mask`](/hi/options/plugin-polygon-mask)
- [`Performance Guide`](/hi/options/performance)

## Particles deep-dive pages

- [`Particles Bounce`](/hi/options/particles-bounce)
- [`Particles Color`](/hi/options/particles-color)
- [`Particles Destroy`](/hi/options/particles-destroy)
- [`Particles Group`](/hi/options/particles-group)
- [`Particles Opacity`](/hi/options/particles-opacity)
- [`Particles Palette`](/hi/options/particles-palette)
- [`Particles Repulse`](/hi/options/particles-repulse)
- [`Particles Shadow`](/hi/options/particles-shadow)
- [`Particles Size`](/hi/options/particles-size)
- [`Particles Stroke`](/hi/options/particles-stroke)
- [`Particles Tilt`](/hi/options/particles-tilt)
- [`Particles Twinkle`](/hi/options/particles-twinkle)
- [`Particles Wobble`](/hi/options/particles-wobble)
- [`Particles ZIndex`](/hi/options/particles-zindex)

## मुख्य reference docs कहां हैं

- Main options docs: [`tsparticles/markdown/Options.md`](https://github.com/tsparticles/tsparticles/blob/main/markdown/Options.md)
- Detailed options pages: [`tsparticles/markdown/Options/`](https://github.com/tsparticles/tsparticles/tree/main/markdown/Options)
- Type interfaces: [`tsparticles/engine/src/Options/Interfaces`](https://github.com/tsparticles/tsparticles/tree/main/engine/src/Options/Interfaces)

## सबसे अधिक उपयोग होने वाले root options

- `background`
- `fullScreen`
- `interactivity`
- `particles`
- `detectRetina`
- `preset`
- `responsive`

## सबसे अधिक उपयोग होने वाले sections

- `background`: canvas background और masking का बेसिक कंट्रोल।
- `particles.number`: मात्रा और density।
- `particles.move`: गति, दिशा और out modes।
- `particles.shape`: circle, polygon, image, emoji, custom shape।
- `particles.palette`: coordinated color sets को जल्दी बदलें।
- `interactivity`: hover/click modes और external effects।
- `detectRetina`: high-DPI screens पर quality/performance का संतुलन।

## Particles map (nested view)

Single pages खोलने से पहले इस quick tree को navigation aid की तरह उपयोग करें:

```text
particles
|- number
|- color
|- shape
|- size
|- opacity
|- move
|- links
|- collisions
|- life
|- destroy
|- group
|- orbit
|- repulse
|- roll
|- rotate
|- shadow
|- stroke
|- tilt
|- twinkle
|- wobble
|- zIndex
`- palette
```

पहले root docs खोलें, फिर deep sections पढ़ें:

- बेसिक सेक्शन: [`Particles`](/hi/options/particles)
- गहराई से पढ़ें: [`Particles Number`](/hi/options/particles-number), [`Particles Move`](/hi/options/particles-move), [`Particles Links`](/hi/options/particles-links)

## सुरक्षित विकल्प कॉन्फ़िगरेशन प्रक्रिया

1. demos या presets से working configuration से शुरुआत करें।
2. एक समय में एक section बदलें।
3. app code में TypeScript (`IOptions`) से validate करें।
4. production options को dedicated JSON files में रखें।

## Minimal typed example

```ts
import type { ISourceOptions } from "@tsparticles/engine";

export const particlesOptions: ISourceOptions = {
  fpsLimit: 60,
  particles: {
    number: { value: 70 },
    move: { enable: true, speed: 1.5 },
  },
};
```

## Performance guardrails

- advanced plugins की ज़रूरत न हो तो `@tsparticles/slim` को प्राथमिकता दें।
- particle count को container area के अनुपात में रखें।
- heavy interactions जोड़ने से पहले real devices पर profiling करें।

## Related references

- configs package docs: <https://github.com/tsparticles/tsparticles/blob/main/utils/configs/README.md>
- presets folder: <https://github.com/tsparticles/tsparticles/tree/main/presets>
- palettes folder: <https://github.com/tsparticles/tsparticles/tree/main/palettes>

हर sub-option की पूरी जानकारी के लिए ऊपर दिए गए `tsparticles/markdown/Options` source pages भी देखें।
