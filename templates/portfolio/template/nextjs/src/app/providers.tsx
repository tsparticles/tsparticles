"use client";

import { initParticlesEngine } from "@tsparticles/nextjs";
import { loadSlim } from "@tsparticles/slim";
import { useEffect, useRef } from "react";

export function ParticlesProvider({ children }: { children: React.ReactNode }) {
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      void initParticlesEngine(async (engine) => {
        await loadSlim(engine);
      });
    }
  }, []);

  return <>{children}</>;
}
