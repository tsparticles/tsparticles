import type { ExternalData } from "../common/ExternalData.js";
import { getConfig } from "../common/getConfig.js";

interface TemplateParams {
  additionalExternals?: ExternalData[];
  dir: string;
  moduleName: string;
  progress: boolean;
  templateName: string;
  version: string;
}

/**
 * @param params - The parameters
 * @returns the webpack config
 */
function loadParticlesTemplate(params: TemplateParams): unknown {
  const { moduleName, templateName, version, dir, additionalExternals, progress } = params,
    banner = `Author : Matteo Bruni
MIT license: https://opensource.org/licenses/MIT
Demo / Generator : https://particles.js.org/
GitHub : https://www.github.com/matteobruni/tsparticles
How to use? : Check the GitHub README
v${version}`,
    minBanner = `tsParticles ${templateName} Template v${version} by Matteo Bruni`;

  return [
    ...getConfig({
      entry: { format: "template", name: moduleName, bundle: false },
      version,
      banner,
      minBanner: minBanner,
      dir,
      bundle: false,
      additionalExternals,
      progress,
    }),
    ...getConfig({
      entry: { format: "template", name: `${moduleName}.bundle`, bundle: true },
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

export { loadParticlesTemplate };
