---
title: Preact
description: Интеграция tsParticles с Preact с помощью официальной обёртки @tsparticles/preact.
---

# Preact Integration

Пакет `@tsparticles/preact` предоставляет компонент `<Particles>`, который бесшовно работает с Preact, включая классовые и функциональные компоненты.

## Установка

```bash
npm install @tsparticles/preact tsparticles
```

Пакет `@tsparticles/preact` поставляется с объявлениями TypeScript. Дополнительные пакеты типов не требуются.

## Инициализация движка

Перед рендерингом частиц необходимо инициализировать движок с нужными плагинами. Вызовите `initParticlesEngine` один раз, до рендеринга приложения.

```typescript
import { initParticlesEngine } from "@tsparticles/preact";
import { loadFull } from "tsparticles";

void initParticlesEngine(async (engine) => {
  await loadFull(engine);
});
```

Для меньших сборок загружайте только необходимые функции:

```typescript
import { initParticlesEngine } from "@tsparticles/preact";
import { loadBasic } from "@tsparticles/basic";
import { loadPolygonMaskPlugin } from "@tsparticles/plugin-polygon-mask";

void initParticlesEngine(async (engine) => {
  await loadBasic(engine);
  await loadPolygonMaskPlugin(engine);
});
```

`initParticlesEngine` возвращает промис, который разрешается после регистрации всех плагинов. Компонент `<Particles>` не будет рендериться до завершения инициализации.

## Базовое использование

После инициализации движка используйте компонент `<Particles>` в любом месте вашего приложения:

```jsx
import Particles from "@tsparticles/preact";
import configs from "@tsparticles/configs";

function App() {
  return <Particles id="tsparticles" options={configs.basic} />;
}
```

Атрибут `id` устанавливает как ID DOM-элемента, так и идентификатор контейнера, используемый tsParticles внутри. Проп `options` принимает любой валидный объект конфигурации tsParticles.

## Переключение пресетов

Переключайтесь между пресетами динамически, изменяя проп `options`:

```jsx
import { useState } from "preact/hooks";
import Particles from "@tsparticles/preact";
import configs from "@tsparticles/configs";

function App() {
  const [preset, setPreset] = useState("basic");

  const presets = {
    basic: configs.basic,
    snow: configs.snow,
    stars: configs.stars,
    fireworks: configs.fireworks,
  };

  return (
    <div>
      <select onChange={(e) => setPreset(e.currentTarget.value)}>
        <option value="basic">Базовый</option>
        <option value="snow">Снег</option>
        <option value="stars">Звёзды</option>
        <option value="fireworks">Фейерверк</option>
      </select>
      <Particles id="tsparticles" key={preset} options={presets[preset]} />
    </div>
  );
}
```

Использование пропа `key` заставляет Preact перемонтировать компонент, полностью перезапуская частицы для каждого пресета.

## Классовый компонент

Для классовых компонентов инициализируйте движок в `componentDidMount` и управляйте состоянием в `componentDidUpdate`:

```jsx
import { Component } from "preact";
import Particles, { initParticlesEngine } from "@tsparticles/preact";
import { loadFull } from "tsparticles";
import configs from "@tsparticles/configs";

export default class ParticlesApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      engineReady: false,
      options: configs.basic,
    };
  }

  componentDidMount() {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      this.setState({ engineReady: true });
    });
  }

  handlePresetChange = (e) => {
    const presets = {
      basic: configs.basic,
      snow: configs.snow,
      stars: configs.stars,
    };
    this.setState({ options: presets[e.currentTarget.value] || configs.basic });
  };

  render() {
    const { engineReady, options } = this.state;

    return (
      <div>
        <select onChange={this.handlePresetChange}>
          <option value="basic">Базовый</option>
          <option value="snow">Снег</option>
          <option value="stars">Звёзды</option>
        </select>
        {engineReady && <Particles id="tsparticles" options={options} />}
      </div>
    );
  }
}
```

## Функциональный компонент

С хуками используйте `useState` и `useEffect` для инициализации движка и управления конфигурацией:

```jsx
import { useState, useEffect } from "preact/hooks";
import Particles, { initParticlesEngine } from "@tsparticles/preact";
import { loadFull } from "tsparticles";
import configs from "@tsparticles/configs";

export default function App() {
  const [engineReady, setEngineReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => setEngineReady(true));
  }, []);

  return <div>{engineReady && <Particles id="tsparticles" options={configs.snow} />}</div>;
}
```

## Пользовательская конфигурация

Определите полный объект конфигурации напрямую, вместо использования пресетов:

```jsx
import { useState, useEffect } from "preact/hooks";
import Particles, { initParticlesEngine } from "@tsparticles/preact";
import { loadFull } from "tsparticles";

export default function App() {
  const [engineReady, setEngineReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => setEngineReady(true));
  }, []);

  const options = {
    background: {
      color: "#0d1117",
    },
    fpsLimit: 120,
    particles: {
      color: {
        value: "#58a6ff",
      },
      links: {
        color: "#58a6ff",
        enable: true,
        opacity: 0.4,
        distance: 150,
      },
      move: {
        enable: true,
        speed: 2,
      },
      number: {
        value: 80,
        density: {
          enable: true,
        },
      },
      opacity: {
        value: 0.5,
      },
      size: {
        value: { min: 1, max: 4 },
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "repulse",
        },
        onClick: {
          enable: true,
          mode: "push",
        },
      },
      modes: {
        repulse: {
          distance: 100,
        },
        push: {
          quantity: 4,
        },
      },
    },
  };

  return <>{engineReady && <Particles id="tsparticles" options={options} />}</>;
}
```

## Reactive Behavior

The `<Particles>` component reacts to prop changes at runtime:

- **`id`**, **`options`**, or **`url`** change → the existing container is destroyed and particles are reloaded with the new values.
- **`theme`** change → `loadTheme` is called on the existing container. This requires the optional `@tsparticles/plugin-themes` package to be loaded (otherwise it is a safe no-op).

On component unmount, the particles container is automatically destroyed — no orphan animations remain.

## Обработка событий

Используйте колбэк `particlesLoaded` для доступа к экземпляру `Container` tsParticles после полного рендеринга частиц:

```jsx
import { useCallback, useState, useEffect } from "preact/hooks";
import Particles, { initParticlesEngine } from "@tsparticles/preact";
import { loadFull } from "tsparticles";
import configs from "@tsparticles/configs";

export default function App() {
  const [engineReady, setEngineReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => setEngineReady(true));
  }, []);

  const handleParticlesLoaded = useCallback(async (container) => {
    console.log("Контейнер частиц готов:", container);
    container?.refresh();
  }, []);

  return (
    <div>
      {engineReady && <Particles id="tsparticles" options={configs.basic} particlesLoaded={handleParticlesLoaded} />}
    </div>
  );
}
```

Колбэк `particlesLoaded` получает экземпляр `Container`, который можно использовать для вызова методов, таких как `refresh()`, `pause()`, `play()` или `destroy()`.
