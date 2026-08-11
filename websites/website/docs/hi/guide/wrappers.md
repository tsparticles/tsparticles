# Wrappers

यह पेज wrappers का hub है। सही package चुनें और फिर installation/usage details के लिए dedicated पेज खोलें।

Source folder: <https://github.com/tsparticles/tsparticles/tree/main/wrappers>

## Wrapper pages

### सबसे लोकप्रिय पहले

- [`Angular`](/hi/guide/wrappers-angular)
- [`React`](/hi/guide/wrappers-react)
- [`Svelte`](/hi/guide/wrappers-svelte)
- [`Vue`](/hi/guide/wrappers-vue3)

### React ecosystem

- [`React`](/hi/guide/wrappers-react)
- [`Next.js`](/hi/guide/wrappers-nextjs)

### Vue ecosystem

- [`Vue 2`](/hi/guide/wrappers-vue2)
- [`Vue 3`](/hi/guide/wrappers-vue3)
- [`Nuxt 2`](/hi/guide/wrappers-nuxt2)
- [`Nuxt 3`](/hi/guide/wrappers-nuxt3)
- [`Nuxt 4`](/hi/guide/wrappers-nuxt4)

### अन्य (alphabetical)

- [`Angular Confetti`](/hi/guide/wrappers-angular-confetti)
- [`Angular Fireworks`](/hi/guide/wrappers-angular-fireworks)
- [`Astro`](/hi/guide/wrappers-astro)
- [`Ember`](/hi/guide/wrappers-ember)
- [`Inferno`](/hi/guide/wrappers-inferno)
- [`jQuery`](/hi/guide/wrappers-jquery)
- [`Lit`](/hi/guide/wrappers-lit)
- [`Preact`](/hi/guide/wrappers-preact)
- [`Qwik`](/hi/guide/wrappers-qwik)
- [`Riot`](/hi/guide/wrappers-riot)
- [`Solid`](/hi/guide/wrappers-solid)
- [`Stencil`](/hi/guide/wrappers-stencil)
- [`Web Components`](/hi/guide/wrappers-webcomponents)
- [`WordPress`](/hi/guide/wrappers-wordpress)

## Common integration flow

Framework कोई भी हो:

1. wrapper + `@tsparticles/engine` install करें
2. features एक बार load करें (`@tsparticles/slim`, `@tsparticles/all`, या custom plugins)
3. options के साथ wrapper component render करें

## Official wrappers (alphabetical)

इस section की ordering rule:

- package name के हिसाब से alphabetical order
- exceptions mapping notes में explicit लिखे जाते हैं (जैसे WordPress को full installation चाहिए)

- `@tsparticles/angular`: Angular component wrapper (`<ngx-particles />`)  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/angular#readme> - local guide: [`/guide/wrappers-angular`](/hi/guide/wrappers-angular)
- `@tsparticles/astro`: Astro component wrapper  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/astro#readme> - local guide: [`/guide/wrappers-astro`](/hi/guide/wrappers-astro)
- `@tsparticles/ember`: Ember wrapper  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/ember#readme> - local guide: [`/guide/wrappers-ember`](/hi/guide/wrappers-ember)
- `@tsparticles/inferno`: Inferno component wrapper  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/inferno#readme> - local guide: [`/guide/wrappers-inferno`](/hi/guide/wrappers-inferno)
- `@tsparticles/jquery`: jQuery plugin wrapper  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/jquery#readme> - local guide: [`/guide/wrappers-jquery`](/hi/guide/wrappers-jquery)
- `@tsparticles/lit`: Lit component package  
  Source: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/lit> - local guide: [`/guide/wrappers-lit`](/hi/guide/wrappers-lit)
- `@tsparticles/nextjs`: Next.js wrapper over `@tsparticles/react`  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/nextjs#readme> - local guide: [`/guide/wrappers-nextjs`](/hi/guide/wrappers-nextjs)
- `@tsparticles/nuxt2`: Nuxt 2 module (client-side registration)  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/nuxt2#readme> - local guide: [`/guide/wrappers-nuxt2`](/hi/guide/wrappers-nuxt2)
- `@tsparticles/nuxt3`: Nuxt 3 module (client-side registration)  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/nuxt3#readme> - local guide: [`/guide/wrappers-nuxt3`](/hi/guide/wrappers-nuxt3)
- `@tsparticles/nuxt4`: Nuxt 4 module (client-side registration)  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/nuxt4#readme> - local guide: [`/guide/wrappers-nuxt4`](/hi/guide/wrappers-nuxt4)
- `@tsparticles/preact`: Preact component wrapper  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/preact#readme> - local guide: [`/guide/wrappers-preact`](/hi/guide/wrappers-preact)
- `@tsparticles/qwik`: Qwik component wrapper  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/qwik#readme> - local guide: [`/guide/wrappers-qwik`](/hi/guide/wrappers-qwik)
- `@tsparticles/react`: React component wrapper  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/react#readme> - local guide: [`/guide/wrappers-react`](/hi/guide/wrappers-react)
- `@tsparticles/riot`: Riot wrapper  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/riot#readme> - local guide: [`/guide/wrappers-riot`](/hi/guide/wrappers-riot)
- `@tsparticles/solid`: Solid component wrapper  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/solid#readme> - local guide: [`/guide/wrappers-solid`](/hi/guide/wrappers-solid)
- `@tsparticles/stencil`: Stencil component wrapper (`<stencil-particles />`)  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/stencil#readme> - local guide: [`/guide/wrappers-stencil`](/hi/guide/wrappers-stencil)
- `@tsparticles/svelte`: Svelte component wrapper  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/svelte#readme> - local guide: [`/guide/wrappers-svelte`](/hi/guide/wrappers-svelte)
- `@tsparticles/vue2`: Vue 2 component wrapper  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/vue2#readme> - local guide: [`/guide/wrappers-vue2`](/hi/guide/wrappers-vue2)
- `@tsparticles/vue3`: Vue 3 component wrapper  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/vue3#readme> - local guide: [`/guide/wrappers-vue3`](/hi/guide/wrappers-vue3)
- `@tsparticles/webcomponents`: Web Components wrapper (`<web-particles />`)  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/webcomponents#readme> - local guide: [`/guide/wrappers-webcomponents`](/hi/guide/wrappers-webcomponents)
- `@tsparticles/wordpress`: official WordPress plugin package  
  Source: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/wordpress> - local guide: [`/guide/wrappers-wordpress`](/hi/guide/wrappers-wordpress)
- `angular-confetti`: Angular wrapper for `@tsparticles/confetti`  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/angular-confetti#readme> - local guide: [`/guide/wrappers-angular-confetti`](/hi/guide/wrappers-angular-confetti)
- `angular-fireworks`: Angular wrapper for `@tsparticles/fireworks`  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/angular-fireworks#readme> - local guide: [`/guide/wrappers-angular-fireworks`](/hi/guide/wrappers-angular-fireworks)

## WordPress और Elementor नोट्स

- `@tsparticles/wordpress` official plugin package है और इसके लिए full WordPress setup चाहिए।
- Elementor के लिए कोई official standalone `tsParticles` plugin package नहीं है।
- README में Premium Addons for Elementor के माध्यम से integration का संदर्भ है:
  <https://premiumaddons.com/particles-section-addon-for-elementor-page-builder/>

## Wrapper से demo mapping

इस matrix से wrapper package से runnable monorepo demo पर जल्दी जा सकते हैं।

Table ordering rule:

- wrapper package name के हिसाब से alphabetical order
- demo पर लागू न होने वाले wrappers के लिए explicit exception (`@tsparticles/wordpress`)

Source demos folder: <https://github.com/tsparticles/tsparticles/tree/main/demo>

| Wrapper package              | Demo project                                    |
| ---------------------------- | ----------------------------------------------- |
| `@tsparticles/angular`       | `demo/angular`                                  |
| `@tsparticles/astro`         | `demo/astro`                                    |
| `@tsparticles/ember`         | `demo/ember`                                    |
| `@tsparticles/inferno`       | `demo/inferno`                                  |
| `@tsparticles/jquery`        | `demo/jquery`                                   |
| `@tsparticles/lit`           | `demo/lit`                                      |
| `@tsparticles/nextjs`        | `demo/nextjs`, `demo/nextjs-legacy`             |
| `@tsparticles/nuxt2`         | `demo/nuxt2`                                    |
| `@tsparticles/nuxt3`         | `demo/nuxt3`                                    |
| `@tsparticles/nuxt4`         | `demo/nuxt4`                                    |
| `@tsparticles/preact`        | `demo/preact`                                   |
| `@tsparticles/qwik`          | `demo/qwik`                                     |
| `@tsparticles/react`         | `demo/react`                                    |
| `@tsparticles/riot`          | `demo/riot`                                     |
| `@tsparticles/solid`         | `demo/solid`                                    |
| `@tsparticles/stencil`       | `demo/stencil`                                  |
| `@tsparticles/svelte`        | `demo/svelte`, `demo/svelte-kit`                |
| `@tsparticles/vue2`          | `demo/vue2`                                     |
| `@tsparticles/vue3`          | `demo/vue3`                                     |
| `@tsparticles/webcomponents` | `demo/webcomponents`                            |
| `@tsparticles/wordpress`     | लागू नहीं (पूर्ण WordPress installation आवश्यक) |
| `angular-confetti`           | `demo/angular`                                  |
| `angular-fireworks`          | `demo/angular`                                  |

## Minimal patterns

### React / Next.js-style provider

> [!IMPORTANT]
> Place `ParticlesProvider` at your app root (e.g., `main.tsx` or `layout.tsx`), not inside a component that may unmount.
> The `init` callback runs only once for the entire app lifecycle.

```tsx
import Particles, { ParticlesProvider } from "@tsparticles/react";
import type { Engine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const init = async (engine: Engine): Promise<void> => {
  await loadSlim(engine);
};

export function Background() {
  return (
    <ParticlesProvider init={init}>
      <Particles id="tsparticles" options={{ particles: { move: { enable: true } } }} />
    </ParticlesProvider>
  );
}
```

### Vue / Nuxt-style register function

```ts
import type { Engine } from "@tsparticles/engine";

export async function registerParticles(engine: Engine): Promise<void> {
  const [{ loadSlim }] = await Promise.all([import("@tsparticles/slim")]);

  await loadSlim(engine);
}
```

### Angular one-time initialization

```ts
import { NgParticlesService } from "@tsparticles/angular";
import { loadSlim } from "@tsparticles/slim";

constructor(private readonly particlesService: NgParticlesService) {}

ngOnInit(): void {
  void this.particlesService.init(async engine => {
    await loadSlim(engine);
  });
}
```

## Related pages

- [`/guide/frameworks`](/hi/guide/frameworks)
- [`/guide/getting-started`](/hi/guide/getting-started)
- [`/demos/`](/hi/demos/)
