---
title: Integração Next.js
description: Guia passo a passo para integrar tsParticles em uma aplicação Next.js usando o App Router.
---

# Integração Next.js

Este guia aborda a integração de tsParticles em um projeto Next.js usando o **App Router** (Next.js 13+). Para o Pages Router legado, veja a seção [Pages Router Legado](#pages-router-legado) no final.

## Instalação

Instale o wrapper `@tsparticles/react` e o motor completo `tsparticles` (ou um bundle slim para builds menores):

```bash
npm install @tsparticles/react tsparticles
```

Se preferir o bundle menor `@tsparticles/slim`:

```bash
npm install @tsparticles/react @tsparticles/slim
```

## Uso Básico (App Router)

Os componentes do App Router do Next.js são do lado do servidor por padrão. Como o tsParticles requer a API `canvas` do navegador, você deve marcar o componente com a diretiva `"use client"`.

```tsx
"use client";

import Particles from "@tsparticles/react";
import { useCallback, useMemo } from "react";
import type { Container, ISourceOptions } from "@tsparticles/engine";

export default function ParticlesBackground() {
  const particlesLoaded = useCallback((container?: Container) => {
    console.log("Partículas carregadas", container);
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

Crie isso como `components/particles-background.tsx` e importe-o em qualquer página ou layout. Como o arquivo começa com `"use client"`, ele será renderizado no cliente — exatamente onde o tsParticles precisa estar.

## Alternância de Tema

Combine tsParticles com alternadores de tema do Next.js derivando as opções do estado atual do tema:

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
        Alternar para Modo {theme === "dark" ? "Claro" : "Escuro"}
      </button>
    </>
  );
}
```

O objeto `options` é recriado via `useMemo` sempre que `theme` muda, então o canvas é atualizado automaticamente.

## Efeito Confete

Use o `@tsparticles/preset-confetti` para disparar confetes comemorativos em eventos como cliques em botões:

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
        Comemorar!
      </button>
    </>
  );
}
```

O callback `init` carrega o preset de confete no motor antes que as partículas sejam criadas.

## Efeito Fogos de Artifício

Da mesma forma, o preset de fogos de artifício cria um espetáculo de fogos:

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

## Exemplo TypeScript Completo com Referência ao Container

Acesse a instância `Container` para controlar a animação programaticamente (tocar, pausar, destruir, exportar imagem):

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
        <button onClick={handlePause}>Pausar</button>
        <button onClick={handlePlay}>Tocar</button>
      </div>
    </div>
  );
}
```

Pontos principais:

- `particlesInit` carrega as funcionalidades do motor (executa apenas uma vez por montagem do componente).
- `particlesLoaded` é disparado toda vez que o container é totalmente inicializado.
- `containerRef` mantém a instância `Container` para que você possa chamar seus métodos depois.

## Performance: useMemo e useCallback

Sempre envolva opções estáticas ou raramente alteradas em `useMemo` e handlers de eventos em `useCallback` para evitar re-renderizações desnecessárias do canvas:

```tsx
"use client";

import Particles from "@tsparticles/react";
import { useCallback, useMemo, useState } from "react";
import type { Container, ISourceOptions } from "@tsparticles/engine";

export default function PerformanceExample() {
  const [particlesCount, setParticlesCount] = useState(80);

  // Callback estável — nunca recria a menos que as deps mudem
  const particlesLoaded = useCallback((container?: Container) => {
    console.log("Container pronto", container?.id);
  }, []);

  // Objeto de opções estável — previne reinicialização do canvas
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
      <button onClick={() => setParticlesCount((c) => c + 20)}>Adicionar 20 partículas</button>
    </div>
  );
}
```

Sem essas otimizações, cada re-renderização do pai criaria um novo objeto `options`, fazendo com que o canvas fosse recriado.

## Integração em Página

Adicione um fundo de partículas ao layout de uma página sem afetar o conteúdo da página:

```tsx
// app/layout.tsx (componente servidor)
import dynamic from "next/dynamic";

const ParticlesBackground = dynamic(() => import("@/components/particles-background"), { ssr: false });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body>
        <ParticlesBackground />
        <main style={{ position: "relative", zIndex: 1 }}>{children}</main>
      </body>
    </html>
  );
}
```

Use `dynamic()` com `ssr: false` para garantir que o componente nunca execute durante a renderização no servidor. O canvas de partículas fica atrás do conteúdo principal via CSS `z-index`.

## Múltiplas Instâncias

Você pode renderizar vários componentes `Particles` independentes na mesma página, cada um com sua própria configuração:

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

Cada componente `Particles` cria um canvas independente com seu próprio loop de animação. Defina `fullScreen: false` e dê a cada um uma altura fixa para que coexistam no fluxo do documento.

## Pages Router Legado

Se você está usando o **Pages Router** do Next.js (diretório `pages/`), a abordagem é similar mas sem a diretiva `"use client"`. Em vez disso, você pode usar uma importação dinâmica no componente da página:

```tsx
// pages/index.tsx
import dynamic from "next/dynamic";
import type { NextPage } from "next";

const ParticlesComponent = dynamic(() => import("../components/particles-component"), { ssr: false });

const Home: NextPage = () => {
  return (
    <div>
      <ParticlesComponent />
      <h1>Bem-vindo</h1>
    </div>
  );
};

export default Home;
```

O componente em si (`components/particles-component.tsx`) é um componente React comum:

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

Note que o Pages Router não requer `"use client"` porque os componentes da página já são renderizados no cliente por padrão.

## Reactive Behavior

The `<Particles>` component reacts to prop changes at runtime:

- **`id`**, **`options`**, or **`url`** change → the existing container is destroyed and particles are reloaded with the new values.
- **`theme`** change → `loadTheme` is called on the existing container. This requires the optional `@tsparticles/plugin-themes` package to be loaded (otherwise it is a safe no-op).

On component unmount, the particles container is automatically destroyed — no orphan animations remain.

## Solução de Problemas

| Sintoma                         | Causa                                                    | Correção                                                               |
| ------------------------------- | -------------------------------------------------------- | ---------------------------------------------------------------------- |
| Página em branco                | SSR renderizando um módulo dependente de canvas          | Use `dynamic(..., { ssr: false })` ou envolva em um componente cliente |
| Canvas não aparecendo           | Container com altura zero                                | Defina `fullScreen: { zIndex: -1 }` ou dê dimensões explícitas         |
| Mudança de opções não refletida | Nova referência de objeto não criada                     | Use `useMemo` com array de dependências adequado                       |
| Preset não funcionando          | Preset não carregado antes da inicialização do container | Chame `loadXPreset(engine)` dentro do callback `init`                  |

## Próximos Passos

- Navegue pelas [Demonstrações Interativas](/demos/) para configurações prontas.
- Leia a [Referência de Opções](/options/) para cada parâmetro disponível.
- Veja a página de [Presets](/demos/presets) para mais presets pré-construídos como neve, estrelas e vaga-lumes.
