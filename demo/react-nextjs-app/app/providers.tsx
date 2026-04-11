"use client";

import type { PropsWithChildren, ReactNode } from "react";
import type { Engine } from "@tsparticles/engine";
import { ParticlesProvider } from "@tsparticles/react";
import { loadFull } from "tsparticles";

async function registerParticles(engine: Engine): Promise<void> {
  await loadFull(engine);
}

export function Providers({ children }: PropsWithChildren): ReactNode {
  return <ParticlesProvider init={registerParticles}>{children}</ParticlesProvider>;
}
