import type { ParticlesBuildParams } from "./types";
import type { RollupOptions } from "rollup";
import { createParticlesBuild } from "./createParticlesBuild";

export const loadParticlesBundle = (p: ParticlesBuildParams): RollupOptions[] => createParticlesBuild("bundle", p);

export const loadParticlesPlugin = (p: ParticlesBuildParams): RollupOptions[] => createParticlesBuild("plugin", p);

export const loadParticlesEngine = (p: ParticlesBuildParams): RollupOptions[] => createParticlesBuild("engine", p);

export const loadParticlesEffect = (p: ParticlesBuildParams): RollupOptions[] => createParticlesBuild("effect", p);

export const loadParticlesInteraction = (p: ParticlesBuildParams): RollupOptions[] =>
  createParticlesBuild("interaction", p);

export const loadParticlesInteractionExternal = (p: ParticlesBuildParams): RollupOptions[] =>
  createParticlesBuild("interactionExternal", p);

export const loadParticlesInteractionParticles = (p: ParticlesBuildParams): RollupOptions[] =>
  createParticlesBuild("interactionParticles", p);

export const loadParticlesPalette = (p: ParticlesBuildParams): RollupOptions[] => createParticlesBuild("palette", p);

export const loadParticlesPath = (p: ParticlesBuildParams): RollupOptions[] => createParticlesBuild("path", p);

export const loadParticlesPluginEasing = (p: ParticlesBuildParams): RollupOptions[] =>
  createParticlesBuild("pluginEasing", p);

export const loadParticlesPluginEmittersShape = (p: ParticlesBuildParams): RollupOptions[] =>
  createParticlesBuild("pluginEmittersShape", p);

export const loadParticlesPluginExport = (p: ParticlesBuildParams): RollupOptions[] =>
  createParticlesBuild("pluginExport", p);

export const loadParticlesPreset = (p: ParticlesBuildParams): RollupOptions[] => createParticlesBuild("preset", p);

export const loadParticlesShape = (p: ParticlesBuildParams): RollupOptions[] => createParticlesBuild("shape", p);

export const loadParticlesTemplate = (p: ParticlesBuildParams): RollupOptions[] => createParticlesBuild("template", p);

export const loadParticlesUpdater = (p: ParticlesBuildParams): RollupOptions[] => createParticlesBuild("updater", p);

export const loadParticlesUtil = (p: ParticlesBuildParams): RollupOptions[] => createParticlesBuild("util", p);

export { createParticlesBuild } from "./createParticlesBuild";
export type { ParticlesBuildType } from "./buildMap";
