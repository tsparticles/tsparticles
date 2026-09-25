import type { ParticlesBuildParams, RolldownConfig } from "./types.js";
import { createParticlesRolldown } from "./createParticlesRolldown.js";

export { createParticlesRolldown } from "./createParticlesRolldown.js";

/**
 * Generates Rolldown-ready configurations (input + separate outputs) for tsParticles packages.
 *
 * Reuses the Rollup configuration production from `@tsparticles/rollup-plugin` as-is: the resulting
 * configs bundle through Rolldown with the exact same plugin pipeline (node-resolve, replace,
 * terser/visualizer and the IIFE-to-globalScope renderChunk retargeting included).
 * @param p - The build params
 * @returns The list of Rolldown configs
 */
export const loadParticlesBundle = (p: ParticlesBuildParams): RolldownConfig[] => createParticlesRolldown("bundle", p);

/**
 * @param p - The build params
 * @returns The list of Rolldown configs
 */
export const loadParticlesPlugin = (p: ParticlesBuildParams): RolldownConfig[] => createParticlesRolldown("plugin", p);

/**
 * @param p - The build params
 * @returns The list of Rolldown configs
 */
export const loadParticlesEngine = (p: ParticlesBuildParams): RolldownConfig[] => createParticlesRolldown("engine", p);

/**
 * @param p - The build params
 * @returns The list of Rolldown configs
 */
export const loadParticlesEffect = (p: ParticlesBuildParams): RolldownConfig[] => createParticlesRolldown("effect", p);

/**
 * @param p - The build params
 * @returns The list of Rolldown configs
 */
export const loadParticlesInteraction = (p: ParticlesBuildParams): RolldownConfig[] =>
  createParticlesRolldown("interaction", p);

/**
 * @param p - The build params
 * @returns The list of Rolldown configs
 */
export const loadParticlesInteractionExternal = (p: ParticlesBuildParams): RolldownConfig[] =>
  createParticlesRolldown("interactionExternal", p);

/**
 * @param p - The build params
 * @returns The list of Rolldown configs
 */
export const loadParticlesInteractionParticles = (p: ParticlesBuildParams): RolldownConfig[] =>
  createParticlesRolldown("interactionParticles", p);

/**
 * @param p - The build params
 * @returns The list of Rolldown configs
 */
export const loadParticlesPalette = (p: ParticlesBuildParams): RolldownConfig[] =>
  createParticlesRolldown("palette", p);

/**
 * @param p - The build params
 * @returns The list of Rolldown configs
 */
export const loadParticlesPath = (p: ParticlesBuildParams): RolldownConfig[] => createParticlesRolldown("path", p);

/**
 * @param p - The build params
 * @returns The list of Rolldown configs
 */
export const loadParticlesPluginEasing = (p: ParticlesBuildParams): RolldownConfig[] =>
  createParticlesRolldown("pluginEasing", p);

/**
 * @param p - The build params
 * @returns The list of Rolldown configs
 */
export const loadParticlesPluginEmittersShape = (p: ParticlesBuildParams): RolldownConfig[] =>
  createParticlesRolldown("pluginEmittersShape", p);

/**
 * @param p - The build params
 * @returns The list of Rolldown configs
 */
export const loadParticlesPluginExport = (p: ParticlesBuildParams): RolldownConfig[] =>
  createParticlesRolldown("pluginExport", p);

/**
 * @param p - The build params
 * @returns The list of Rolldown configs
 */
export const loadParticlesPreset = (p: ParticlesBuildParams): RolldownConfig[] => createParticlesRolldown("preset", p);

/**
 * @param p - The build params
 * @returns The list of Rolldown configs
 */
export const loadParticlesShape = (p: ParticlesBuildParams): RolldownConfig[] => createParticlesRolldown("shape", p);

/**
 * @param p - The build params
 * @returns The list of Rolldown configs
 */
export const loadParticlesTemplate = (p: ParticlesBuildParams): RolldownConfig[] =>
  createParticlesRolldown("template", p);

/**
 * @param p - The build params
 * @returns The list of Rolldown configs
 */
export const loadParticlesUpdater = (p: ParticlesBuildParams): RolldownConfig[] =>
  createParticlesRolldown("updater", p);

/**
 * @param p - The build params
 * @returns The list of Rolldown configs
 */
export const loadParticlesUtil = (p: ParticlesBuildParams): RolldownConfig[] => createParticlesRolldown("util", p);

export type { ParticlesBuildParams, ParticlesBuildType, RolldownConfig } from "./types.js";
