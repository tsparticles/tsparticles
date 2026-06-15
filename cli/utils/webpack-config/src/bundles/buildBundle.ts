import type { ExternalData } from "../common/ExternalData.js";
import { getConfig } from "../common/getConfig.js";

interface BundleParams {
  additionalExternals?: ExternalData[];
  bundle?: boolean;
  bundleName: string;
  dir: string;
  moduleName: string;
  progress: boolean;
  version: string;
}

/**
 * @param params - The parameters
 * @returns the webpack config
 */
function loadParticlesBundle(params: BundleParams): unknown {
  const { additionalExternals, bundle, bundleName, dir, moduleName, progress, version } = params,
    fixBundleName = bundleName ? `${bundleName} ` : "",
    banner = `Author : Matteo Bruni
MIT license: https://opensource.org/licenses/MIT
Demo / Generator : https://particles.js.org/
GitHub : https://www.github.com/matteobruni/tsparticles
How to use? : Check the GitHub README
v${version}`,
    minBanner = `tsParticles ${fixBundleName}v${version} by Matteo Bruni`,
    configs = getConfig({
      entry: { format: "", name: moduleName, bundle: false },
      version,
      banner,
      minBanner: minBanner,
      dir,
      bundle: false,
      progress,
      additionalExternals,
    });

  if (bundle ?? true) {
    configs.push(
      ...getConfig({
        entry: { format: "", name: moduleName ? `${moduleName}.bundle` : "bundle", bundle: true },
        version,
        banner,
        minBanner: minBanner,
        dir,
        bundle: true,
        progress,
        additionalExternals,
      }),
    );
  }

  return configs;
}

export { loadParticlesBundle };
