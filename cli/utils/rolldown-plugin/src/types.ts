import type {
  InputOptions as RolldownInputOptions,
  RolldownOptions,
  OutputOptions as RolldownOutputOptions,
} from "rolldown";

export type { RolldownOptions, RolldownInputOptions, RolldownOutputOptions };

export interface RolldownConfig {
  input: RolldownInputOptions;
  outputs: RolldownOutputOptions[];
}

export interface ExternalData {
  bundle: boolean;
  data: Record<string, unknown>;
  name: string;
}

export type ParticlesBuildType =
  | "bundle"
  | "confetti"
  | "effect"
  | "engine"
  | "fireworks"
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

export type IifeBuildKind = "bundle" | "confetti" | "engine" | "fireworks" | "package" | "pjs";

export interface IifePolicyData {
  kind: IifeBuildKind;
  scope: string;
}

export interface ParticlesBuildParams {
  [key: string]: unknown;
  additionalExternals?: ExternalData[];
  banner?: string;
  bundle?: boolean;
  bundleName?: string;
  dir: string;
  effectName?: string;
  format?: "es" | "iife";
  minBanner?: string;
  moduleName?: string;
  pluginName?: string;
  scope?: string;
  version: string;
}

export type ParticlesBuildParamsOptional = ParticlesBuildParams;

export interface ConfigParams {
  additionalExternals?: ExternalData[];
  banner: string;
  bundle: boolean;
  dir: string;
  entry: {
    bundle: boolean;
    format: string;
    name?: string;
  };
  iifePolicy: IifePolicyData;
  includeLazy?: boolean;
  minBanner: string;
  version: string;
}
