---
title: Guida React
description: Guida completa per integrare tsParticles con React usando @tsparticles/react.
---

# Guida React

## Indice dei Contenuti

1. [Installazione](#installazione)
2. [Utilizzo Base](#utilizzo-base)
3. [Effetto Coriandoli](#effetto-coriandoli)
4. [Effetto Fuochi d'Artificio](#effetto-fuochi-dartificio)
5. [Effetto Neve](#effetto-neve)
6. [Collegamenti Interattivi](#collegamenti-interattivi)
7. [Cambio Tema](#cambio-tema)
8. [ParticlesProvider](#particlesprovider)
9. [Ottimizzazione Performance](#ottimizzazione-performance)
10. [Configurazione Personalizzata](#configurazione-personalizzata)

---

## Installazione

```bash
npm install @tsparticles/react tsparticles
```

Oppure con Yarn:

```bash
yarn add @tsparticles/react tsparticles
```

`@tsparticles/react` è il wrapper React ufficiale. Il pacchetto `tsparticles` è il motore principale.

---

## Utilizzo Base

La configurazione più semplice: renderizza il componente `<Particles />` con un oggetto options.

```jsx
import { useCallback } from "react";
import Particles from "@tsparticles/react";

export default function App() {
  const particlesLoaded = useCallback(async (container) => {
    console.log("Container particelle caricato", container);
  }, []);

  const options = {
    fpsLimit: 120,
    particles: {
      number: { value: 80 },
      color: { value: "#00d4ff" },
      shape: { type: "circle" },
      opacity: { value: 0.6 },
      size: { value: { min: 2, max: 5 } },
      move: {
        enable: true,
        speed: 2,
        outModes: { default: "bounce" },
      },
    },
    background: { color: "#0d1117" },
  };

  return <Particles id="tsparticles" particlesLoaded={particlesLoaded} options={options} />;
}
```

**Importante**: Il componente `<Particles />` richiede che il motore sia inizializzato prima. Usa `initParticlesEngine` da `@tsparticles/react` o `<ParticlesProvider>` per caricare i tuoi preset prima di renderizzare il componente.

---

## Effetto Coriandoli

Renderizza un'esplosione di coriandoli usando il preset confetti.

```jsx
import Particles from "@tsparticles/react";

export default function Confetti() {
  const options = {
    preset: "confetti",
    fullScreen: { enable: true, zIndex: -1 },
    confetti: {
      colors: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"],
      particleCount: 150,
      spread: 70,
      origin: { x: 0.5, y: 0.5 },
    },
  };

  return <Particles id="confetti" options={options} />;
}
```

Assicurati di aver caricato il preset confetti:

```bash
npm install @tsparticles/preset-confetti
```

Poi registralo nel punto di ingresso della tua app:

```jsx
import { initParticlesEngine } from "@tsparticles/react";
import { loadConfettiPreset } from "@tsparticles/preset-confetti";

initParticlesEngine(async (engine) => {
  await loadConfettiPreset(engine);
});
```

---

## Effetto Fuochi d'Artificio

Uno spettacolo pirotecnico a schermo intero.

```jsx
import { useCallback, useMemo } from "react";
import Particles from "@tsparticles/react";

export default function Fireworks() {
  const particlesLoaded = useCallback(async (container) => {
    console.log("Fuochi d'artificio caricati", container);
  }, []);

  const options = useMemo(
    () => ({
      preset: "fireworks",
      fullScreen: { enable: true, zIndex: -1 },
      fireworks: {
        background: "#000000",
        brightness: 100,
        colors: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"],
        intensity: 30,
        life: { min: 4, max: 8 },
        traces: 20,
        explosion: { min: 30, max: 60 },
      },
    }),
    [],
  );

  return <Particles id="fireworks" particlesLoaded={particlesLoaded} options={options} />;
}
```

Installa il preset:

```bash
npm install @tsparticles/preset-fireworks
```

---

## Effetto Neve

Delicati fiocchi di neve che cadono usando il preset snow.

```jsx
import { useCallback, useMemo } from "react";
import Particles from "@tsparticles/react";

export default function Snow() {
  const particlesLoaded = useCallback(async (container) => {
    console.log("Neve caricata", container);
  }, []);

  const options = useMemo(
    () => ({
      preset: "snow",
      fullScreen: { enable: true, zIndex: -1 },
      snow: {
        color: "#ffffff",
        opacity: { min: 0.3, max: 0.9 },
        size: { min: 1, max: 4 },
        speed: { min: 0.5, max: 2 },
        wobble: true,
      },
    }),
    [],
  );

  return <Particles id="snow" particlesLoaded={particlesLoaded} options={options} />;
}
```

Installa il preset:

```bash
npm install @tsparticles/preset-snow
```

---

## Collegamenti Interattivi

Una rete di nodi connessi con interazione di presa al passaggio del mouse e push al click.

```jsx
import { useCallback, useMemo } from "react";
import Particles from "@tsparticles/react";

export default function InteractiveLinks() {
  const particlesLoaded = useCallback(async (container) => {
    console.log("Collegamenti interattivi caricati", container);
  }, []);

  const options = useMemo(
    () => ({
      fpsLimit: 60,
      particles: {
        number: { value: 80, density: { enable: true } },
        color: { value: "#00d4ff" },
        shape: { type: "circle" },
        opacity: { value: 0.6 },
        size: { value: { min: 1, max: 4 } },
        links: {
          enable: true,
          distance: 150,
          color: "#00d4ff",
          opacity: 0.4,
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
          grab: { distance: 180, links: { opacity: 0.8 } },
          push: { quantity: 4 },
        },
      },
      background: { color: "#0d1117" },
    }),
    [],
  );

  return <Particles id="interactive-links" particlesLoaded={particlesLoaded} options={options} />;
}
```

---

## Cambio Tema

Definisci temi multipli e passa dall'uno all'altro con un click su un pulsante.

```jsx
import { useCallback, useMemo, useRef, useState } from "react";
import Particles from "@tsparticles/react";

export default function ThemeSwitcher() {
  const containerRef = useRef(null);
  const [currentTheme, setCurrentTheme] = useState("dark");

  const particlesLoaded = useCallback(async (container) => {
    containerRef.current = container;
  }, []);

  const options = useMemo(
    () => ({
      fpsLimit: 60,
      particles: {
        number: { value: 60 },
        color: { value: "#00d4ff" },
        shape: { type: "circle" },
        opacity: { value: 0.6 },
        size: { value: { min: 2, max: 5 } },
        links: { enable: true, distance: 150, color: "#00d4ff", opacity: 0.3 },
        move: { enable: true, speed: 1.5, outModes: { default: "bounce" } },
      },
      background: { color: "#0d1117" },
      themes: [
        {
          name: "dark",
          default: { value: true },
          options: {
            background: { color: "#0d1117" },
            particles: { color: { value: "#00d4ff" }, links: { color: "#00d4ff" } },
          },
        },
        {
          name: "light",
          options: {
            background: { color: "#f5f5f5" },
            particles: { color: { value: "#e74c3c" }, links: { color: "#333333" } },
          },
        },
        {
          name: "forest",
          options: {
            background: { color: "#1a3a1a" },
            particles: { color: { value: "#7ec850" }, links: { color: "#7ec850" } },
          },
        },
      ],
    }),
    [],
  );

  const switchTheme = useCallback((theme) => {
    setCurrentTheme(theme);
    if (containerRef.current) {
      containerRef.current.loadTheme(theme);
    }
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <Particles id="theme-switcher" particlesLoaded={particlesLoaded} options={options} />
      <div
        style={{
          position: "absolute",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          display: "flex",
          gap: 8,
        }}
      >
        <button onClick={() => switchTheme("dark")} style={btnStyle(currentTheme === "dark")}>
          Scuro
        </button>
        <button onClick={() => switchTheme("light")} style={btnStyle(currentTheme === "light")}>
          Chiaro
        </button>
        <button onClick={() => switchTheme("forest")} style={btnStyle(currentTheme === "forest")}>
          Foresta
        </button>
      </div>
    </div>
  );
}

const btnStyle = (active) => ({
  padding: "8px 16px",
  border: "none",
  borderRadius: 6,
  background: active ? "#333" : "#666",
  color: "#fff",
  cursor: "pointer",
});
```

---

## ParticlesProvider

Usa `ParticlesProvider` per inizializzare il motore una volta nella radice dell'app. Questo è l'approccio consigliato quando hai più componenti particella o usi preset personalizzati.

```jsx
// App.jsx
import { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import Home from "./Home";

const engineInit = async (engine) => {
  await loadSlim(engine);
  // Carica preset aggiuntivi qui:
  // await loadConfettiPreset(engine);
  // await loadFireworksPreset(engine);
  // await loadSnowPreset(engine);
};

export default function App() {
  return (
    <ParticlesProvider load={engineInit}>
      <Home />
    </ParticlesProvider>
  );
}
```

```jsx
// Home.jsx
import Particles from "@tsparticles/react";

export default function Home() {
  return (
    <Particles
      id="tsparticles"
      options={{
        particles: {
          number: { value: 50 },
          color: { value: "#ff6b6b" },
          shape: { type: "circle" },
          opacity: { value: 0.7 },
          size: { value: { min: 2, max: 6 } },
          move: { enable: true, speed: 1, outModes: { default: "bounce" } },
        },
        background: { color: "#1a1a2e" },
      }}
    />
  );
}
```

Quando avvolgi il tuo albero con `ParticlesProvider`, ogni componente `<Particles />` figlio eredita la stessa istanza del motore. Questo evita di reinizializzare il motore ad ogni montaggio.

---

## Ottimizzazione Performance

Memorizza sempre le callback e le opzioni per prevenire re-render non necessari.

```jsx
import { useCallback, useMemo, useState } from "react";
import Particles from "@tsparticles/react";

export default function PerformanceExample() {
  const [visible, setVisible] = useState(true);

  // Memorizza la callback — riferimento stabile tra i render
  const particlesLoaded = useCallback(async (container) => {
    // Chiamata una volta per montaggio del container
    console.log("Container pronto", container?.id);
  }, []);

  // Memorizza l'oggetto opzioni — ricalcolo solo quando le dipendenze cambiano
  const options = useMemo(
    () => ({
      fpsLimit: 60,
      particles: {
        number: { value: 100, density: { enable: true } },
        color: { value: ["#ff6b6b", "#feca57", "#48dbfb"] },
        shape: { type: "circle" },
        opacity: { value: { min: 0.3, max: 0.7 } },
        size: { value: { min: 2, max: 5 } },
        links: {
          enable: true,
          distance: 120,
          color: "random",
          opacity: 0.3,
        },
        move: {
          enable: true,
          speed: 1,
          outModes: { default: "bounce" },
        },
      },
      background: { color: "#0d1117" },
    }),
    [],
  );

  // Riduci la risoluzione del canvas su dispositivi a bassa potenza
  const responsiveOptions = useMemo(
    () => ({
      ...options,
      detectRetina: window.devicePixelRatio <= 2,
      fpsLimit: window.innerWidth < 768 ? 30 : 60,
    }),
    [options],
  );

  return (
    <div>
      <button onClick={() => setVisible((v) => !v)}>{visible ? "Nascondi" : "Mostra"} Particelle</button>
      {visible && <Particles id="perf-particles" particlesLoaded={particlesLoaded} options={responsiveOptions} />}
    </div>
  );
}
```

**Suggerimenti chiave**:

- Usa sempre `useMemo` per l'oggetto `options`.
- Usa sempre `useCallback` per il gestore `particlesLoaded`.
- Riduci `fpsLimit` su dispositivi mobili.
- Imposta `detectRetina: false` su dispositivi con rapporto pixel >2x per dimezzare la dimensione del canvas.
- Smonta condizionalmente `<Particles />` quando non è visibile.

---

## Reactive Behavior

The `<Particles>` component reacts to prop changes at runtime:

- **`id`**, **`options`**, or **`url`** change → the existing container is destroyed and particles are reloaded with the new values.
- **`theme`** change → `loadTheme` is called on the existing container. This requires the optional `@tsparticles/plugin-themes` package to be loaded (otherwise it is a safe no-op).

On component unmount, the particles container is automatically destroyed — no orphan animations remain.

## Configurazione Personalizzata

Un esempio personalizzato completo che combina forme multiple, interattività, temi e uno sfondo sfumato.

```jsx
import { useCallback, useMemo } from "react";
import Particles from "@tsparticles/react";

export default function CustomConfig() {
  const particlesLoaded = useCallback(async (container) => {
    console.log("Configurazione personalizzata caricata", container);
  }, []);

  const options = useMemo(
    () => ({
      fullScreen: { enable: true, zIndex: 0 },
      fpsLimit: 60,
      particles: {
        number: { value: 60, density: { enable: true, width: 800, height: 800 } },
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
      themes: [
        {
          name: "light",
          default: { value: false },
          options: {
            background: { color: "#f0f0f5" },
            particles: {
              color: { value: ["#e74c3c", "#2ecc71", "#3498db", "#f1c40f"] },
              links: { color: "#333333", opacity: 0.2 },
              opacity: { value: { min: 0.5, max: 0.9 } },
            },
          },
        },
      ],
    }),
    [],
  );

  return <Particles id="custom-config" particlesLoaded={particlesLoaded} options={options} />;
}
```

---

Ora hai coperto i pattern principali per usare tsParticles in React. Ogni esempio è autonomo e pronto per essere inserito in un file componente.
