# Integraciones de frameworks

`tsParticles` soporta multiples wrappers, pero el flujo de runtime siempre es el mismo:

1. inicializar el engine una sola vez
2. cargar solo las features que necesitas (`@tsparticles/slim`, `@tsparticles/all`, o plugins personalizados)
3. renderizar el componente wrapper con tus opciones

## Checklist rapida

- Mantén alineadas todas las versiones de `@tsparticles/*`.
- Ejecuta el loader una sola vez al arrancar la app.
- Empieza con un objeto de opciones pequeño y amplialo de forma incremental.
- Para frameworks SSR, monta particulas solo en cliente.

## Empezar desde la guia de wrappers

Para ver la matriz completa de wrappers (React, Next.js, Vue/Nuxt, Angular, Svelte, Solid y otros), consulta:

- [`/guide/wrappers`](/es/guide/wrappers)

## Ejemplos de integracion base

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

## Guia practica

- Prefiere `@tsparticles/slim` como base para la mayoria de apps.
- Guarda las opciones en archivos de configuracion dedicados cuando crezcan.
- En escenas pesadas, expone controles de iniciar/detener en la UI.

## Referencias de origen

- Fuente wrappers: <https://github.com/tsparticles/tsparticles/tree/main/wrappers>
- Fuente demos de framework: <https://github.com/tsparticles/tsparticles/tree/main/demo>
- Package engine: <https://github.com/tsparticles/tsparticles/tree/main/engine>
- Bundles: <https://github.com/tsparticles/tsparticles/tree/main/bundles>
