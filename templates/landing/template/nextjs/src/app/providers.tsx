"use client";

import { initParticlesEngine } from "@tsparticles/nextjs";
import { loadSlim } from "@tsparticles/slim";
import { useEffect, type ReactNode } from "react";

export function ParticlesProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    });
  }, []);

  return <>{children}</>;
}
