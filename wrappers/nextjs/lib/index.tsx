"use client";

import dynamic from "next/dynamic";
import type { ComponentType, PropsWithChildren, ReactNode } from "react";
import { ParticlesProvider, type IParticlesProps, type ParticlesPluginRegistrar } from "@tsparticles/react";

export type { IParticlesProps, ParticlesPluginRegistrar };

const DynamicParticles = dynamic(() => import("@tsparticles/react").then(module => module.Particles), {
  ssr: false,
});

export interface INextParticlesProviderProps extends PropsWithChildren {
  init: ParticlesPluginRegistrar;
}

export function NextParticlesProvider({ children, init }: INextParticlesProviderProps): ReactNode {
  return <ParticlesProvider init={init}>{children}</ParticlesProvider>;
}

export const NextParticles = DynamicParticles as ComponentType<IParticlesProps>;
