import type { ExternalData } from "../common/ExternalData.js";
import { getConfig } from "../common/getConfig.js";

interface PaletteParams {
  additionalExternals?: ExternalData[];
  dir: string;
  moduleName: string;
  paletteName: string;
  progress: boolean;
  version: string;
}

/**
 * @param params - The parameters
 * @returns the webpack config
 */
function loadParticlesPalette(params: PaletteParams): unknown {
  const { moduleName, paletteName, version, dir, additionalExternals, progress } = params,
    banner = `Author : Matteo Bruni
MIT license: https://opensource.org/licenses/MIT
Demo / Generator : https://particles.js.org/
GitHub : https://www.github.com/matteobruni/tsparticles
How to use? : Check the GitHub README
v${version}`,
    minBanner = `tsParticles ${paletteName} Palette v${version} by Matteo Bruni`;

  return [
    ...getConfig({
      entry: { format: "palette", name: moduleName, bundle: false },
      version,
      banner,
      minBanner: minBanner,
      dir,
      bundle: false,
      additionalExternals,
      progress,
    }),
  ];
}

export { loadParticlesPalette };
