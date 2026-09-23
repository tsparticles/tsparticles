import type { ParticlesBuildType } from "./buildMap";
import type { ParticlesBuildParams, RolldownConfig } from "./types";
import { createParticlesBuild } from "./createParticlesBuild";

export const createParticlesRolldown = (
  type: ParticlesBuildType,
  params: ParticlesBuildParams,
): RolldownConfig[] => createParticlesBuild(type, params);
