"use client";

import type { PropsWithChildren, ReactNode } from "react";
import { NextParticlesProvider } from "@tsparticles/nextjs";
import { registerParticles } from "./particlesInit";

export function Providers({ children }: PropsWithChildren): ReactNode {
  return <NextParticlesProvider init={registerParticles}>{children}</NextParticlesProvider>;
}
