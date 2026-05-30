# Интеграции framework

`tsParticles` поддерживает несколько wrappers, но runtime-поток всегда одинаковый:

1. инициализировать engine один раз
2. загрузить только нужные функции (`@tsparticles/slim`, `@tsparticles/all` или пользовательские plugins)
3. отрендерить wrapper-компонент с вашими опциями

## Короткий чеклист

- Держите все версии `@tsparticles/*` синхронизированными.
- Запускайте loader один раз при старте приложения.
- Начинайте с небольшого объекта опций и расширяйте его постепенно.
- Для SSR-framework монтируйте частицы только на клиенте.

## Начните с гайда по wrappers

Полная матрица wrappers (React, Next.js, Vue/Nuxt, Angular, Svelte, Solid и другие) доступна здесь:

- [`/guide/wrappers`](/ru/guide/wrappers)

## Базовые примеры интеграции

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

## Практические рекомендации

- Используйте `@tsparticles/slim` как базу для большинства приложений.
- Выносите опции в отдельные конфигурационные файлы по мере роста.
- Для тяжелых сцен добавляйте в UI элементы управления старт/стоп.

## Источники

- Исходники wrappers: <https://github.com/tsparticles/tsparticles/tree/main/wrappers>
- Демо по framework: <https://github.com/tsparticles/tsparticles/tree/main/demo>
- Пакет engine: <https://github.com/tsparticles/tsparticles/tree/main/engine>
- Bundles: <https://github.com/tsparticles/tsparticles/tree/main/bundles>
