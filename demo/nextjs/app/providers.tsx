"use client";

import type { PropsWithChildren, ReactNode } from "react";
import { NextParticlesProvider } from "@tsparticles/nextjs";
import { engine } from "../particlesEngine";
import { registerParticles } from "./particlesInit";

export function Providers({ children }: PropsWithChildren): ReactNode {
  return (
    <NextParticlesProvider engine={engine} init={registerParticles}>
      {children}
    </NextParticlesProvider>
  );
}
