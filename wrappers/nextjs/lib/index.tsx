"use client";

import type { ComponentType, PropsWithChildren, ReactNode } from "react";

import { type IParticlesProps, type ParticlesPluginRegistrar, ParticlesProvider } from "@tsparticles/react";
import type { Engine } from "@tsparticles/engine";
import dynamic from "next/dynamic";

export type { IParticlesProps, ParticlesPluginRegistrar };

const DynamicParticles = dynamic(() => import("@tsparticles/react").then(module => module.Particles), {
  ssr: false,
});

export interface INextParticlesProviderProps extends PropsWithChildren {
  engine: Engine;
  init?: ParticlesPluginRegistrar;
}

export function NextParticlesProvider({ children, engine, init }: INextParticlesProviderProps): ReactNode {
  return (
    <ParticlesProvider engine={engine} init={init}>
      {children}
    </ParticlesProvider>
  );
}

export const NextParticles = DynamicParticles as ComponentType<IParticlesProps>;
