export type ParticlesBuildType =
  | "bundle"
  | "effect"
  | "engine"
  | "interaction"
  | "interactionExternal"
  | "interactionParticles"
  | "palette"
  | "path"
  | "plugin"
  | "pluginEasing"
  | "pluginEmittersShape"
  | "pluginExport"
  | "preset"
  | "shape"
  | "template"
  | "updater"
  | "util";

import type { ParticlesBuildParams } from "./types";

interface BuildDefinition {
  banner: (p: ParticlesBuildParams) => string;
  format: string;
  hasBundle?: boolean;
  minBanner: (p: ParticlesBuildParams) => string;
}

export const buildMap: Record<ParticlesBuildType, BuildDefinition> = {
  bundle: {
    format: "",
    hasBundle: true,
    banner: ({ version }) => `tsParticles v${version}`,
    minBanner: ({ version, bundleName }) => `tsParticles ${bundleName ?? ""} v${version}`,
  },
  effect: {
    format: "effect",
    banner: ({ version }) => `Effect v${version}`,
    minBanner: ({ version, effectName }) => `tsParticles ${effectName} Effect v${version}`,
  },
  engine: {
    format: "engine",
    banner: ({ version }) => `tsParticles Engine v${version}`,
    minBanner: ({ version }) => `tsParticles Engine v${version}`,
  },
  interaction: {
    format: "interaction",
    banner: ({ version }) => `Interaction v${version}`,
    minBanner: ({ version }) => `Interaction v${version}`,
  },
  interactionExternal: {
    format: "interaction.external",
    banner: ({ version }) => `External Interaction v${version}`,
    minBanner: ({ version }) => `External Interaction v${version}`,
  },
  interactionParticles: {
    format: "interaction.particles",
    banner: ({ version }) => `Particles Interaction v${version}`,
    minBanner: ({ version }) => `Particles Interaction v${version}`,
  },
  palette: {
    format: "palette",
    banner: ({ version }) => `Palette v${version}`,
    minBanner: ({ version }) => `Palette v${version}`,
  },
  path: {
    format: "path",
    banner: ({ version }) => `Path v${version}`,
    minBanner: ({ version }) => `Path v${version}`,
  },
  plugin: {
    format: "plugin",
    banner: ({ version }) => `Plugin v${version}`,
    minBanner: ({ version, pluginName }) => `tsParticles ${pluginName} Plugin v${version}`,
  },
  pluginEasing: {
    format: "plugin.easing",
    banner: ({ version }) => `Easing Plugin v${version}`,
    minBanner: ({ version }) => `Easing Plugin v${version}`,
  },
  pluginEmittersShape: {
    format: "plugin.emitters.shape",
    banner: ({ version }) => `Emitters Shape v${version}`,
    minBanner: ({ version }) => `Emitters Shape v${version}`,
  },
  pluginExport: {
    format: "plugin.export",
    banner: ({ version }) => `Export Plugin v${version}`,
    minBanner: ({ version }) => `Export Plugin v${version}`,
  },
  preset: {
    format: "preset",
    hasBundle: true,
    banner: ({ version }) => `Preset v${version}`,
    minBanner: ({ version }) => `Preset v${version}`,
  },
  shape: {
    format: "shape",
    banner: ({ version }) => `Shape v${version}`,
    minBanner: ({ version }) => `Shape v${version}`,
  },
  template: {
    format: "template",
    banner: ({ version }) => `Template v${version}`,
    minBanner: ({ version }) => `Template v${version}`,
  },
  updater: {
    format: "updater",
    banner: ({ version }) => `Updater v${version}`,
    minBanner: ({ version }) => `Updater v${version}`,
  },
  util: {
    format: "",
    hasBundle: false,
    banner: ({ version }) => `Utility v${version}`,
    minBanner: ({ version, bundleName }) => `tsParticles ${bundleName ?? "Utility"} v${version}`,
  },
};
