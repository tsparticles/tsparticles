import { getConfig } from "../common/getConfig";
import { getUpdaterEntry } from "./getUpdaterEntry";

function loadParticlesUpdater(moduleName: string, updaterName: string, version: string, dir: string): unknown {
    const banner = `Author : Matteo Bruni
MIT license: https://opensource.org/licenses/MIT
Demo / Generator : https://particles.js.org/
GitHub : https://www.github.com/matteobruni/tsparticles
How to use? : Check the GitHub README
v${version}`,
        minBanner = `tsParticles ${updaterName} Updater v${version} by Matteo Bruni`;

    return [getConfig(getUpdaterEntry(moduleName, false), banner, minBanner, dir, false)];
}

export { loadParticlesUpdater };
