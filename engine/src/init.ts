import { Engine } from "./Core/Engine.js";

/**
 *
 * @returns the initialized engine object
 */
export function init(): Engine {
    /**
     * The exposed tsParticles instance
     */
    const engine = new Engine();

    engine.init();

    return engine;
}
