# Framework integrations

`tsParticles` कई wrappers को सपोर्ट करता है, लेकिन runtime flow हमेशा एक जैसा रहता है:

1. engine को एक बार initialize करें
2. केवल वही features लोड करें जिनकी ज़रूरत है (`@tsparticles/slim`, `@tsparticles/all`, या custom plugins)
3. अपने options के साथ wrapper component render करें

## Quick checklist

- सभी `@tsparticles/*` packages की versions aligned रखें।
- app startup पर loader केवल एक बार चलाएं।
- छोटे options object से शुरू करें और धीरे-धीरे बढ़ाएं।
- SSR framework में particles को केवल client-side mount करें।

## wrappers guide से शुरुआत करें

पूरी wrappers matrix (React, Next.js, Vue/Nuxt, Angular, Svelte, Solid आदि) के लिए देखें:

- [`/guide/wrappers`](/hi/guide/wrappers)

## Core integration examples

### React

> [!IMPORTANT]
> Place `ParticlesProvider` at your app root (e.g., `main.tsx` or `layout.tsx`), not inside a component that may unmount.
> The `init` callback runs only once for the entire app lifecycle.

```tsx
import { useMemo } from "react";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import type { Engine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const init = async (engine: Engine): Promise<void> => {
  await loadSlim(engine);
};

export function ParticlesBackground() {
  const options = useMemo(
    () => ({
      particles: {
        move: { enable: true },
        number: { value: 60 },
      },
    }),
    [],
  );

  return (
    <ParticlesProvider init={init}>
      <Particles id="tsparticles" options={options} />
    </ParticlesProvider>
  );
}
```

### Vue 3

```ts
import { createApp } from "vue";
import Particles from "@tsparticles/vue3";
import type { Engine } from "@tsparticles/engine";
import App from "./App.vue";

async function registerParticles(engine: Engine): Promise<void> {
  const [{ loadSlim }] = await Promise.all([import("@tsparticles/slim")]);

  await loadSlim(engine);
}

const app = createApp(App);

app.use(Particles, { init: registerParticles });
app.mount("#app");
```

### Angular

```ts
import { Component, OnInit } from "@angular/core";
import type { ISourceOptions } from "@tsparticles/engine";
import { NgParticlesService } from "@tsparticles/angular";
import { loadSlim } from "@tsparticles/slim";

@Component({
  selector: "app-root",
  template: `<ngx-particles [id]="id" [options]="options"></ngx-particles>`,
})
export class AppComponent implements OnInit {
  id = "tsparticles";
  options: ISourceOptions = {
    particles: {
      move: { enable: true },
      number: { value: 70 },
    },
  };

  constructor(private readonly particlesService: NgParticlesService) {}

  ngOnInit(): void {
    void this.particlesService.init(async (engine) => {
      await loadSlim(engine);
    });
  }
}
```

## Practical guidance

- अधिकांश apps के लिए `@tsparticles/slim` को baseline रखें।
- options बढ़ने पर उन्हें dedicated config files में रखें।
- heavy scenes के लिए UI में start/stop controls दें।

## Source references

- wrappers source: <https://github.com/tsparticles/tsparticles/tree/main/wrappers>
- framework demos source: <https://github.com/tsparticles/tsparticles/tree/main/demo>
- engine package: <https://github.com/tsparticles/tsparticles/tree/main/engine>
- bundles: <https://github.com/tsparticles/tsparticles/tree/main/bundles>
