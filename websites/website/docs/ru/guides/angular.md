---
title: Интеграция с Angular
description: Пошаговое руководство по интеграции tsParticles в приложения Angular с использованием @tsparticles/angular.
---

# Интеграция с Angular

Пакет `@tsparticles/angular` предоставляет Angular-компоненты, модули и сервисы для tsParticles. Это руководство охватывает традиционный подход с `NgModule`, а также standalone-компоненты Angular 17+.

---

## Установка

```bash
npm install @tsparticles/angular @tsparticles/engine
```

Для полного набора функций установите полную сборку:

```bash
npm install tsparticles
```

Дополнительные пакеты пресетов:

```bash
npm install @tsparticles/preset-confetti
npm install @tsparticles/preset-fireworks
npm install @tsparticles/preset-snow
npm install @tsparticles/preset-stars
```

---

## Базовое использование (NgModule)

### 1. Импорт модуля

```typescript
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { NgParticlesModule } from "@tsparticles/angular";
import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgParticlesModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

### 2. Инициализация движка

```typescript
import { Component, OnInit } from "@angular/core";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";
import { loadFull } from "tsparticles";
import { NgParticlesService } from "@tsparticles/angular";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  constructor(private readonly ngParticlesService: NgParticlesService) {}

  ngOnInit(): void {
    void this.ngParticlesService.init(async (engine: Engine) => {
      await loadFull(engine);
    });
  }

  particlesOptions: ISourceOptions = {
    background: {
      color: "#0d47a1",
    },
    fpsLimit: 120,
    particles: {
      number: {
        value: 80,
      },
      color: {
        value: "#ffffff",
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: 0.5,
      },
      size: {
        value: { min: 1, max: 5 },
      },
      links: {
        enable: true,
        distance: 150,
        color: "#ffffff",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 2,
        outModes: "out",
      },
    },
  };

  particlesLoaded(container: Container): void {
    console.log("Контейнер частиц загружен", container);
  }
}
```

### 3. Шаблон

```html
<ngx-particles
  id="tsparticles"
  [options]="particlesOptions"
  (particlesLoaded)="particlesLoaded($event)"
></ngx-particles>
```

---

## Детали инициализации движка

Метод `NgParticlesService.init()` должен быть вызван ровно один раз, обычно в `AppComponent.ngOnInit()`. Он получает колбэк, в котором вы загружаете необходимые плагины/пресеты.

```typescript
import { Component, OnInit } from "@angular/core";
import { NgParticlesService } from "@tsparticles/angular";
import type { Engine } from "@tsparticles/engine";

@Component({ ... })
export class AppComponent implements OnInit {
  constructor(private readonly ngParticlesService: NgParticlesService) {}

  ngOnInit(): void {
    void this.ngParticlesService.init(async (engine: Engine) => {
      // Загружайте только то, что нужно для меньших сборок
      await loadBasic(engine);       // базовые формы + движение
      await loadEmittersPlugin(engine); // формы эмиттеров
    });
  }
}
```

Доступные функции загрузки из `tsparticles`:

| Функция             | Описание                                        |
| ------------------- | ----------------------------------------------- |
| `loadFull(engine)`  | Все возможности (самая большая сборка)          |
| `loadBasic(engine)` | Базовые формы (круг, квадрат, многоугольник...) |
| `loadSlim(engine)`  | Большинство функций без редко используемых      |
| `loadAll(engine)`   | Устаревший псевдоним для `loadFull`             |

---

## Эффект конфетти

```bash
npm install @tsparticles/preset-confetti
```

```typescript
import { loadConfettiPreset } from "@tsparticles/preset-confetti";

// В колбэке NgParticlesService.init:
await loadConfettiPreset(engine);
```

```typescript
particlesOptions: ISourceOptions = {
  preset: "confetti",
  background: {
    color: "transparent",
  },
};
```

Или используйте удобный компонент `<ngx-confetti>`:

```typescript
// app.module.ts
import { NgParticlesModule } from "@tsparticles/angular";

@NgModule({
  imports: [NgParticlesModule],
})
export class AppModule {}
```

```html
<ngx-confetti
  [options]="{
    particleCount: 200,
    colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00']
  }"
></ngx-confetti>
```

---

## Эффект фейерверка

```bash
npm install @tsparticles/preset-fireworks
```

```typescript
import { loadFireworksPreset } from "@tsparticles/preset-fireworks";

// В колбэке NgParticlesService.init:
await loadFireworksPreset(engine);
```

```typescript
particlesOptions: ISourceOptions = {
  preset: "fireworks",
  background: {
    color: "#000000",
  },
};
```

Или используйте компонент `<ngx-fireworks>`:

```html
<ngx-fireworks
  [options]="{
    explosion: 8,
    intensity: 30,
    flickering: 50,
    traceLength: 3
  }"
></ngx-fireworks>
```

> Избегайте автозапуска фейерверков; привязывайте их к действию пользователя (клик, скролл), чтобы предотвратить нежелательное использование ресурсов.

---

## Пользовательская конфигурация частиц

Полнофункциональная настройка частиц с интерактивностью:

```typescript
import { Component, OnInit } from "@angular/core";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";
import { loadFull } from "tsparticles";
import { NgParticlesService } from "@tsparticles/angular";

@Component({
  selector: "app-particles",
  templateUrl: "./particles.component.html",
})
export class ParticlesComponent implements OnInit {
  constructor(private readonly ngParticlesService: NgParticlesService) {}

  ngOnInit(): void {
    void this.ngParticlesService.init(async (engine: Engine) => {
      await loadFull(engine);
    });
  }

  particlesOptions: ISourceOptions = {
    background: {
      color: "#0d0d0d",
    },
    fpsLimit: 60,
    particles: {
      number: {
        value: 100,
        density: {
          enable: true,
        },
      },
      color: {
        value: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"],
      },
      shape: {
        type: ["circle", "square", "triangle"],
      },
      opacity: {
        value: 0.8,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          sync: false,
        },
      },
      size: {
        value: { min: 2, max: 8 },
        random: true,
        anim: {
          enable: true,
          speed: 4,
          size_min: 1,
          sync: false,
        },
      },
      links: {
        enable: true,
        distance: 150,
        color: "#ffffff",
        opacity: 0.3,
        width: 1,
        triangles: {
          enable: true,
          color: "#ffffff",
          opacity: 0.05,
        },
      },
      move: {
        enable: true,
        speed: 3,
        direction: "none",
        random: true,
        straight: false,
        outModes: "bounce",
        attract: {
          enable: true,
          rotateX: 600,
          rotateY: 600,
        },
      },
      life: {
        duration: {
          value: 5,
          random: true,
        },
        count: 0,
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "grab",
        },
        onClick: {
          enable: true,
          mode: "push",
        },
        resize: {
          enable: true,
        },
      },
      modes: {
        grab: {
          distance: 200,
          links: {
            opacity: 0.5,
          },
        },
        push: {
          quantity: 4,
        },
      },
    },
    detectRetina: true,
  };

  particlesLoaded(container: Container): void {
    console.log("Контейнер загружен", container);
  }
}
```

```html
<ngx-particles
  id="tsparticles"
  [options]="particlesOptions"
  (particlesLoaded)="particlesLoaded($event)"
></ngx-particles>
```

---

## События

Компонент `ngx-particles` emits событие `particlesLoaded`:

```typescript
import type { Container } from "@tsparticles/engine";

// Метод компонента
onParticlesLoaded(container: Container): void {
  // Доступ к API контейнера
  container.pause();
  container.play();
  container.destroy();
  container.exportImage().then((blob) => { /* ... */ });
}
```

```html
<ngx-particles
  id="tsparticles"
  [options]="particlesOptions"
  (particlesLoaded)="onParticlesLoaded($event)"
></ngx-particles>
```

Ссылка на контейнер даёт полный программный контроль: пауза, возобновление, уничтожение, экспорт и другое.

---

## Синтаксис шаблона и условный рендеринг

Используйте структурные директивы Angular для переключения компонента:

```html
<button (click)="showParticles = !showParticles">Переключить частицы</button>

<ngx-particles
  *ngIf="showParticles"
  id="tsparticles"
  [options]="particlesOptions"
  (particlesLoaded)="particlesLoaded($event)"
></ngx-particles>
```

```typescript
export class AppComponent {
  showParticles = true;
  // ...
}
```

Когда `*ngIf` вычисляется как `false`, компонент уничтожается (включая canvas и все экземпляры частиц). Повторное создание инициализирует всё заново.

---

## Standalone-компоненты (Angular 17+)

В Angular 17+ вы можете импортировать `NgParticlesModule` напрямую в standalone-компонент:

```typescript
import { Component, OnInit } from "@angular/core";
import { NgParticlesModule, NgParticlesService } from "@tsparticles/angular";
import { loadFull } from "tsparticles";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";

@Component({
  selector: "app-particles",
  standalone: true,
  imports: [NgParticlesModule],
  template: `
    <ngx-particles
      id="tsparticles"
      [options]="particlesOptions"
      (particlesLoaded)="particlesLoaded($event)"
    ></ngx-particles>
  `,
})
export class ParticlesComponent implements OnInit {
  constructor(private readonly ngParticlesService: NgParticlesService) {}

  ngOnInit(): void {
    void this.ngParticlesService.init(async (engine: Engine) => {
      await loadFull(engine);
    });
  }

  particlesOptions: ISourceOptions = {
    background: { color: "#000" },
    particles: {
      number: { value: 50 },
      color: { value: "#fff" },
      shape: { type: "circle" },
      move: { enable: true, speed: 2 },
    },
  };

  particlesLoaded(container: Container): void {
    console.log("Загружено", container);
  }
}
```

Обёртка `NgModule` не требуется — просто импортируйте `NgParticlesModule` в массив `imports` компонента.

---

## Полный пример компонента

### app.component.ts

```typescript
import { Component, OnInit } from "@angular/core";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { NgParticlesService } from "@tsparticles/angular";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "tsParticles Angular Демо";

  constructor(private readonly ngParticlesService: NgParticlesService) {}

  ngOnInit(): void {
    void this.ngParticlesService.init(async (engine: Engine) => {
      await loadSlim(engine);
    });
  }

  particlesOptions: ISourceOptions = {
    autoPlay: true,
    background: {
      color: "#1e1e2e",
      image: "",
      position: "50% 50%",
      repeat: "no-repeat",
      size: "cover",
    },
    backgroundMask: {
      cover: {
        color: "#1e1e2e",
      },
      enable: false,
    },
    fullScreen: {
      enable: true,
      zIndex: -1,
    },
    detectRetina: true,
    fpsLimit: 60,
    particles: {
      color: {
        value: "#cdd6f4",
      },
      links: {
        color: "#cdd6f4",
        distance: 150,
        enable: true,
        opacity: 0.3,
        width: 1,
      },
      move: {
        enable: true,
        speed: 1,
      },
      number: {
        value: 60,
      },
      opacity: {
        value: 0.6,
      },
      size: {
        value: { min: 1, max: 3 },
      },
    },
  };

  particlesLoaded(container: Container): void {
    console.log("Частицы загружены", container);
  }
}
```

### app.component.html

```html
<div style="position: relative; width: 100%; height: 100vh;">
  <ngx-particles
    id="tsparticles"
    [options]="particlesOptions"
    (particlesLoaded)="particlesLoaded($event)"
  ></ngx-particles>

  <div
    style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: white; text-align: center;"
  >
    <h1>{{ title }}</h1>
    <p>Частицы работают на фоне.</p>
  </div>
</div>
```

### app.component.css

```css
:host {
  display: block;
  width: 100%;
  height: 100%;
}
```

---

## Справочник API

| Компонент | Селектор        | Описание                            |
| --------- | --------------- | ----------------------------------- |
| Particles | `ngx-particles` | Полноценный компонент частиц        |
| Confetti  | `ngx-confetti`  | Предварительно настроенный конфетти |
| Fireworks | `ngx-fireworks` | Предварительно настроенный салют    |

### Входные параметры `ngx-particles`

| Параметр  | Тип              | По умолчанию    | Описание                                                                  |
| --------- | ---------------- | --------------- | ------------------------------------------------------------------------- |
| `id`      | `string`         | `"tsparticles"` | ID элемента canvas                                                        |
| `options` | `ISourceOptions` | `{}`            | Конфигурация частиц                                                       |
| `url`     | `string`         | —               | URL удалённой JSON конфиг.                                                |
| `theme`   | `string`         | —               | Theme name (requires `@tsparticles/plugin-themes`; safe no-op otherwise). |

### Выходные события `ngx-particles`

| Событие           | Полезные данные | Описание                                 |
| ----------------- | --------------- | ---------------------------------------- |
| `particlesLoaded` | `Container`     | Срабатывает при инициализации контейнера |

---

## Reactive Behavior

The `<Particles>` component reacts to prop changes at runtime:

- **`id`**, **`options`**, or **`url`** change → the existing container is destroyed and particles are reloaded with the new values.
- **`theme`** change → `loadTheme` is called on the existing container. This requires the optional `@tsparticles/plugin-themes` package to be loaded (otherwise it is a safe no-op).

On component unmount, the particles container is automatically destroyed — no orphan animations remain.

## Устранение неполадок

- **Пустой / невидимый canvas** — Убедитесь, что родительский элемент имеет заданную высоту (например, `height: 100vh`). Canvas подстраивается под размеры контейнера.
- **`NgParticlesService.init()` вызван несколько раз** — Вызывайте его только один раз, обычно в `AppComponent.ngOnInit()`. Последующие вызовы безопасны, но избыточны.
- **Модуль не найден** — Проверьте, что `@tsparticles/angular` указан в зависимостях `package.json` и что вы импортировали `NgParticlesModule`.
- **`NullInjectorError: No provider for NgParticlesService`** — Необходимо импортировать `NgParticlesModule` (или реэкспортировать его) в модуле, где предоставляется компонент.
