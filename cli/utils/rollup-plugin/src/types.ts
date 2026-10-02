export interface ExternalData {
  bundle: boolean;
  data: Record<string, unknown>;
  name: string;
}

export type IifeBuildKind = "bundle" | "confetti" | "engine" | "fireworks" | "package" | "pjs";

export interface IifePolicyData {
  kind: IifeBuildKind;
  scope: string;
}

export interface ConfigParams {
  additionalExternals?: ExternalData[];
  banner: string;
  bundle?: boolean;
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

export interface ParticlesBuildParams {
  [key: string]: unknown;
  additionalExternals?: ExternalData[];
  bundle?: boolean;
  bundleName?: string;
  dir: string;
  effectName?: string;
  moduleName?: string;
  pluginName?: string;
  presetName?: string;
  shapeName?: string;
  templateName?: string;
  updaterName?: string;
  version: string;
}
