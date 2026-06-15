import type { ExternalData } from "../common/ExternalData.js";
import { getConfig } from "../common/getConfig.js";

interface PluginParams {
  additionalExternals?: ExternalData[];
  bundle: boolean;
  dir: string;
  moduleName: string;
  pluginName: string;
  progress: boolean;
  version: string;
}

/**
 * @param params - The parameters
 * @returns the webpack config
 */
function loadParticlesPlugin(params: PluginParams): unknown {
  const { moduleName, pluginName, version, dir, bundle, additionalExternals, progress } = params,
    banner = `Author : Matteo Bruni
MIT license: https://opensource.org/licenses/MIT
Demo / Generator : https://particles.js.org/
GitHub : https://www.github.com/matteobruni/tsparticles
How to use? : Check the GitHub README
v${version}`,
    minBanner = `tsParticles ${pluginName} Plugin v${version} by Matteo Bruni`;

  return bundle
    ? [
        ...getConfig({
          entry: { format: "plugin", name: moduleName, bundle: false },
          version,
          banner,
          minBanner: minBanner,
          dir,
          bundle: false,
          additionalExternals,
          progress,
        }),
        ...getConfig({
          entry: { format: "plugin", name: `${moduleName}.bundle`, bundle: true },
          version,
          banner,
          minBanner: minBanner,
          dir,
          bundle: true,
          additionalExternals,
          progress,
        }),
      ]
    : getConfig({
        entry: { format: "plugin", name: moduleName, bundle: false },
        version,
        banner,
        minBanner: minBanner,
        dir,
        bundle: false,
        additionalExternals,
        progress,
      });
}

export { loadParticlesPlugin };
