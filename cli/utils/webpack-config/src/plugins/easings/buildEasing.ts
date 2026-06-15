import type { ExternalData } from "../../common/ExternalData.js";
import { getConfig } from "../../common/getConfig.js";

interface EasingParams {
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
function loadParticlesPluginEasing(params: EasingParams): unknown {
  const { moduleName, pluginName, version, dir, bundle, additionalExternals, progress } = params,
    banner = `Author : Matteo Bruni
MIT license: https://opensource.org/licenses/MIT
Demo / Generator : https://particles.js.org/
GitHub : https://www.github.com/matteobruni/tsparticles
How to use? : Check the GitHub README
v${version}`,
    minBanner = `tsParticles Easing ${pluginName} Plugin v${version} by Matteo Bruni`;

  return bundle
    ? [
        ...getConfig({
          entry: { format: "plugin.easing", name: moduleName, bundle: false },
          version,
          banner,
          minBanner: minBanner,
          dir,
          bundle: false,
          progress,
          additionalExternals,
        }),
        ...getConfig({
          entry: { format: "plugin.easing", name: `${moduleName}.bundle`, bundle: true },
          version,
          banner,
          minBanner: minBanner,
          dir,
          bundle: true,
          progress,
          additionalExternals,
        }),
      ]
    : getConfig({
        entry: { format: "plugin.easing", name: moduleName, bundle: false },
        version,
        banner,
        minBanner: minBanner,
        dir,
        bundle: false,
        progress,
        additionalExternals,
      });
}

export { loadParticlesPluginEasing };
