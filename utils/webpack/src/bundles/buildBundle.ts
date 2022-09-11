import { getBundleEntry } from "./getBundleEntry";
import { getConfig } from "../common/getConfig";

function loadParticlesBundle(moduleName: string, bundleName: string, version: string, dir: string): unknown {
    const fixBundleName = bundleName ? `${bundleName} ` : "";
    const banner = `Author : Matteo Bruni
MIT license: https://opensource.org/licenses/MIT
Demo / Generator : https://particles.js.org/
GitHub : https://www.github.com/matteobruni/tsparticles
How to use? : Check the GitHub README
v${version}`,
        minBanner = `tsParticles ${fixBundleName}v${version} by Matteo Bruni`;

    return [
        getConfig(getBundleEntry(moduleName, false), banner, minBanner, dir, false),
        getConfig(getBundleEntry(`${moduleName}.bundle`, true), banner, minBanner, dir, true),
    ];
}

export { loadParticlesBundle };
