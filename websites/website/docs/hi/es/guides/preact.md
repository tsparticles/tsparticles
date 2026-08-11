---
title: Preact
description: Integra tsParticles con Preact usando el wrapper oficial @tsparticles/preact.
---

# Integración con Preact

El paquete `@tsparticles/preact` proporciona un componente `<Particles>` que funciona perfectamente con Preact, incluyendo patrones de componentes de clase y funcionales.

## Instalación

```bash
npm install @tsparticles/preact tsparticles
```

El paquete `@tsparticles/preact` incluye declaraciones TypeScript. No se necesitan paquetes de tipos adicionales.

## Inicialización del Motor

Antes de que puedas renderizar partículas, debes inicializar el motor con los plugins que necesitas. Llama a `initParticlesEngine` una vez, antes de que tu aplicación se renderice.

```typescript
import { initParticlesEngine } from "@tsparticles/preact";
import { loadFull } from "tsparticles";

void initParticlesEngine(async (engine) => {
  await loadFull(engine);
});
```

Para paquetes más pequeños, carga solo las funcionalidades que necesitas:

```typescript
import { initParticlesEngine } from "@tsparticles/preact";
import { loadBasic } from "@tsparticles/basic";
import { loadPolygonMaskPlugin } from "@tsparticles/plugin-polygon-mask";

void initParticlesEngine(async (engine) => {
  await loadBasic(engine);
  await loadPolygonMaskPlugin(engine);
});
```

`initParticlesEngine` devuelve una promesa que se resuelve una vez que todos los plugins están registrados. El componente `<Particles>` no se renderizará hasta que la inicialización esté completa.

## Uso Básico

Una vez que el motor está inicializado, usa el componente `<Particles>` en cualquier parte de tu aplicación:

```jsx
import Particles from "@tsparticles/preact";
import configs from "@tsparticles/configs";

function App() {
  return <Particles id="tsparticles" options={configs.basic} />;
}
```

El atributo `id` establece tanto el id del elemento DOM como el identificador del contenedor utilizado internamente por tsParticles. La propiedad `options` acepta cualquier objeto de configuración válido de tsParticles.

## Cambio de Presets

Cambia entre presets dinámicamente modificando la propiedad `options`:

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
        <option value="basic">Básico</option>
        <option value="snow">Nieve</option>
        <option value="stars">Estrellas</option>
        <option value="fireworks">Fuegos Artificiales</option>
      </select>
      <Particles id="tsparticles" key={preset} options={presets[preset]} />
    </div>
  );
}
```

Usar una propiedad `key` obliga a Preact a desmontar y volver a montar el componente, reiniciando completamente las partículas para cada preset.

## Componente de Clase

Para componentes basados en clases, inicializa el motor en `componentDidMount` y gestiona el estado en `componentDidUpdate`:

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
          <option value="basic">Básico</option>
          <option value="snow">Nieve</option>
          <option value="stars">Estrellas</option>
        </select>
        {engineReady && <Particles id="tsparticles" options={options} />}
      </div>
    );
  }
}
```

## Componente Funcional

Con hooks, usa `useState` y `useEffect` para inicializar el motor y gestionar la configuración:

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

## Configuración Personalizada

Define un objeto de configuración completo directamente en lugar de usar presets:

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

## Manejo de Eventos

Usa el callback `particlesLoaded` para acceder a la instancia de `Container` de tsParticles después de que las partículas estén completamente renderizadas:

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
    console.log("Contenedor de partículas listo:", container);
    container?.refresh();
  }, []);

  return (
    <div>
      {engineReady && <Particles id="tsparticles" options={configs.basic} particlesLoaded={handleParticlesLoaded} />}
    </div>
  );
}
```

El callback `particlesLoaded` recibe la instancia de `Container`, que puedes usar para llamar a métodos como `refresh()`, `pause()`, `play()` o `destroy()`.
