"use client";

import { NextParticlesProvider } from "@tsparticles/nextjs";
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextParticlesProvider init={async (engine: Engine): Promise<void> => { await loadSlim(engine); }}>
      {children}
    </NextParticlesProvider>
  );
}
