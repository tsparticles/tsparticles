import { Engine } from "./engine";
import { HslColorManager } from "./Utils/HslColorManager";
import { RgbColorManager } from "./Utils/RgbColorManager";
import { addColorManager } from "./Utils/ColorUtils";

const rgbColorManager = new RgbColorManager(),
    hslColorManager = new HslColorManager();

addColorManager(rgbColorManager);
addColorManager(hslColorManager);

/**
 * The exposed tsParticles instance
 */
const tsParticles = new Engine();

tsParticles.init();

window.tsParticles = tsParticles;

export * from "./exports";
export * from "./export-types";

export { tsParticles };
