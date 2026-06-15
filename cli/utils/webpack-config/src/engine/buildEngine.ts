import type { ExternalData } from "../common/ExternalData.js";
import { getConfig } from "../common/getConfig.js";

interface EngineParams {
  additionalExternals?: ExternalData[];
  dir: string;
  progress: boolean;
  version: string;
}

/**
 * @param params - The parameters
 * @returns the webpack config
 */
function loadParticlesEngine(params: EngineParams): unknown {
  const { additionalExternals, dir, version, progress } = params,
    banner = `tsParticles Engine v${version}
Author: Matteo Bruni
MIT license: https://opensource.org/licenses/MIT
Website: https://particles.js.org/
Confetti Website: https://confetti.js.org
GitHub: https://www.github.com/matteobruni/tsparticles
How to use?: Check the GitHub README
------------------------------------------------------`,
    minBanner = `tsParticles Engine v${version} by Matteo Bruni`;

  return getConfig({
    entry: { format: "engine", bundle: false },
    version,
    banner,
    minBanner: minBanner,
    dir,
    bundle: false,
    progress,
    additionalExternals,
  });
}

export { loadParticlesEngine };
