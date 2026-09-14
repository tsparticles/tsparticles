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

export type Framework = "vanilla" | "react" | "vue3" | "svelte" | "angular";

export interface GenerateCodeInput {
  /** Natural language description of the desired particle effect */
  description: string;
  /** Target framework (default: "vanilla") */
  framework?: Framework;
  /** Generate TypeScript code (default: false) */
  typescript?: boolean;
}

export interface GenerateCodeOutput {
  /** The generated tsParticles options object */
  options: Record<string, unknown>;
  /** Selected bundle package name */
  bundle: string;
  /** Bundle's load function name */
  loadFunction: string;
  /** True when the bundle self-initializes without manual loading */
  isAutoInitialized?: boolean;
  /** All npm packages needed (bundle + engine + additional) */
  installPackages: string[];
  /** Shell command to install all packages */
  installCommand: string;
  /** Target framework used for code generation */
  framework: Framework;
  /** HTML container element (if needed) */
  html: string;
  /** Complete, ready-to-use code for the target framework */
  code: string;
  /** Additional notes, warnings, or hints */
  notes: string[];
}

export interface BundleMatch {
  bundleName: string;
  loadFunction: string;
  packages: string[];
  isPreset?: boolean;
  presetName?: string;
  presetPackage?: string;
  isAutoInitialized?: boolean;
}
