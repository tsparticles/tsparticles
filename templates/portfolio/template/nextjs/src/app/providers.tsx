"use client";

import type { Engine } from "@tsparticles/engine";
import { NextParticlesProvider } from "@tsparticles/nextjs";
import { engine } from "../../particlesEngine";
import { loadSlim } from "@tsparticles/slim";

export function ParticlesProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextParticlesProvider
      engine={engine}
      init={async (engine: Engine): Promise<void> => {
        await loadSlim(engine);
      }}
    >
      {children}
    </NextParticlesProvider>
  );
}

export default ParticlesProvider;
