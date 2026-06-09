"use client";

import { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";

async function init(engine: Engine): Promise<void> {
  await loadSlim(engine);
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return <ParticlesProvider init={init}>{children}</ParticlesProvider>;
}
