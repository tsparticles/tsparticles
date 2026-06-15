import type { ExternalData } from "../common/ExternalData.js";
import { getConfig } from "../common/getConfig.js";

interface PresetParams {
  additionalExternals?: ExternalData[];
  dir: string;
  moduleName: string;
  presetName: string;
  progress: boolean;
  version: string;
}

/**
 * @param params - The parameters
 * @returns the webpack config
 */
function loadParticlesPreset(params: PresetParams): unknown {
  const { moduleName, presetName, version, dir, additionalExternals, progress } = params,
    banner = `Author : Matteo Bruni
MIT license: https://opensource.org/licenses/MIT
Demo / Generator : https://particles.js.org/
GitHub : https://www.github.com/matteobruni/tsparticles
How to use? : Check the GitHub README
v${version}`,
    minBanner = `tsParticles ${presetName} Preset v${version} by Matteo Bruni`;

  return [
    ...getConfig({
      entry: { format: "preset", name: moduleName, bundle: false },
      version,
      banner,
      minBanner: minBanner,
      dir,
      bundle: false,
      additionalExternals,
      progress,
    }),
    ...getConfig({
      entry: { format: "preset", name: `${moduleName}.bundle`, bundle: true },
      version,
      banner,
      minBanner: minBanner,
      dir,
      bundle: true,
      additionalExternals,
      progress,
    }),
  ];
}

export { loadParticlesPreset };
