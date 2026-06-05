---
title: Интеграция с Next.js
description: Пошаговое руководство по интеграции tsParticles в приложение Next.js с использованием App Router.
---

# Интеграция с Next.js

В этом руководстве рассматривается интеграция tsParticles в проект Next.js с использованием **App Router** (Next.js 13+). Для легаси Pages Router смотрите раздел [Pages Router (легаси)](#pages-router-легаси) внизу.

## Установка

Установите обёртку `@tsparticles/react` и полный движок `tsparticles` (или slim-сборку для меньших размеров):

```bash
npm install @tsparticles/react tsparticles
```

Если вы предпочитаете меньшую сборку `@tsparticles/slim`:

```bash
npm install @tsparticles/react @tsparticles/slim
```

## Базовое использование (App Router)

Компоненты App Router в Next.js по умолчанию серверные. Поскольку tsParticles требует браузерный API `canvas`, необходимо пометить компонент директивой `"use client"`.

```tsx
"use client";

import Particles from "@tsparticles/react";
import { useCallback, useMemo } from "react";
import type { Container, ISourceOptions } from "@tsparticles/engine";

export default function ParticlesBackground() {
  const particlesLoaded = useCallback((container?: Container) => {
    console.log("Частицы загружены", container);
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: { zIndex: -1 },
      background: { color: "#0d47a1" },
      particles: {
        number: { value: 80 },
        links: { enable: true, color: "#ffffff" },
        move: { enable: true },
        size: { value: 3 },
      },
    }),
    [],
  );

  return <Particles id="tsparticles" particlesLoaded={particlesLoaded} options={options} />;
}
```

Создайте этот файл как `components/particles-background.tsx` и импортируйте его на любую страницу или в макет. Поскольку файл начинается с `"use client"`, он будет отрендерен на клиенте — именно там, где должен работать tsParticles.

## Переключение темы

Комбинируйте tsParticles с переключателями тем Next.js, получая опции из текущего состояния темы:

```tsx
"use client";

import Particles from "@tsparticles/react";
import { useMemo, useState, useCallback } from "react";
import type { Container, ISourceOptions } from "@tsparticles/engine";

export default function ThemeAwareParticles() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  const particlesLoaded = useCallback((_container?: Container) => {}, []);

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: { zIndex: -1 },
      background: {
        color: theme === "dark" ? "#000000" : "#ffffff",
      },
      particles: {
        color: { value: theme === "dark" ? "#ffffff" : "#000000" },
        number: { value: 100 },
        links: {
          enable: true,
          color: theme === "dark" ? "#ffffff" : "#000000",
        },
        move: { enable: true },
      },
    }),
    [theme],
  );

  return (
    <>
      <Particles id="tsparticles" particlesLoaded={particlesLoaded} options={options} />
      <button
        onClick={toggleTheme}
        style={{
          position: "fixed",
          top: 16,
          right: 16,
          zIndex: 10,
          padding: "8px 16px",
        }}
      >
        Переключить на {theme === "dark" ? "светлую" : "тёмную"} тему
      </button>
    </>
  );
}
```

Объект `options` пересоздаётся через `useMemo` при каждом изменении `theme`, поэтому canvas обновляется автоматически.

## Эффект конфетти

Используйте `@tsparticles/preset-confetti` для праздничного конфетти по событиям, например, по клику на кнопку:

```bash
npm install @tsparticles/preset-confetti
```

```tsx
"use client";

import Particles from "@tsparticles/react";
import { useCallback, useMemo, useState } from "react";
import { loadConfettiPreset } from "@tsparticles/preset-confetti";
import type { Container, ISourceOptions, Engine } from "@tsparticles/engine";

export default function ConfettiButton() {
  const [active, setActive] = useState(false);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadConfettiPreset(engine);
  }, []);

  const particlesLoaded = useCallback(
    async (container?: Container) => {
      if (active && container) {
        await container.play();
      }
    },
    [active],
  );

  const options: ISourceOptions = useMemo(
    () => ({
      preset: "confetti",
      fullScreen: { zIndex: 1000 },
    }),
    [],
  );

  const handleCelebrate = useCallback(() => {
    setActive(true);
    setTimeout(() => setActive(false), 5000);
  }, []);

  return (
    <>
      {active && <Particles id="confetti" init={particlesInit} particlesLoaded={particlesLoaded} options={options} />}
      <button onClick={handleCelebrate} style={{ position: "fixed", top: 16, left: 16, zIndex: 10 }}>
        Праздновать!
      </button>
    </>
  );
}
```

Колбэк `init` загружает пресет конфетти в движок до создания частиц.

## Эффект фейерверка

Аналогично, пресет фейерверка создаёт зрелищный салют:

```bash
npm install @tsparticles/preset-fireworks
```

```tsx
"use client";

import Particles from "@tsparticles/react";
import { useCallback, useMemo, useRef } from "react";
import { loadFireworksPreset } from "@tsparticles/preset-fireworks";
import type { Container, Engine } from "@tsparticles/engine";

export default function FireworksBackground() {
  const containerRef = useRef<Container | undefined>(undefined);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFireworksPreset(engine);
  }, []);

  const particlesLoaded = useCallback((container?: Container) => {
    containerRef.current = container;
  }, []);

  const options = useMemo(
    () => ({
      preset: "fireworks" as const,
      fullScreen: { zIndex: -1 },
      background: {
        color: "#000",
      },
    }),
    [],
  );

  return <Particles id="fireworks" init={particlesInit} particlesLoaded={particlesLoaded} options={options} />;
}
```

## Полный пример TypeScript с Container Ref

Получите доступ к экземпляру `Container` для программного управления анимацией (воспроизведение, пауза, уничтожение, экспорт изображения):

```tsx
"use client";

import Particles from "@tsparticles/react";
import { useCallback, useMemo, useRef } from "react";
import { loadFull } from "tsparticles";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";

export default function ControllableParticles() {
  const containerRef = useRef<Container | undefined>(undefined);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback((container?: Container) => {
    containerRef.current = container;
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: { zIndex: -1 },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: { enable: true, mode: "push" },
          onHover: { enable: true, mode: "repulse" },
        },
        modes: {
          push: { quantity: 4 },
          repulse: { distance: 100 },
        },
      },
      particles: {
        color: { value: "#ff0000" },
        links: {
          enable: true,
          color: "#ff0000",
          distance: 150,
        },
        move: { enable: true, speed: 2 },
        number: { value: 60 },
        size: { value: { min: 1, max: 5 } },
      },
    }),
    [],
  );

  const handlePause = useCallback(() => {
    containerRef.current?.pause();
  }, []);

  const handlePlay = useCallback(() => {
    containerRef.current?.play();
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <Particles id="tsparticles" init={particlesInit} particlesLoaded={particlesLoaded} options={options} />
      <div
        style={{
          position: "fixed",
          bottom: 16,
          right: 16,
          zIndex: 10,
          display: "flex",
          gap: 8,
        }}
      >
        <button onClick={handlePause}>Пауза</button>
        <button onClick={handlePlay}>Воспроизвести</button>
      </div>
    </div>
  );
}
```

Ключевые моменты:

- `particlesInit` загружает функции движка (выполняется только один раз за монтирование компонента).
- `particlesLoaded` срабатывает каждый раз при полной инициализации контейнера.
- `containerRef` хранит экземпляр `Container`, чтобы вы могли вызывать его методы позже.

## Производительность: useMemo и useCallback

Всегда оборачивайте статические или редко изменяющиеся опции в `useMemo`, а обработчики событий — в `useCallback`, чтобы предотвратить ненужные повторные рендеры canvas:

```tsx
"use client";

import Particles from "@tsparticles/react";
import { useCallback, useMemo, useState } from "react";
import type { Container, ISourceOptions } from "@tsparticles/engine";

export default function PerformanceExample() {
  const [particlesCount, setParticlesCount] = useState(80);

  // Стабильный колбэк — не пересоздаётся без изменения зависимостей
  const particlesLoaded = useCallback((container?: Container) => {
    console.log("Контейнер готов", container?.id);
  }, []);

  // Стабильный объект опций — предотвращает переинициализацию canvas
  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: { zIndex: -1 },
      particles: {
        number: { value: particlesCount },
        links: { enable: true },
        move: { enable: true },
      },
    }),
    [particlesCount],
  );

  return (
    <div>
      <Particles id="performance-particles" particlesLoaded={particlesLoaded} options={options} />
      <button onClick={() => setParticlesCount((c) => c + 20)}>Добавить 20 частиц</button>
    </div>
  );
}
```

Без этих оптимизаций каждый повторный рендер родителя создавал бы новый объект `options`, вызывая пересоздание canvas.

## Интеграция со страницей

Добавьте фон с частицами в макет страницы, не затрагивая содержимое страницы:

```tsx
// app/layout.tsx (серверный компонент)
import dynamic from "next/dynamic";

const ParticlesBackground = dynamic(() => import("@/components/particles-background"), { ssr: false });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <ParticlesBackground />
        <main style={{ position: "relative", zIndex: 1 }}>{children}</main>
      </body>
    </html>
  );
}
```

Используйте `dynamic()` с `ssr: false`, чтобы гарантировать, что компонент никогда не выполняется во время серверного рендеринга. Canvas частиц располагается позади основного содержимого через CSS `z-index`.

## Несколько экземпляров

Вы можете отобразить несколько независимых компонентов `Particles` на одной странице, каждый со своей конфигурацией:

```tsx
"use client";

import Particles from "@tsparticles/react";
import { useCallback, useMemo } from "react";
import type { Container, ISourceOptions } from "@tsparticles/engine";

function ParticlesGallery() {
  const loaded = useCallback((c?: Container) => {}, []);

  const redOptions: ISourceOptions = useMemo(
    () => ({
      fullScreen: false,
      height: 200,
      background: { color: "#1a0000" },
      particles: {
        color: { value: "#ff0000" },
        number: { value: 30 },
        move: { enable: true },
      },
    }),
    [],
  );

  const blueOptions: ISourceOptions = useMemo(
    () => ({
      fullScreen: false,
      height: 200,
      background: { color: "#00001a" },
      particles: {
        color: { value: "#0000ff" },
        number: { value: 30 },
        move: { enable: true },
      },
    }),
    [],
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Particles id="red-canvas" particlesLoaded={loaded} options={redOptions} />
      <Particles id="blue-canvas" particlesLoaded={loaded} options={blueOptions} />
    </div>
  );
}
```

Каждый компонент `Particles` создаёт независимый canvas со своим циклом анимации. Установите `fullScreen: false` и задайте каждому фиксированную высоту, чтобы они сосуществовали в потоке документа.

## Pages Router (легаси)

Если вы используете **Pages Router** Next.js (директория `pages/`), подход аналогичен, но без директивы `"use client"`. Вместо этого используйте динамический импорт в компоненте страницы:

```tsx
// pages/index.tsx
import dynamic from "next/dynamic";
import type { NextPage } from "next";

const ParticlesComponent = dynamic(() => import("../components/particles-component"), { ssr: false });

const Home: NextPage = () => {
  return (
    <div>
      <ParticlesComponent />
      <h1>Добро пожаловать</h1>
    </div>
  );
};

export default Home;
```

Сам компонент (`components/particles-component.tsx`) — это обычный React-компонент:

```tsx
import Particles from "@tsparticles/react";
import { useCallback, useMemo } from "react";
import type { Container, ISourceOptions } from "@tsparticles/engine";

export default function ParticlesComponent() {
  const particlesLoaded = useCallback((container?: Container) => {}, []);

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: { zIndex: -1 },
      particles: {
        number: { value: 80 },
        links: { enable: true },
        move: { enable: true },
      },
    }),
    [],
  );

  return <Particles id="tsparticles" particlesLoaded={particlesLoaded} options={options} />;
}
```

Обратите внимание, что Pages Router **не требует** `"use client"`, поскольку компоненты страниц по умолчанию уже рендерятся на клиенте.

## Устранение неполадок

| Симптом                        | Причина                                  | Исправление                                                        |
| ------------------------------ | ---------------------------------------- | ------------------------------------------------------------------ |
| Пустая белая страница          | SSR-рендеринг модуля, зависящего от canvas| Используйте `dynamic(..., { ssr: false })` или обёртку в клиентский компонент |
| Canvas не отображается         | Контейнер имеет нулевую высоту           | Установите `fullScreen: { zIndex: -1 }` или задайте явные размеры |
| Изменение опций не отражается  | Не создана новая ссылка на объект        | Используйте `useMemo` с правильным массивом зависимостей          |
| Пресет не работает             | Пресет не загружен до инициализации контейнера | Вызовите `loadXPreset(engine)` внутри колбэка `init`              |

## Следующие шаги

- Просмотрите [Интерактивные демо](/demos/) для готовых конфигураций.
- Прочтите полный [Справочник параметров](/options/) для каждого доступного параметра.
- Посетите страницу [Пресеты](/demos/presets) для дополнительных готовых пресетов, таких как снег, звёзды и светлячки.
