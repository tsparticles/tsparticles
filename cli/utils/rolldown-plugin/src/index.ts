import type { ParticlesBuildParams } from "./types";
import type { RolldownOptions } from "rolldown";
import { createParticlesBuild } from "./createParticlesBuild";

export const loadParticlesBundle = (p: ParticlesBuildParams): RolldownOptions[] => createParticlesBuild("bundle", p);

export const loadParticlesPlugin = (p: ParticlesBuildParams): RolldownOptions[] => createParticlesBuild("plugin", p);

export const loadParticlesEngine = (p: ParticlesBuildParams): RolldownOptions[] => createParticlesBuild("engine", p);

export const loadParticlesEffect = (p: ParticlesBuildParams): RolldownOptions[] => createParticlesBuild("effect", p);

export const loadParticlesInteraction = (p: ParticlesBuildParams): RolldownOptions[] =>
  createParticlesBuild("interaction", p);

export const loadParticlesInteractionExternal = (p: ParticlesBuildParams): RolldownOptions[] =>
  createParticlesBuild("interactionExternal", p);

export const loadParticlesInteractionParticles = (p: ParticlesBuildParams): RolldownOptions[] =>
  createParticlesBuild("interactionParticles", p);

export const loadParticlesPalette = (p: ParticlesBuildParams): RolldownOptions[] => createParticlesBuild("palette", p);

export const loadParticlesPath = (p: ParticlesBuildParams): RolldownOptions[] => createParticlesBuild("path", p);

export const loadParticlesPluginEasing = (p: ParticlesBuildParams): RolldownOptions[] =>
  createParticlesBuild("pluginEasing", p);

export const loadParticlesPluginEmittersShape = (p: ParticlesBuildParams): RolldownOptions[] =>
  createParticlesBuild("pluginEmittersShape", p);

export const loadParticlesPluginExport = (p: ParticlesBuildParams): RolldownOptions[] =>
  createParticlesBuild("pluginExport", p);

export const loadParticlesPreset = (p: ParticlesBuildParams): RolldownOptions[] => createParticlesBuild("preset", p);

export const loadParticlesShape = (p: ParticlesBuildParams): RolldownOptions[] => createParticlesBuild("shape", p);

export const loadParticlesTemplate = (p: ParticlesBuildParams): RolldownOptions[] =>
  createParticlesBuild("template", p);

export const loadParticlesUpdater = (p: ParticlesBuildParams): RolldownOptions[] => createParticlesBuild("updater", p);

export const loadParticlesUtil = (p: ParticlesBuildParams): RolldownOptions[] => createParticlesBuild("util", p);

export { createParticlesBuild } from "./createParticlesBuild";
export type { ParticlesBuildType } from "./buildMap";
