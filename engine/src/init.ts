import { Engine } from "./Core/Engine";
import { HslColorManager } from "./Utils/HslColorManager";
import { RgbColorManager } from "./Utils/RgbColorManager";
import { addColorManager } from "./Utils/ColorUtils";

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
