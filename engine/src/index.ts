import { Engine } from "./engine";
import type { IAbsorberOptions } from "./Plugins/Absorbers/Options/Interfaces/IAbsorberOptions";
import type { IEmitterOptions } from "./Plugins/Emitters/Options/Interfaces/IEmitterOptions";
import type { IPolygonMaskOptions } from "./Plugins/PolygonMask/Options/Interfaces/IPolygonMaskOptions";
import type { IOptions as ISlimOptions } from "./Options/Interfaces/IOptions";
import type { RecursivePartial } from "./Types";
import { initPjs } from "./pjs";
import { loadFull } from "./full";

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

loadFull(tsParticles);

export * from "./Core";
export * from "./Core/Container";
export * from "./Enums";
export * from "./Plugins/Absorbers/Enums";
export * from "./Plugins/Emitters/Enums";
export * from "./Plugins/PolygonMask/Enums";
export { Engine, Engine as Main };
export * from "./Utils";
export * from "./Types";
export { particlesJS, pJSDom, tsParticles };

/**
 * tsParticles full options, including plugins
 */
export type IOptions = ISlimOptions & IAbsorberOptions & IEmitterOptions & IPolygonMaskOptions;

/**
 * tsParticles source options alias type, supporting partial objects
 */
export type ISourceOptions = RecursivePartial<IOptions>;
