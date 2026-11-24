import type { ExternalData } from "../common/ExternalData.js";
import { getConfig } from "../common/getConfig.js";

interface InteractionParams {
  additionalExternals?: ExternalData[];
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
function loadParticlesInteraction(params: InteractionParams): unknown {
  const { moduleName, pluginName, version, dir, additionalExternals, progress } = params,
    banner = `Author : Matteo Bruni
MIT license: https://opensource.org/licenses/MIT
Demo / Generator : https://particles.js.org/
GitHub : https://www.github.com/matteobruni/tsparticles
How to use? : Check the GitHub README
v${version}`,
    minBanner = `tsParticles ${pluginName} Interaction v${version} by Matteo Bruni`;

  return getConfig({
    entry: {
      format: "interaction",
      name: moduleName,
      bundle: false,
    },
    version,
    banner,
    minBanner: minBanner,
    dir,
    bundle: false,
    progress,
    additionalExternals,
  });
}

export { loadParticlesInteraction };
