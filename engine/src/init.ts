import { Engine } from "./Core/Engine.js";
import { HslColorManager } from "./Utils/HslColorManager.js";
import { RgbColorManager } from "./Utils/RgbColorManager.js";
import { addColorManager } from "./Utils/ColorUtils.js";

/**
 *
 * @returns the initialized engine object
 */
export function init(): Engine {
    const rgbColorManager = new RgbColorManager(),
        hslColorManager = new HslColorManager();

    addColorManager(rgbColorManager);
    addColorManager(hslColorManager);

    /**
     * The exposed tsParticles instance
     */
    const engine = new Engine();

    engine.init();

    return engine;
}
