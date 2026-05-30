# Integracoes de frameworks

`tsParticles` suporta varios wrappers, mas o fluxo de runtime e sempre o mesmo:

1. inicializar a engine uma unica vez
2. carregar apenas os recursos necessarios (`@tsparticles/slim`, `@tsparticles/all`, ou plugins personalizados)
3. renderizar o componente wrapper com as suas opcoes

## Checklist rapida

- Mantenha todas as versoes de `@tsparticles/*` alinhadas.
- Execute o loader apenas uma vez na inicializacao da aplicacao.
- Comece com um objeto de opcoes pequeno e amplie gradualmente.
- Para frameworks SSR, monte particulas somente no cliente.

## Comece pelo guia de wrappers

Para ver a matriz completa de wrappers (React, Next.js, Vue/Nuxt, Angular, Svelte, Solid e outros), consulte:

- [`/guide/wrappers`](/pt/guide/wrappers)

## Exemplos principais de integracao

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

## Orientacao pratica

- Prefira `@tsparticles/slim` como base para a maioria dos aplicativos.
- Guarde as opcoes em arquivos de configuracao dedicados quando crescerem.
- Para cenas mais pesadas, exponha controles de iniciar/parar na UI.

## Referencias de origem

- Fonte dos wrappers: <https://github.com/tsparticles/tsparticles/tree/main/wrappers>
- Fonte de demos de framework: <https://github.com/tsparticles/tsparticles/tree/main/demo>
- Pacote engine: <https://github.com/tsparticles/tsparticles/tree/main/engine>
- Bundles: <https://github.com/tsparticles/tsparticles/tree/main/bundles>
