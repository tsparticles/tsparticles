export type PackageCategory =
  | "interaction-external"
  | "interaction-particles"
  | "interaction-light"
  | "updater"
  | "shape"
  | "plugin"
  | "color"
  | "easing"
  | "effect"
  | "path"
  | "emitter-shape"
  | "preset"
  | "bundle";

export interface PackageInfo {
  name: string;
  description: string;
  category: PackageCategory;
  loadFunction?: string;
  subpathExport?: string;
  optionKeys: string[];
  needsPluginCheck?: string;
  alwaysNeeded: boolean;
  includedInBundles: string[];
}

export interface PackageImport {
  function: string;
  from: string;
}

export interface SuggestPluginsResult {
  npmPackages: string[];
  imports: PackageImport[];
  suggestedBundle?: string;
  alreadyInBundle: string[];
}

export interface OptionPluginMapping {
  optionPath: string;
  packageName: string;
  description: string;
}

export interface BundleInfo {
  name: string;
  description: string;
  loadFunction: string;
  packages: string[];
  extends?: string;
}

export interface PackageCatalog {
  byCategory: Record<PackageCategory, PackageInfo[]>;
  byName: Record<string, PackageInfo>;
}
