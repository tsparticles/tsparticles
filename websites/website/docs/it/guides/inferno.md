---
title: Guida Inferno
description: Guida completa per integrare tsParticles con applicazioni Inferno.
---

# Guida Inferno

## Indice dei Contenuti

1. [Installazione](#installazione)
2. [Utilizzo Base](#utilizzo-base)
3. [Inizializzazione del Motore](#inizializzazione-del-motore)
4. [Configurazione Personalizzata](#configurazione-personalizzata)
5. [Uso dei Preset](#uso-dei-preset)
6. [Pattern Componente](#pattern-componente)
7. [Esempio TypeScript](#esempio-typescript)

---

## Installazione

Installa il wrapper Inferno e il motore tsParticles tramite npm:

```bash
npm install @tsparticles/inferno tsparticles
```

Installa opzionalmente il preset slim per un bundle più piccolo:

```bash
npm install @tsparticles/slim
```

---

## Utilizzo Base

Il pacchetto `@tsparticles/inferno` esporta due elementi: `ParticlesProvider` e `Particles`. Avvolgi i tuoi componenti particella con `ParticlesProvider` che accetta una callback `init` per la configurazione del motore, poi usa `<Particles>` per renderizzare il canvas delle particelle.

```tsx
import { render } from "inferno";
import { Particles, ParticlesProvider } from "@tsparticles/inferno";
import { loadSlim } from "@tsparticles/slim";

const options = {
  fpsLimit: 60,
  particles: {
    number: { value: 80 },
    color: { value: "#00d4ff" },
    shape: { type: "circle" },
    opacity: { value: 0.6 },
    size: { value: { min: 2, max: 5 } },
    links: {
      enable: true,
      distance: 150,
      color: "#00d4ff",
      opacity: 0.3,
      width: 1,
    },
    move: {
      enable: true,
      speed: 1.5,
      direction: "none",
      random: true,
      outModes: { default: "bounce" },
    },
  },
  background: { color: "#0d1117" },
};

function App() {
  return (
    <ParticlesProvider
      init={async (engine) => {
        await loadSlim(engine);
      }}
    >
      <Particles id="tsparticles" options={options} />
    </ParticlesProvider>
  );
}

render(<App />, document.getElementById("app"));
```

`ParticlesProvider` deve essere un antenato di ogni componente `<Particles>`. Inizializza il motore una volta e lo fornisce tramite contesto a tutti i figli.

---

## Inizializzazione del Motore

`ParticlesProvider` accetta una prop `init` che riceve l'istanza del motore. Qui è dove carichi le funzionalità, forme, preset o aggiornamenti necessari alla tua app.

```tsx
// Leggero — particelle circolari, movimento base, collegamenti
<ParticlesProvider init={async engine => {
  const { loadSlim } = await import("@tsparticles/slim");
  await loadSlim(engine);
}}>

// Insieme completo di funzionalità — tutte le forme, interazioni, effetti
<ParticlesProvider init={async engine => {
  const { loadFull } = await import("tsparticles");
  await loadFull(engine);
}}>

// Preset-specifico — coriandoli, fuochi d'artificio, neve, stelle
<ParticlesProvider init={async engine => {
  const { loadConfettiPreset } = await import("@tsparticles/preset-confetti");
  await loadConfettiPreset(engine);
}}>
```

Usare `import()` dinamico all'interno della callback abilita il code splitting: i moduli preset o funzionalità vengono caricati solo quando il componente particella viene montato.

---

## Configurazione Personalizzata

Ecco una configurazione completa con interattività, tipi di forma multipli e uno sfondo sfumato scuro.

```tsx
import { render } from "inferno";
import { Particles, ParticlesProvider } from "@tsparticles/inferno";
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  fullScreen: { enable: true, zIndex: -1 },
  fpsLimit: 60,
  particles: {
    number: {
      value: 60,
      density: { enable: true, width: 800, height: 800 },
    },
    color: {
      value: ["#ff6b6b", "#feca57", "#48dbfb", "#ff9ff3", "#54a0ff"],
    },
    shape: {
      type: ["circle", "triangle", "polygon"],
      options: {
        polygon: { sides: 6 },
      },
    },
    opacity: { value: { min: 0.4, max: 0.8 } },
    size: { value: { min: 3, max: 8 } },
    links: {
      enable: true,
      distance: 200,
      color: "#ffffff",
      opacity: 0.15,
      width: 1,
    },
    move: {
      enable: true,
      speed: 2,
      direction: "none",
      random: true,
      straight: false,
      outModes: { default: "out" },
    },
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: "attract" },
      onClick: { enable: true, mode: "repulse" },
    },
    modes: {
      attract: { distance: 200, duration: 0.4, factor: 1 },
      repulse: { distance: 200, duration: 0.4 },
    },
  },
  background: { color: "#0f0f23" },
};

function App() {
  return (
    <ParticlesProvider
      init={async (engine) => {
        const { loadSlim } = await import("@tsparticles/slim");
        await loadSlim(engine);
      }}
    >
      <Particles id="tsparticles" options={options} />
    </ParticlesProvider>
  );
}

render(<App />, document.getElementById("app"));
```

---

## Uso dei Preset

Il pacchetto `@tsparticles/configs` offre configurazioni predefinite che puoi passare direttamente alla prop `options`. Combinale con il corrispondente caricatore preset nella callback `init` di `ParticlesProvider`.

```tsx
import { render } from "inferno";
import { Particles, ParticlesProvider } from "@tsparticles/inferno";
import configs from "@tsparticles/configs";

function App() {
  return (
    <ParticlesProvider
      init={async (engine) => {
        const { loadFull } = await import("tsparticles");
        await loadFull(engine);
      }}
    >
      <Particles id="tsparticles" options={configs.confetti} />
    </ParticlesProvider>
  );
}

render(<App />, document.getElementById("app"));
```

Puoi sostituire `configs.confetti` con qualsiasi preset disponibile: `configs.basic`, `configs.fireworks`, `configs.snow`, `configs.stars`, ecc.

---

## Pattern Componente

Per applicazioni più grandi, struttura la logica delle particelle in un componente dedicato con una callback `particlesLoaded` per accedere all'istanza `Container`.

```tsx
import { render, Component } from "inferno";
import { Particles, ParticlesProvider } from "@tsparticles/inferno";
import type { Container, ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  fpsLimit: 60,
  particles: {
    number: { value: 80 },
    color: { value: "#00d4ff" },
    shape: { type: "circle" },
    opacity: { value: 0.6 },
    size: { value: { min: 2, max: 5 } },
    links: {
      enable: true,
      distance: 150,
      color: "#00d4ff",
      opacity: 0.3,
      width: 1,
    },
    move: {
      enable: true,
      speed: 1.5,
      outModes: { default: "bounce" },
    },
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: "grab" },
      onClick: { enable: true, mode: "push" },
    },
    modes: {
      grab: { distance: 180, links: { opacity: 0.6 } },
      push: { quantity: 3 },
    },
  },
  background: { color: "#0a0a1a" },
};

class ParticlesBackground extends Component {
  private container?: Container;

  handleParticlesLoaded(container?: Container) {
    this.container = container;
    console.log("Particelle caricate:", container?.id);
  }

  render() {
    return (
      <ParticlesProvider
        init={async (engine) => {
          const { loadSlim } = await import("@tsparticles/slim");
          await loadSlim(engine);
        }}
      >
        <Particles id="tsparticles" options={options} particlesLoaded={this.handleParticlesLoaded} />
      </ParticlesProvider>
    );
  }
}

function App() {
  return (
    <div>
      <h1 style={{ position: "relative", zIndex: 1, color: "#fff" }}>tsParticles + Inferno</h1>
      <ParticlesBackground />
    </div>
  );
}

render(<App />, document.getElementById("app"));
```

---

## Esempio TypeScript

Ecco un'applicazione Inferno completa e tipizzata con una configurazione di particelle reattiva e sfondo a schermo intero.

```tsx
import { render } from "inferno";
import { Particles, ParticlesProvider } from "@tsparticles/inferno";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";

const particlesOptions: ISourceOptions = {
  fullScreen: { enable: true, zIndex: -1 },
  fpsLimit: 60,
  particles: {
    number: { value: 80, density: { enable: true } },
    color: { value: "#6366f1" },
    shape: { type: "circle" },
    opacity: { value: { min: 0.3, max: 0.7 } },
    size: { value: { min: 2, max: 6 } },
    links: {
      enable: true,
      distance: 160,
      color: "#6366f1",
      opacity: 0.25,
      width: 1,
    },
    move: {
      enable: true,
      speed: 1.2,
      direction: "none",
      random: false,
      straight: false,
      outModes: { default: "bounce" },
    },
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: "grab" },
      onClick: { enable: true, mode: "push" },
    },
    modes: {
      grab: { distance: 180, links: { opacity: 0.6 } },
      push: { quantity: 3 },
    },
  },
  background: { color: "#0a0a1a" },
};

function handleInit(engine: Engine): Promise<void> {
  return import("@tsparticles/slim").then(({ loadSlim }) => loadSlim(engine));
}

function handleParticlesLoaded(container?: Container): void {
  console.log("Container tsParticles pronto:", container?.id);
}

function App() {
  return (
    <ParticlesProvider init={handleInit}>
      <div style={{ position: "relative", zIndex: 1, color: "#fff", textAlign: "center", paddingTop: "2rem" }}>
        <h1>tsParticles + Inferno</h1>
        <p>Integrazione TypeScript completa</p>
      </div>
      <Particles id="tsparticles" options={particlesOptions} particlesLoaded={handleParticlesLoaded} />
    </ParticlesProvider>
  );
}

render(<App />, document.getElementById("app"));
```

---

Ora hai tutto il necessario per integrare tsParticles in un'applicazione Inferno. Ogni esempio è autonomo e pronto per essere copiato nel tuo progetto.
