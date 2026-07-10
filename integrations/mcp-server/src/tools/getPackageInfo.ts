import { packageCatalog } from "../registry/packages.js";
import { bundles } from "../registry/bundles.js";
import { optionToPlugin } from "../registry/pluginOptions.js";

export function getPackageInfo(packageName: string) {
  const pkg = packageCatalog.byName[packageName];
  if (!pkg) {
    return null;
  }

  const relatedOptions = optionToPlugin.filter(m => m.packageName === packageName);

  // A package can legitimately appear in multiple bundles (e.g.
  // @tsparticles/plugin-move is in slim, full, and all). List every
  // bundle that includes it here.
  //
  // NOTE: an earlier version also exposed a single `bundle` field
  // computed with `bundles.find(...)`, which silently picked whichever
  // bundle happened to come first in the `bundles` array — an arbitrary
  // choice that duplicated (and could contradict) this list. It's been
  // removed; `includedInBundles` is the single source of truth.
  const includedInBundles = bundles
    .filter(b => b.packages.some(bp => bp === packageName))
    .map(b => ({ name: b.name, description: b.description }));

  const subPackages =
    pkg.category === "bundle"
      ? bundles.find(b => b.name === packageName)?.packages.filter(bp => bp !== packageName) || []
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
