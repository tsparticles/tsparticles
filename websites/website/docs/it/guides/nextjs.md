---
title: Integrazione Next.js
description: Guida passo-passo per integrare tsParticles in un'applicazione Next.js usando l'App Router.
---

# Integrazione Next.js

Questa guida copre l'integrazione di tsParticles in un progetto Next.js usando l'**App Router** (Next.js 13+). Per il legacy Pages Router, consulta la sezione [Legacy Pages Router](#legacy-pages-router) in fondo.

## Installazione

Installa il wrapper `@tsparticles/react` e il motore `tsparticles` completo (o un bundle slim per build più piccole):

```bash
npm install @tsparticles/react tsparticles
```

Se preferisci il bundle più piccolo `@tsparticles/slim`:

```bash
npm install @tsparticles/react @tsparticles/slim
```

## Utilizzo Base (App Router)

I componenti dell'App Router di Next.js sono lato server per impostazione predefinita. Poiché tsParticles richiede l'API `canvas` del browser, devi contrassegnare il componente con la direttiva `"use client"`.

```tsx
"use client";

import Particles from "@tsparticles/react";
import { useCallback, useMemo } from "react";
import type { Container, ISourceOptions } from "@tsparticles/engine";

export default function ParticlesBackground() {
  const particlesLoaded = useCallback((container?: Container) => {
    console.log("Particelle caricate", container);
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

Crea questo file come `components/particles-background.tsx` e importalo in qualsiasi pagina o layout. Poiché il file inizia con `"use client"`, verrà renderizzato lato client — esattamente dove tsParticles deve essere.

## Cambio Tema

Combina tsParticles con i selettori di tema di Next.js derivando le opzioni dallo stato del tema corrente:

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
        Passa a modalità {theme === "dark" ? "Chiara" : "Scura"}
      </button>
    </>
  );
}
```

L'oggetto `options` viene ricreato tramite `useMemo` ogni volta che `theme` cambia, quindi il canvas si aggiorna automaticamente.

## Effetto Coriandoli

Usa `@tsparticles/preset-confetti` per attivare coriandoli festivi su eventi come click sui pulsanti:

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
        Festeggia!
      </button>
    </>
  );
}
```

La callback `init` carica il preset coriandoli nel motore prima che le particelle vengano create.

## Effetto Fuochi d'Artificio

Allo stesso modo, il preset fuochi d'artificio crea uno spettacolo pirotecnico spettacolare:

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

## Esempio TypeScript Completo con Riferimento al Container

Accedi all'istanza `Container` per controllare l'animazione a livello di programmazione (play, pause, destroy, esporta immagine):

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
        <button onClick={handlePause}>Pausa</button>
        <button onClick={handlePlay}>Play</button>
      </div>
    </div>
  );
}
```

Punti chiave:

- `particlesInit` carica le funzionalità del motore (viene eseguito una sola volta per montaggio del componente).
- `particlesLoaded` viene attivato ogni volta che il container è completamente inizializzato.
- `containerRef` mantiene l'istanza `Container` per poter chiamare i suoi metodi in seguito.

## Performance: useMemo e useCallback

Avvolgi sempre le opzioni statiche o che cambiano raramente in `useMemo` e i gestori eventi in `useCallback` per prevenire ri-render non necessari del canvas:

```tsx
"use client";

import Particles from "@tsparticles/react";
import { useCallback, useMemo, useState } from "react";
import type { Container, ISourceOptions } from "@tsparticles/engine";

export default function PerformanceExample() {
  const [particlesCount, setParticlesCount] = useState(80);

  // Callback stabile — non viene mai ricreato a meno che le dipendenze non cambino
  const particlesLoaded = useCallback((container?: Container) => {
    console.log("Container pronto", container?.id);
  }, []);

  // Oggetto opzioni stabile — previene la reinizializzazione del canvas
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
      <button onClick={() => setParticlesCount((c) => c + 20)}>Aggiungi 20 particelle</button>
    </div>
  );
}
```

Senza queste ottimizzazioni, ogni re-render del genitore creerebbe un nuovo oggetto `options`, causando la ricreazione del canvas.

## Integrazione nella Pagina

Aggiungi uno sfondo di particelle a un layout di pagina senza influenzare il contenuto della pagina:

```tsx
// app/layout.tsx (componente server)
import dynamic from "next/dynamic";

const ParticlesBackground = dynamic(() => import("@/components/particles-background"), { ssr: false });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body>
        <ParticlesBackground />
        <main style={{ position: "relative", zIndex: 1 }}>{children}</main>
      </body>
    </html>
  );
}
```

Usa `dynamic()` con `ssr: false` per garantire che il componente non venga mai eseguito durante il rendering lato server. Il canvas delle particelle si posiziona dietro il contenuto principale tramite CSS `z-index`.

## Istanze Multiple

Puoi renderizzare diversi componenti `Particles` indipendenti sulla stessa pagina, ciascuno con la propria configurazione:

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

Ogni componente `Particles` crea un canvas indipendente con il proprio ciclo di animazione. Imposta `fullScreen: false` e assegna a ciascuno un'altezza fissa in modo che coesistano nel flusso del documento.

## Legacy Pages Router

Se stai usando il **Pages Router** di Next.js (directory `pages/`), l'approccio è simile ma senza la direttiva `"use client"`. Invece, puoi usare un import dinamico nel componente della pagina:

```tsx
// pages/index.tsx
import dynamic from "next/dynamic";
import type { NextPage } from "next";

const ParticlesComponent = dynamic(() => import("../components/particles-component"), { ssr: false });

const Home: NextPage = () => {
  return (
    <div>
      <ParticlesComponent />
      <h1>Benvenuto</h1>
    </div>
  );
};

export default Home;
```

Il componente stesso (`components/particles-component.tsx`) è un componente React semplice:

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

Nota che il Pages Router **non** richiede `"use client"` perché i componenti delle pagine sono già renderizzati lato client per impostazione predefinita.


## Reactive Behavior

The `<Particles>` component reacts to prop changes at runtime:

- **`id`**, **`options`**, or **`url`** change → the existing container is destroyed and particles are reloaded with the new values.
- **`theme`** change → `loadTheme` is called on the existing container. This requires the optional `@tsparticles/plugin-themes` package to be loaded (otherwise it is a safe no-op).

On component unmount, the particles container is automatically destroyed — no orphan animations remain.

## Risoluzione dei Problemi

| Sintomo                     | Causa                                             | Rimedio                                                              |
| --------------------------- | ------------------------------------------------- | -------------------------------------------------------------------- |
| Pagina bianca               | SSR di un modulo dipendente dal canvas            | Usa `dynamic(..., { ssr: false })` o avvolgi in un componente client |
| Canvas non visibile         | Il container ha altezza zero                      | Imposta `fullScreen: { zIndex: -1 }` o dagli dimensioni esplicite    |
| Cambio opzioni non riflesso | Nuovo riferimento oggetto non creato              | Usa `useMemo` con l'array di dipendenze corretto                     |
| Preset non funzionante      | Preset non caricato prima dell'init del container | Chiama `loadXPreset(engine)` dentro la callback `init`               |

## Prossimi Passi

- Esplora le [Demo Interattive](/demos/) per configurazioni già pronte.
- Leggi il [Riferimento Opzioni](/options/) per ogni parametro disponibile.
- Visita la pagina [Presets](/demos/presets) per altri preset predefiniti come neve, stelle e lucciole.
