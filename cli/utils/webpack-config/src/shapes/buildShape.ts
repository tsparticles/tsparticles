import type { ExternalData } from "../common/ExternalData.js";
import { getConfig } from "../common/getConfig.js";

interface ShapeParams {
  additionalExternals?: ExternalData[];
  dir: string;
  moduleName: string;
  progress: boolean;
  shapeName: string;
  version: string;
}

/**
 * @param params - The parameters
 * @returns the webpack config
 */
function loadParticlesShape(params: ShapeParams): unknown {
  const { moduleName, shapeName, version, dir, additionalExternals, progress } = params,
    banner = `Author : Matteo Bruni
MIT license: https://opensource.org/licenses/MIT
Demo / Generator : https://particles.js.org/
GitHub : https://www.github.com/matteobruni/tsparticles
How to use? : Check the GitHub README
v${version}`,
    minBanner = `tsParticles ${shapeName} Shape v${version} by Matteo Bruni`;

  return getConfig({
    entry: { format: "shape", name: moduleName, bundle: false },
    version,
    banner,
    minBanner: minBanner,
    dir,
    bundle: false,
    additionalExternals,
    progress,
  });
}

export { loadParticlesShape };
