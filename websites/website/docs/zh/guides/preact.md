---
title: Preact
description: Integrate tsParticles with Preact using the official @tsparticles/preact wrapper.
---

# Preact Integration

The `@tsparticles/preact` package provides a `<Particles>` component that works seamlessly with Preact, including both class and functional component patterns.

## Installation

```bash
npm install @tsparticles/preact tsparticles
```

The `@tsparticles/preact` package ships with TypeScript declarations. No additional type packages are needed.

## Engine Initialization

Before you can render particles, you must initialize the engine with the plugins you need. Call `initParticlesEngine` once, before your app renders.

```typescript
import { initParticlesEngine } from "@tsparticles/preact";
import { loadFull } from "tsparticles";

void initParticlesEngine(async (engine) => {
  await loadFull(engine);
});
```

For smaller bundles, load only the features you need:

```typescript
import { initParticlesEngine } from "@tsparticles/preact";
import { loadBasic } from "@tsparticles/basic";
import { loadPolygonMaskPlugin } from "@tsparticles/plugin-polygon-mask";

void initParticlesEngine(async (engine) => {
  await loadBasic(engine);
  await loadPolygonMaskPlugin(engine);
});
```

`initParticlesEngine` returns a promise that resolves once all plugins are registered. The `<Particles>` component will not render until initialization is complete.

## Basic Usage

Once the engine is initialized, use the `<Particles>` component anywhere in your app:

```jsx
import Particles from "@tsparticles/preact";
import configs from "@tsparticles/configs";

function App() {
  return <Particles id="tsparticles" options={configs.basic} />;
}
```

The `id` attribute sets both the DOM element id and the container identifier used by tsParticles internally. The `options` prop accepts any valid tsParticles configuration object.

## Preset Switching

Switch between presets dynamically by changing the `options` prop:

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
        <option value="basic">Basic</option>
        <option value="snow">Snow</option>
        <option value="stars">Stars</option>
        <option value="fireworks">Fireworks</option>
      </select>
      <Particles id="tsparticles" key={preset} options={presets[preset]} />
    </div>
  );
}
```

Using a `key` prop forces Preact to remount the component, fully restarting the particles for each preset.

## Class Component

For class-based components, initialize the engine in `componentDidMount` and manage state in `componentDidUpdate`:

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
          <option value="basic">Basic</option>
          <option value="snow">Snow</option>
          <option value="stars">Stars</option>
        </select>
        {engineReady && <Particles id="tsparticles" options={options} />}
      </div>
    );
  }
}
```

## Functional Component

With hooks, use `useState` and `useEffect` to initialize the engine and manage configuration:

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

## Custom Configuration

Define a full configuration object directly instead of using presets:

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

## Event Handling

Use the `particlesLoaded` callback to access the tsParticles `Container` instance after particles are fully rendered:

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
    console.log("Particles container ready:", container);
    container?.refresh();
  }, []);

  return (
    <div>
      {engineReady && <Particles id="tsparticles" options={configs.basic} particlesLoaded={handleParticlesLoaded} />}
    </div>
  );
}
```

The `particlesLoaded` callback receives the `Container` instance, which you can use to call methods like `refresh()`, `pause()`, `play()`, or `destroy()`.

## Reactive Behavior

The `<Particles>` component automatically reloads particles when `id`, `options`, or `url` props change. Changes to the `theme` prop apply the theme via `loadTheme` without a full reload — this requires the optional `@tsparticles/plugin-themes` package to be loaded (safe no-op otherwise).

## Cleanup

On component unmount, the particles container is automatically destroyed, stopping all animations and freeing resources.
