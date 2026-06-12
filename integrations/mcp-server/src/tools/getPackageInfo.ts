import { packageCatalog } from "../registry/packages.js";
import { bundles } from "../registry/bundles.js";
import { optionToPlugin } from "../registry/pluginOptions.js";

export function getPackageInfo(packageName: string) {
  const pkg = packageCatalog.byName[packageName];
  if (!pkg) {
    return null;
  }

  const relatedOptions = optionToPlugin.filter(
    (m) => m.packageName === packageName,
  );

  const bundleInfo = bundles.find((b) =>
    b.packages.some((bp) => bp === packageName),
  );

  const includedInBundles = bundles
    .filter((b) => b.packages.some((bp) => bp === packageName))
    .map((b) => ({ name: b.name, description: b.description }));

  const subPackages =
    pkg.category === "bundle"
      ? bundles
          .find((b) => b.name === packageName)
          ?.packages.filter((bp) => bp !== packageName) || []
      : undefined;

  return {
    name: pkg.name,
    description: pkg.description,
    category: pkg.category,
    loadFunction: pkg.loadFunction,
    optionKeys: pkg.optionKeys,
    needsPluginCheck: pkg.needsPluginCheck,
    alwaysNeeded: pkg.alwaysNeeded,
    relatedOptions: relatedOptions.map((ro) => ({
      optionPath: ro.optionPath,
      description: ro.description,
    })),
    includedInBundles,
    bundle: bundleInfo
      ? { name: bundleInfo.name, description: bundleInfo.description }
      : undefined,
    subPackages,
  };
}
