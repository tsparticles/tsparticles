"use client";

import type { Engine } from "@tsparticles/engine";
import { ParticlesProvider } from "@tsparticles/react";
import { engine } from "../../particlesEngine";
import { loadSlim } from "@tsparticles/slim";

async function init(engine: Engine): Promise<void> {
  await loadSlim(engine);
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ParticlesProvider engine={engine} init={init}>
      {children}
    </ParticlesProvider>
  );
}
