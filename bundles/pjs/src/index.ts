/**
 * [[include:pjsMigration.md]]
 */
import { type Container, type Engine } from "@tsparticles/engine";
import type { IParticlesJS } from "./VincentGarreau/IParticlesJS.js";
import { Particles } from "./marcbruederlin/Particles.js";
import { initParticlesJS } from "./VincentGarreau/particles.js";

declare const __VERSION__: string;

declare global {
    interface Window {
        /**
         * @deprecated this method is obsolete, please use the new {@link Engine.load | tsParticles.load}
         * The particles.js compatibility object
         */
        Particles: typeof Particles;

        /**
         * @deprecated this method is obsolete, please use the new {@link Engine.dom | tsParticles.dom}
         * The particles.js compatibility dom array
         */
        pJSDom: Container[];

        /**
         * @deprecated this method is obsolete, please use the new {@link Engine.load | tsParticles.load}
         * The particles.js compatibility instance
         */
        particlesJS: IParticlesJS;
    }
}

/**
 * Initializes particles.js compatibility to the given engine
 * @param engine - the engine that requires particles.js compatibility
 * @returns the particles.js compatibility object
 */
const initPjs = (
    engine: Engine,
): {
    /**
     * @deprecated this method is obsolete, please use the new {@link Engine.load | tsParticles.load}
     * The particles.js compatibility object
     */
    Particles: typeof Particles;

    /**
     * @deprecated this method is obsolete, please use the new {@link Engine.dom | tsParticles.dom}
     * The particles.js compatibility dom array
     */
    pJSDom: Container[];

    /**
     * @deprecated this method is obsolete, please use the new {@link Engine.load | tsParticles.load}
     * The particles.js compatibility instance
     */
    particlesJS: IParticlesJS;
} => {
    engine.checkVersion(__VERSION__);

    // eslint-disable-next-line @typescript-eslint/no-deprecated
    const { particlesJS, pJSDom } = initParticlesJS(engine);

    // eslint-disable-next-line @typescript-eslint/no-deprecated
    window.particlesJS = particlesJS;
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    window.pJSDom = pJSDom;
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    window.Particles = Particles;

    return { particlesJS, pJSDom, Particles };
};

export { initPjs };
