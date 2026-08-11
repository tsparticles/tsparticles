# Integrations framework

`tsParticles` prend en charge plusieurs wrappers, mais le flux d'execution reste toujours le meme :

1. initialiser le moteur une seule fois
2. charger uniquement les fonctionnalités nécessaires (`@tsparticles/slim`, `@tsparticles/all`, ou des plugins personnalisés)
3. afficher le composant wrapper avec vos options

## Checklist rapide

- Gardez toutes les versions des packages `@tsparticles/*` alignées.
- Exécutez le loader une seule fois au démarrage de l'application.
- Commencez avec un petit objet d'options, puis enrichissez-le progressivement.
- Avec les frameworks SSR, montez les particules uniquement côté client.

## Commencer par le guide wrappers

Pour la matrice complète des wrappers (React, Next.js, Vue/Nuxt, Angular, Svelte, Solid, etc.), voir :

- [`/guide/wrappers`](/fr/guide/wrappers)

## Exemples d'integration de base

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

## Conseils pratiques

- Preferez `@tsparticles/slim` comme base pour la plupart des applications.
- Placez les options dans des fichiers de configuration dédiés quand elles grossissent.
- Pour les scenes lourdes, exposez des controles demarrer/arreter dans votre interface.

## References source

- Source wrappers : <https://github.com/tsparticles/tsparticles/tree/main/wrappers>
- Source des demos framework : <https://github.com/tsparticles/tsparticles/tree/main/demo>
- Package engine : <https://github.com/tsparticles/tsparticles/tree/main/engine>
- Bundles : <https://github.com/tsparticles/tsparticles/tree/main/bundles>
