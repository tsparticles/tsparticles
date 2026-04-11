[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# @tsparticles/nextjs

Next.js integration wrapper for [@tsparticles/react](https://www.npmjs.com/package/@tsparticles/react).

## Why this package

- Provides Next.js-first exports (`NextParticlesProvider`, `NextParticles`).
- Handles client-only rendering for particles via dynamic import.
- Keeps the one-time async init flow centered on the provider.

## Installation

```bash
pnpm add @tsparticles/nextjs @tsparticles/react @tsparticles/engine
```

or

```bash
npm install @tsparticles/nextjs @tsparticles/react @tsparticles/engine
```

or

```bash
yarn add @tsparticles/nextjs @tsparticles/react @tsparticles/engine
```

## Usage (App Router)

```tsx
"use client";

import { NextParticles, NextParticlesProvider } from "@tsparticles/nextjs";
import type { Engine } from "@tsparticles/engine";

const init = async (engine: Engine): Promise<void> => {
  const [{ loadSlim }, { loadThemesPlugin }] = await Promise.all([
    import("@tsparticles/slim"),
    import("@tsparticles/plugin-themes"),
  ]);

  await Promise.all([loadSlim(engine), loadThemesPlugin(engine)]);
};

export default function Page() {
  return (
    <NextParticlesProvider init={init}>
      <NextParticles id="tsparticles" options={{ fullScreen: { zIndex: -1 } }} />
    </NextParticlesProvider>
  );
}
```

## Usage (Pages Router)

```tsx
import type { AppProps } from "next/app";
import { NextParticlesProvider } from "@tsparticles/nextjs";
import type { Engine } from "@tsparticles/engine";

const init = async (engine: Engine): Promise<void> => {
  const [{ loadSlim }, { loadThemesPlugin }] = await Promise.all([
    import("@tsparticles/slim"),
    import("@tsparticles/plugin-themes"),
  ]);

  await Promise.all([loadSlim(engine), loadThemesPlugin(engine)]);
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextParticlesProvider init={init}>
      <Component {...pageProps} />
    </NextParticlesProvider>
  );
}
```
