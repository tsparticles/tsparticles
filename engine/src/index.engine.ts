import { Engine } from "./engine";
import type { IOptions } from "./Options/Interfaces/IOptions";
import type { RecursivePartial } from "./Types";
import { initPjs } from "./pjs";

/**
 * The exposed tsParticles instance
 */
const tsParticles = new Engine();

tsParticles.init();

const {
    /**
     * The particles.js compatibility instance
     */
    particlesJS,

    /**
     * The particles.js compatibility dom array
     */
    pJSDom,
} = initPjs(tsParticles);

export * from "./Core";
export * from "./Enums";
export { Engine, Engine as Main };
export * from "./Utils";
export * from "./Types";
export { tsParticles, particlesJS, pJSDom };
export { IOptions };
export type ISourceOptions = RecursivePartial<IOptions>;
