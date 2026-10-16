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
  alwaysNeeded: boolean;
  category: PackageCategory;
  description: string;
  includedInBundles: string[];
  loadFunction?: string;
  name: string;
  needsPluginCheck?: string;
  optionKeys: string[];
  subpathExport?: string;
}

export interface PackageImport {
  from: string;
  function: string;
}

export interface SuggestPluginsResult {
  alreadyInBundle: string[];
  imports: PackageImport[];
  npmPackages: string[];
  suggestedBundle?: string;
}

export interface OptionPluginMapping {
  description: string;
  optionPath: string;
  packageName: string;
}

export interface BundleInfo {
  description: string;
  extends?: string;
  loadFunction: string;
  name: string;
  packages: string[];
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
  /** Selected bundle package name */
  bundle: string;
  /** Complete, ready-to-use code for the target framework */
  code: string;
  /** Target framework used for code generation */
  framework: Framework;
  /** HTML container element (if needed) */
  html: string;
  /** Shell command to install all packages */
  installCommand: string;
  /** All npm packages needed (bundle + engine + additional) */
  installPackages: string[];
  /** True when the bundle self-initializes without manual loading */
  isAutoInitialized?: boolean;
  /** Bundle's load function name */
  loadFunction: string;
  /** Additional notes, warnings, or hints */
  notes: string[];
  /** The generated tsParticles options object */
  options: Record<string, unknown>;
}

export interface BundleMatch {
  bundleName: string;
  isAutoInitialized?: boolean;
  isPreset?: boolean;
  loadFunction: string;
  packages: string[];
  presetName?: string;
  presetPackage?: string;
}
