---
title: Preact
description: Integrieren Sie tsParticles mit Preact über den offiziellen @tsparticles/preact-Wrapper.
---

# Preact-Integration

Das Paket `@tsparticles/preact` bietet eine `<Particles>`-Komponente, die nahtlos mit Preact funktioniert, einschließlich Klassen- und Funktionskomponenten-Mustern.

## Installation

```bash
npm install @tsparticles/preact tsparticles
```

Das Paket `@tsparticles/preact` enthält TypeScript-Deklarationen. Es sind keine zusätzlichen Typ-Pakete erforderlich.

## Engine-Initialisierung

Bevor Sie Partikel rendern können, müssen Sie die Engine mit den benötigten Plugins initialisieren. Rufen Sie `initParticlesEngine` einmal auf, bevor Ihre App rendert.

```typescript
import { initParticlesEngine } from "@tsparticles/preact";
import { loadFull } from "tsparticles";

void initParticlesEngine(async (engine) => {
  await loadFull(engine);
});
```

Für kleinere Bundles laden Sie nur die benötigten Funktionen:

```typescript
import { initParticlesEngine } from "@tsparticles/preact";
import { loadBasic } from "@tsparticles/basic";
import { loadPolygonMaskPlugin } from "@tsparticles/plugin-polygon-mask";

void initParticlesEngine(async (engine) => {
  await loadBasic(engine);
  await loadPolygonMaskPlugin(engine);
});
```

`initParticlesEngine` gibt ein Promise zurück, das aufgelöst wird, sobald alle Plugins registriert sind. Die `<Particles>`-Komponente wird erst rendern, wenn die Initialisierung abgeschlossen ist.

## Grundlegende Verwendung

Sobald die Engine initialisiert ist, verwenden Sie die `<Particles>`-Komponente überall in Ihrer App:

```jsx
import Particles from "@tsparticles/preact";
import configs from "@tsparticles/configs";

function App() {
  return <Particles id="tsparticles" options={configs.basic} />;
}
```

Das `id`-Attribut setzt sowohl die DOM-Element-ID als auch die Container-Kennung, die von tsParticles intern verwendet wird. Die `options`-Eigenschaft akzeptiert jedes gültige tsParticles-Konfigurationsobjekt.

## Preset-Umschaltung

Schalten Sie zwischen Presets dynamisch um, indem Sie die `options`-Eigenschaft ändern:

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

Die Verwendung einer `key`-Eigenschaft zwingt Preact, die Komponente neu zu montieren und die Partikel für jedes Preset vollständig neu zu starten.

## Klassenkomponente

Für klassenbasierte Komponenten initialisieren Sie die Engine in `componentDidMount` und verwalten den Status in `componentDidUpdate`:

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

## Funktionskomponente

Mit Hooks verwenden Sie `useState` und `useEffect`, um die Engine zu initialisieren und die Konfiguration zu verwalten:

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

## Benutzerdefinierte Konfiguration

Definieren Sie direkt ein vollständiges Konfigurationsobjekt anstelle von Presets:

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

## Ereignisbehandlung

Verwenden Sie den `particlesLoaded`-Callback, um nach dem vollständigen Rendern der Partikel auf die tsParticles-`Container`-Instanz zuzugreifen:

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
    console.log("Partikel-Container bereit:", container);
    container?.refresh();
  }, []);

  return (
    <div>
      {engineReady && <Particles id="tsparticles" options={configs.basic} particlesLoaded={handleParticlesLoaded} />}
    </div>
  );
}
```

Der `particlesLoaded`-Callback erhält die `Container`-Instanz, die Sie verwenden können, um Methoden wie `refresh()`, `pause()`, `play()` oder `destroy()` aufzurufen.
