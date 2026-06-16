---
title: Next.js-Integration
description: Schritt-für-Schritt-Anleitung zur Integration von tsParticles in eine Next.js-Anwendung mit dem App Router.
---

# Next.js-Integration

Diese Anleitung behandelt die Integration von tsParticles in ein Next.js-Projekt mit dem **App Router** (Next.js 13+). Für den legacy Pages Router siehe den Abschnitt [Legacy Pages Router](#legacy-pages-router) am Ende.

## Installation

Installieren Sie den `@tsparticles/react`-Wrapper und die vollständige `tsparticles`-Engine (oder ein Slim-Bundle für kleinere Builds):

```bash
npm install @tsparticles/react tsparticles
```

Wenn Sie das kleinere `@tsparticles/slim`-Bundle bevorzugen:

```bash
npm install @tsparticles/react @tsparticles/slim
```

## Grundlegende Verwendung (App Router)

Next.js-App-Router-Komponenten sind standardmäßig serverseitig. Da tsParticles die Browser-`canvas`-API benötigt, müssen Sie die Komponente mit der `"use client"`-Direktive kennzeichnen.

```tsx
"use client";

import Particles from "@tsparticles/react";
import { useCallback, useMemo } from "react";
import type { Container, ISourceOptions } from "@tsparticles/engine";

export default function ParticlesBackground() {
  const particlesLoaded = useCallback((container?: Container) => {
    console.log("Partikel geladen", container);
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

Erstellen Sie dies als `components/particles-background.tsx` und importieren Sie es in eine beliebige Seite oder ein Layout. Da die Datei mit `"use client"` beginnt, wird sie auf dem Client gerendert – genau dort, wo tsParticles sein muss.

## Themenwechsel

Kombinieren Sie tsParticles mit Next.js-Theme-Umschaltern, indem Sie die Optionen aus dem aktuellen Theme-Status ableiten:

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
        Wechsel zu {theme === "dark" ? "Hellem" : "Dunklem"} Modus
      </button>
    </>
  );
}
```

Das `options`-Objekt wird über `useMemo` immer dann neu erstellt, wenn sich `theme` ändert, sodass die Canvas automatisch aktualisiert wird.

## Konfetti-Effekt

Verwenden Sie `@tsparticles/preset-confetti`, um bei Ereignissen wie Button-Klicks festliches Konfetti auszulösen:

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
        Feiern!
      </button>
    </>
  );
}
```

Der `init`-Callback lädt das Konfetti-Preset in die Engine, bevor die Partikel erstellt werden.

## Feuerwerks-Effekt

Ähnlich erzeugt das Feuerwerk-Preset ein spektakuläres Feuerwerk:

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

## Vollständiges TypeScript-Beispiel mit Container-Ref

Greifen Sie auf die `Container`-Instanz zu, um die Animation programmatisch zu steuern (abspielen, pausieren, zerstören, Bild exportieren):

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
        <button onClick={handlePause}>Pause</button>
        <button onClick={handlePlay}>Abspielen</button>
      </div>
    </div>
  );
}
```

Wichtige Punkte:

- `particlesInit` lädt die Engine-Funktionen (wird nur einmal pro Komponenten-Mount ausgeführt).
- `particlesLoaded` feuert jedes Mal, wenn der Container vollständig initialisiert ist.
- `containerRef` hält die `Container`-Instanz, damit Sie später ihre Methoden aufrufen können.

## Performance: useMemo und useCallback

Umwickeln Sie statische oder selten ändernde Optionen immer mit `useMemo` und Ereignis-Handler mit `useCallback`, um unnötige Neu-Renderings der Canvas zu verhindern:

```tsx
"use client";

import Particles from "@tsparticles/react";
import { useCallback, useMemo, useState } from "react";
import type { Container, ISourceOptions } from "@tsparticles/engine";

export default function PerformanceExample() {
  const [particlesCount, setParticlesCount] = useState(80);

  // Stabiler Callback — wird nie neu erstellt, außer bei Abhängigkeitsänderungen
  const particlesLoaded = useCallback((container?: Container) => {
    console.log("Container bereit", container?.id);
  }, []);

  // Stabiles Optionsobjekt — verhindert Canvas-Neuinitialisierung
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
      <button onClick={() => setParticlesCount((c) => c + 20)}>20 Partikel hinzufügen</button>
    </div>
  );
}
```

Ohne diese Optimierungen würde jedes erneute Rendern des Elternteils ein neues `options`-Objekt erstellen, was zur Neu erstellung der Canvas führen würde.

## Seitenintegration

Fügen Sie einen Partikel-Hintergrund zu einem Seiten-Layout hinzu, ohne den Seiteninhalt zu beeinträchtigen:

```tsx
// app/layout.tsx (Server-Komponente)
import dynamic from "next/dynamic";

const ParticlesBackground = dynamic(() => import("@/components/particles-background"), { ssr: false });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>
        <ParticlesBackground />
        <main style={{ position: "relative", zIndex: 1 }}>{children}</main>
      </body>
    </html>
  );
}
```

Verwenden Sie `dynamic()` mit `ssr: false`, um sicherzustellen, dass die Komponente niemals während des serverseitigen Renderings ausgeführt wird. Die Partikel-Canvas sitzt über CSS `z-index` hinter dem Hauptinhalt.

## Mehrere Instanzen

Sie können mehrere unabhängige `Particles`-Komponenten auf derselben Seite rendern, jede mit eigener Konfiguration:

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

Jede `Particles`-Komponente erstellt eine unabhängige Canvas mit eigener Animationsschleife. Setzen Sie `fullScreen: false` und geben Sie jeder eine feste Höhe, damit sie im Dokumentenfluss koexistieren.

## Legacy Pages Router

Wenn Sie den Next.js **Pages Router** (`pages/`-Verzeichnis) verwenden, ist der Ansatz ähnlich, jedoch ohne die `"use client"`-Direktive. Stattdessen können Sie einen dynamischen Import in der Seitenkomponente verwenden:

```tsx
// pages/index.tsx
import dynamic from "next/dynamic";
import type { NextPage } from "next";

const ParticlesComponent = dynamic(() => import("../components/particles-component"), { ssr: false });

const Home: NextPage = () => {
  return (
    <div>
      <ParticlesComponent />
      <h1>Willkommen</h1>
    </div>
  );
};

export default Home;
```

Die Komponente selbst (`components/particles-component.tsx`) ist eine einfache React-Komponente:

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

Beachten Sie, dass der Pages Router **nicht** `"use client"` erfordert, da Seitenkomponenten standardmäßig bereits clientseitig gerendert werden.


## Reactive Behavior

The `<Particles>` component reacts to prop changes at runtime:

- **`id`**, **`options`**, or **`url`** change → the existing container is destroyed and particles are reloaded with the new values.
- **`theme`** change → `loadTheme` is called on the existing container. This requires the optional `@tsparticles/plugin-themes` package to be loaded (otherwise it is a safe no-op).

On component unmount, the particles container is automatically destroyed — no orphan animations remain.

## Fehlerbehebung

| Symptom                        | Ursache                                  | Lösung                                                                                          |
| ------------------------------ | ---------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Leere weiße Seite              | SSR rendert eine Canvas-abhängiges Modul | Verwenden Sie `dynamic(..., { ssr: false })` oder umschließen Sie es in einer Client-Komponente |
| Canvas wird nicht angezeigt    | Container hat keine Höhe                 | Setzen Sie `fullScreen: { zIndex: -1 }` oder geben Sie explizite Maße an                        |
| Optionsänderung nicht sichtbar | Keine neue Objektreferenz erstellt       | Verwenden Sie `useMemo` mit korrektem Abhängigkeitsarray                                        |
| Preset funktioniert nicht      | Preset vor Container-Init nicht geladen  | Rufen Sie `loadXPreset(engine)` innerhalb des `init`-Callbacks auf                              |

## Nächste Schritte

- Durchstöbern Sie die [Interaktiven Demos](/demos/) für fertige Konfigurationen.
- Lesen Sie die vollständige [Optionen-Referenz](/options/) für jeden verfügbaren Parameter.
- Besuchen Sie die [Presets-Seite](/demos/presets) für weitere vorgefertigte Presets wie Schnee, Sterne und Glühwürmchen.
