---
title: Preact
description: Integra tsParticles con Preact usando il wrapper ufficiale @tsparticles/preact.
---

# Integrazione Preact

Il pacchetto `@tsparticles/preact` fornisce un componente `<Particles>` che funziona perfettamente con Preact, supportando sia i pattern con classi che con componenti funzionali.

## Installazione

```bash
npm install @tsparticles/preact tsparticles
```

Il pacchetto `@tsparticles/preact` include dichiarazioni TypeScript. Non sono necessari pacchetti di tipi aggiuntivi.

## Inizializzazione del Motore

Prima di poter renderizzare le particelle, devi inizializzare il motore con i plugin necessari. Chiama `initParticlesEngine` una volta, prima che la tua app venga renderizzata.

```typescript
import { initParticlesEngine } from "@tsparticles/preact";
import { loadFull } from "tsparticles";

void initParticlesEngine(async (engine) => {
  await loadFull(engine);
});
```

Per bundle più piccoli, carica solo le funzionalità di cui hai bisogno:

```typescript
import { initParticlesEngine } from "@tsparticles/preact";
import { loadBasic } from "@tsparticles/basic";
import { loadPolygonMaskPlugin } from "@tsparticles/plugin-polygon-mask";

void initParticlesEngine(async (engine) => {
  await loadBasic(engine);
  await loadPolygonMaskPlugin(engine);
});
```

`initParticlesEngine` restituisce una promise che si risolve una volta che tutti i plugin sono registrati. Il componente `<Particles>` non verrà renderizzato fino al completamento dell'inizializzazione.

## Utilizzo Base

Una volta che il motore è inizializzato, usa il componente `<Particles>` in qualsiasi punto della tua app:

```jsx
import Particles from "@tsparticles/preact";
import configs from "@tsparticles/configs";

function App() {
  return <Particles id="tsparticles" options={configs.basic} />;
}
```

L'attributo `id` imposta sia l'ID dell'elemento DOM che l'identificatore del container usato internamente da tsParticles. La prop `options` accetta qualsiasi oggetto di configurazione tsParticles valido.

## Cambio Preset

Passa da un preset all'altro dinamicamente cambiando la prop `options`:

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
        <option value="basic">Base</option>
        <option value="snow">Neve</option>
        <option value="stars">Stelle</option>
        <option value="fireworks">Fuochi d'Artificio</option>
      </select>
      <Particles id="tsparticles" key={preset} options={presets[preset]} />
    </div>
  );
}
```

Usando una prop `key`, Preact rimonta il componente, riavviando completamente le particelle per ogni preset.

## Componente con Classe

Per componenti basati su classi, inizializza il motore in `componentDidMount` e gestisci lo stato in `componentDidUpdate`:

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
          <option value="basic">Base</option>
          <option value="snow">Neve</option>
          <option value="stars">Stelle</option>
        </select>
        {engineReady && <Particles id="tsparticles" options={options} />}
      </div>
    );
  }
}
```

## Componente Funzionale

Con gli hook, usa `useState` e `useEffect` per inizializzare il motore e gestire la configurazione:

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

## Configurazione Personalizzata

Definisci un oggetto di configurazione completo direttamente invece di usare preset:

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

## Gestione Eventi

Usa la callback `particlesLoaded` per accedere all'istanza `Container` di tsParticles dopo che le particelle sono state completamente renderizzate:

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
    console.log("Container particelle pronto:", container);
    container?.refresh();
  }, []);

  return (
    <div>
      {engineReady && <Particles id="tsparticles" options={configs.basic} particlesLoaded={handleParticlesLoaded} />}
    </div>
  );
}
```

La callback `particlesLoaded` riceve l'istanza `Container`, che puoi usare per chiamare metodi come `refresh()`, `pause()`, `play()` o `destroy()`.
