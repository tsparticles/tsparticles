# Wrappers

Эта страница — центральный хаб wrappers. Здесь можно выбрать нужный пакет и перейти к подробной инструкции по установке и использованию.

Исходная папка: <https://github.com/tsparticles/tsparticles/tree/main/wrappers>

## Страницы wrappers

### Самые популярные

- [`Angular`](/ru/guide/wrappers-angular)
- [`React`](/ru/guide/wrappers-react)
- [`Svelte`](/ru/guide/wrappers-svelte)
- [`Vue`](/ru/guide/wrappers-vue3)

### Экосистема React

- [`React`](/ru/guide/wrappers-react)
- [`Next.js`](/ru/guide/wrappers-nextjs)

### Экосистема Vue

- [`Vue 2`](/ru/guide/wrappers-vue2)
- [`Vue 3`](/ru/guide/wrappers-vue3)
- [`Nuxt 2`](/ru/guide/wrappers-nuxt2)
- [`Nuxt 3`](/ru/guide/wrappers-nuxt3)
- [`Nuxt 4`](/ru/guide/wrappers-nuxt4)

### Другие (в алфавитном порядке)

- [`Angular Confetti`](/ru/guide/wrappers-angular-confetti)
- [`Angular Fireworks`](/ru/guide/wrappers-angular-fireworks)
- [`Astro`](/ru/guide/wrappers-astro)
- [`Ember`](/ru/guide/wrappers-ember)
- [`Inferno`](/ru/guide/wrappers-inferno)
- [`jQuery`](/ru/guide/wrappers-jquery)
- [`Lit`](/ru/guide/wrappers-lit)
- [`Preact`](/ru/guide/wrappers-preact)
- [`Qwik`](/ru/guide/wrappers-qwik)
- [`Riot`](/ru/guide/wrappers-riot)
- [`Solid`](/ru/guide/wrappers-solid)
- [`Stencil`](/ru/guide/wrappers-stencil)
- [`Web Components`](/ru/guide/wrappers-webcomponents)
- [`WordPress`](/ru/guide/wrappers-wordpress)

## Общий поток интеграции

Независимо от framework:

1. установить wrapper + `@tsparticles/engine`
2. загрузить функции один раз (`@tsparticles/slim`, `@tsparticles/all` или пользовательские plugins)
3. отрендерить wrapper-компонент с опциями

## Официальные wrappers (в алфавитном порядке)

Правило порядка для этого раздела:

- сортировка по имени пакета
- исключения явно указаны в примечаниях (например, WordPress требует полноценной установки)

- `@tsparticles/angular`: wrapper-компонент для Angular (`<ngx-particles />`)  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/angular#readme> - локальный гайд: [`/guide/wrappers-angular`](/ru/guide/wrappers-angular)
- `@tsparticles/astro`: wrapper-компонент для Astro  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/astro#readme> - локальный гайд: [`/guide/wrappers-astro`](/ru/guide/wrappers-astro)
- `@tsparticles/ember`: wrapper для Ember  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/ember#readme> - локальный гайд: [`/guide/wrappers-ember`](/ru/guide/wrappers-ember)
- `@tsparticles/inferno`: wrapper-компонент для Inferno  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/inferno#readme> - локальный гайд: [`/guide/wrappers-inferno`](/ru/guide/wrappers-inferno)
- `@tsparticles/jquery`: wrapper-плагин для jQuery  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/jquery#readme> - локальный гайд: [`/guide/wrappers-jquery`](/ru/guide/wrappers-jquery)
- `@tsparticles/lit`: пакет компонентов Lit  
  Source: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/lit> - локальный гайд: [`/guide/wrappers-lit`](/ru/guide/wrappers-lit)
- `@tsparticles/nextjs`: wrapper для Next.js поверх `@tsparticles/react`  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/nextjs#readme> - локальный гайд: [`/guide/wrappers-nextjs`](/ru/guide/wrappers-nextjs)
- `@tsparticles/nuxt2`: модуль Nuxt 2 (регистрация на клиенте)  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/nuxt2#readme> - локальный гайд: [`/guide/wrappers-nuxt2`](/ru/guide/wrappers-nuxt2)
- `@tsparticles/nuxt3`: модуль Nuxt 3 (регистрация на клиенте)  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/nuxt3#readme> - локальный гайд: [`/guide/wrappers-nuxt3`](/ru/guide/wrappers-nuxt3)
- `@tsparticles/nuxt4`: модуль Nuxt 4 (регистрация на клиенте)  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/nuxt4#readme> - локальный гайд: [`/guide/wrappers-nuxt4`](/ru/guide/wrappers-nuxt4)
- `@tsparticles/preact`: wrapper-компонент для Preact  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/preact#readme> - локальный гайд: [`/guide/wrappers-preact`](/ru/guide/wrappers-preact)
- `@tsparticles/qwik`: wrapper-компонент для Qwik  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/qwik#readme> - локальный гайд: [`/guide/wrappers-qwik`](/ru/guide/wrappers-qwik)
- `@tsparticles/react`: wrapper-компонент для React  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/react#readme> - локальный гайд: [`/guide/wrappers-react`](/ru/guide/wrappers-react)
- `@tsparticles/riot`: wrapper для Riot  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/riot#readme> - локальный гайд: [`/guide/wrappers-riot`](/ru/guide/wrappers-riot)
- `@tsparticles/solid`: wrapper-компонент для Solid  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/solid#readme> - локальный гайд: [`/guide/wrappers-solid`](/ru/guide/wrappers-solid)
- `@tsparticles/stencil`: wrapper-компонент для Stencil (`<stencil-particles />`)  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/stencil#readme> - локальный гайд: [`/guide/wrappers-stencil`](/ru/guide/wrappers-stencil)
- `@tsparticles/svelte`: wrapper-компонент для Svelte  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/svelte#readme> - локальный гайд: [`/guide/wrappers-svelte`](/ru/guide/wrappers-svelte)
- `@tsparticles/vue2`: wrapper-компонент для Vue 2  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/vue2#readme> - локальный гайд: [`/guide/wrappers-vue2`](/ru/guide/wrappers-vue2)
- `@tsparticles/vue3`: wrapper-компонент для Vue 3  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/vue3#readme> - локальный гайд: [`/guide/wrappers-vue3`](/ru/guide/wrappers-vue3)
- `@tsparticles/webcomponents`: wrapper для Web Components (`<web-particles />`)  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/webcomponents#readme> - локальный гайд: [`/guide/wrappers-webcomponents`](/ru/guide/wrappers-webcomponents)
- `@tsparticles/wordpress`: официальный пакет плагина WordPress  
  Source: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/wordpress> - локальный гайд: [`/guide/wrappers-wordpress`](/ru/guide/wrappers-wordpress)
- `angular-confetti`: Angular-wrapper для `@tsparticles/confetti`  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/angular-confetti#readme> - локальный гайд: [`/guide/wrappers-angular-confetti`](/ru/guide/wrappers-angular-confetti)
- `angular-fireworks`: Angular-wrapper для `@tsparticles/fireworks`  
  Docs: <https://github.com/tsparticles/tsparticles/tree/main/wrappers/angular-fireworks#readme> - локальный гайд: [`/guide/wrappers-angular-fireworks`](/ru/guide/wrappers-angular-fireworks)

## Примечания по WordPress и Elementor

- `@tsparticles/wordpress` — официальный пакет плагина, требующий полноценного WordPress-окружения.
- Для Elementor нет официального отдельного плагина `tsParticles`.
- В README указана интеграция через Premium Addons for Elementor:
  <https://premiumaddons.com/particles-section-addon-for-elementor-page-builder/>

## Сопоставление wrapper -> demo

Используйте эту матрицу, чтобы быстро перейти от wrapper-пакета к рабочему demo-проекту в монорепозитории.

Правило сортировки таблицы:

- по имени wrapper-пакета
- явное исключение для wrapper, которые не применимы к демо (`@tsparticles/wordpress`)

Папка исходников demo: <https://github.com/tsparticles/tsparticles/tree/main/demo>

| Wrapper package              | Demo project                                         |
| ---------------------------- | ---------------------------------------------------- |
| `@tsparticles/angular`       | `demo/angular`                                       |
| `@tsparticles/astro`         | `demo/astro`                                         |
| `@tsparticles/ember`         | `demo/ember`                                         |
| `@tsparticles/inferno`       | `demo/inferno`                                       |
| `@tsparticles/jquery`        | `demo/jquery`                                        |
| `@tsparticles/lit`           | `demo/lit`                                           |
| `@tsparticles/nextjs`        | `demo/nextjs`, `demo/nextjs-legacy`                  |
| `@tsparticles/nuxt2`         | `demo/nuxt2`                                         |
| `@tsparticles/nuxt3`         | `demo/nuxt3`                                         |
| `@tsparticles/nuxt4`         | `demo/nuxt4`                                         |
| `@tsparticles/preact`        | `demo/preact`                                        |
| `@tsparticles/qwik`          | `demo/qwik`                                          |
| `@tsparticles/react`         | `demo/react`                                         |
| `@tsparticles/riot`          | `demo/riot`                                          |
| `@tsparticles/solid`         | `demo/solid`                                         |
| `@tsparticles/stencil`       | `demo/stencil`                                       |
| `@tsparticles/svelte`        | `demo/svelte`, `demo/svelte-kit`                     |
| `@tsparticles/vue2`          | `demo/vue2`                                          |
| `@tsparticles/vue3`          | `demo/vue3`                                          |
| `@tsparticles/webcomponents` | `demo/webcomponents`                                 |
| `@tsparticles/wordpress`     | не применимо (нужна полноценная установка WordPress) |
| `angular-confetti`           | `demo/angular`                                       |
| `angular-fireworks`          | `demo/angular`                                       |

## Минимальные паттерны

### Provider в стиле React / Next.js

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

### Функция регистрации в стиле Vue / Nuxt

```ts
import type { Engine } from "@tsparticles/engine";

export async function registerParticles(engine: Engine): Promise<void> {
  const [{ loadSlim }] = await Promise.all([import("@tsparticles/slim")]);

  await loadSlim(engine);
}
```

### Однократная инициализация в Angular

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

## Связанные страницы

- [`/guide/frameworks`](/ru/guide/frameworks)
- [`/guide/getting-started`](/ru/guide/getting-started)
- [`/demos/`](/ru/demos/)
