import { getConfig } from "../../common/getConfig";
import { getInteractionExternalEntry } from "./getInteractionExternalEntry";

function loadParticlesInteractionExternal(
    moduleName: string,
    pluginName: string,
    version: string,
    dir: string
): unknown {
    const banner = `Author : Matteo Bruni
MIT license: https://opensource.org/licenses/MIT
Demo / Generator : https://particles.js.org/
GitHub : https://www.github.com/matteobruni/tsparticles
How to use? : Check the GitHub README
v${version}`,
        minBanner = `tsParticles ${pluginName} External Interaction v${version} by Matteo Bruni`;

    return [getConfig(getInteractionExternalEntry(moduleName, false), banner, minBanner, dir, false)];
}

export { loadParticlesInteractionExternal };
