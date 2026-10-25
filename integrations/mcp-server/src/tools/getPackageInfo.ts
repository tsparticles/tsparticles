import type { PackageCategory, PackageInfo } from "../types.js";
import { bundles } from "../registry/bundles.js";
import { optionToPlugin } from "../registry/pluginOptions.js";
import { packageCatalog } from "../registry/packages.js";

export interface PackageInfoResult {
  alwaysNeeded: boolean;
  category: PackageCategory;
  description: string;
  includedInBundles: { description: string; name: string }[];
  loadFunction?: string;
  name: string;
  needsPluginCheck?: string;
  optionKeys: string[];
  relatedOptions: { description: string; optionPath: string }[];
  subPackages?: string[];
}

/**
 *
 * @param packageName
 */
export function getPackageInfo(packageName: string): PackageInfoResult | null {
  const pkg = packageCatalog.byName[packageName] as PackageInfo | undefined;
  if (!pkg) {
    return null;
  }

  const relatedOptions = optionToPlugin.filter(m => m.packageName === packageName),
    // A package can legitimately appear in multiple bundles (e.g.
    // @tsparticles/plugin-move is in slim, full, and all). List every
    // bundle that includes it here.
    //
    // NOTE: an earlier version also exposed a single `bundle` field
    // computed with `bundles.find(...)`, which silently picked whichever
    // bundle happened to come first in the `bundles` array — an arbitrary
    // choice that duplicated (and could contradict) this list. It's been
    // removed; `includedInBundles` is the single source of truth.
    includedInBundles = bundles
      .filter(b => b.packages.some(bp => bp === packageName))
      .map(b => ({ name: b.name, description: b.description })),
    subPackages =
      pkg.category === "bundle"
        ? (bundles.find(b => b.name === packageName)?.packages.filter(bp => bp !== packageName) ?? [])
        : undefined;

  return {
    name: pkg.name,
    description: pkg.description,
    category: pkg.category,
    loadFunction: pkg.loadFunction,
    optionKeys: pkg.optionKeys,
    needsPluginCheck: pkg.needsPluginCheck,
    alwaysNeeded: pkg.alwaysNeeded,
    relatedOptions: relatedOptions.map(ro => ({
      optionPath: ro.optionPath,
      description: ro.description,
    })),
    includedInBundles,
    subPackages,
  };
}
