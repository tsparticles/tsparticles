import type { ExternalData } from "../common/ExternalData.js";
import { getConfig } from "../common/getConfig.js";

interface EffectParams {
  additionalExternals?: ExternalData[];
  dir: string;
  effectName: string;
  moduleName: string;
  progress: boolean;
  version: string;
}

/**
 * @param params - The parameters
 * @returns the webpack config
 */
function loadParticlesEffect(params: EffectParams): unknown {
  const { moduleName, effectName, version, dir, additionalExternals, progress } = params,
    banner = `Author : Matteo Bruni
MIT license: https://opensource.org/licenses/MIT
Demo / Generator : https://particles.js.org/
GitHub : https://www.github.com/matteobruni/tsparticles
How to use? : Check the GitHub README
v${version}`,
    minBanner = `tsParticles ${effectName} Effect v${version} by Matteo Bruni`;

  return getConfig({
    entry: { format: "effect", name: moduleName, bundle: false },
    version,
    banner,
    minBanner: minBanner,
    dir,
    bundle: false,
    progress,
    additionalExternals,
  });
}

export { loadParticlesEffect };
