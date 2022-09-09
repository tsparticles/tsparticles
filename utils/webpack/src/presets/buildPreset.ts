import { getConfig } from "../common/getConfig";
import { getPresetEntry } from "./getPresetEntry";

function loadParticlesPreset(moduleName: string, presetName: string, version: string, dir: string): unknown {
    const banner = `Author : Matteo Bruni
MIT license: https://opensource.org/licenses/MIT
Demo / Generator : https://particles.js.org/
GitHub : https://www.github.com/matteobruni/tsparticles
How to use? : Check the GitHub README
v${version}`,
        minBanner = `tsParticles ${presetName} Preset v${version} by Matteo Bruni`;

    return [
        getConfig(getPresetEntry(moduleName, false), banner, minBanner, dir, false),
        getConfig(getPresetEntry(`${moduleName}.bundle`, true), banner, minBanner, dir, true),
    ];
}

export { loadParticlesPreset };
