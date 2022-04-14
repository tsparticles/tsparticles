/**
 * [[include:pjsMigration.md]]
 * @packageDocumentation
 */
import type { Container } from "./Core/Container";
import type { Engine } from "./engine";
import type { IOptions } from "./Options/Interfaces/IOptions";
import type { Particle } from "./Core/Particle";
import type { RecursivePartial } from "./Types/RecursivePartial";

/**
 * [[include:pjsMigration.md]]
 * @category Particles.js
 */
export interface IParticlesJS {
    /**
     * Loads the provided options to create a [[Container]] object.
     * @deprecated this method is obsolete, please use the new tsParticles.load
     * @param tagId the particles container element id
     * @param options the options object to initialize the [[Container]]
     */
    (tagId: string, options: RecursivePartial<IOptions>): Promise<Container | undefined>;

    /**
     * Loads the provided json with a GET request.
     * The content will be used to create a [[Container]] object.
     * @deprecated this method is obsolete, please use the new tsParticles.loadJSON
     * @param tagId the particles container element id
     * @param pathConfigJson the json path to use in the GET request
     * @param callback called after the [[Container]] is loaded and it will be passed as a parameter
     */
    load(tagId: string, pathConfigJson: string, callback: (container?: Container) => void): void;

    /**
     * Adds an additional click handler to all the loaded [[Container]] objects.
     * @deprecated this method is obsolete, please use the new tsParticles.setOnClickHandler
     * @param callback the function called after the click event is fired
     */
    setOnClickHandler(callback: EventListenerOrEventListenerObject): void;
}

/**
 * Initializes particles.js compatibility to the given engine
 * @param engine the engine that requires particles.js compatibility
 */
const initPjs = (
    engine: Engine
): {
    /**
     * The particles.js compatibility instance
     */
    particlesJS: IParticlesJS;
    /**
     * The particles.js compatibility dom array
     */
    pJSDom: Container[];
} => {
    /**
     * Loads the provided options to create a [[Container]] object.
     * @deprecated this method is obsolete, please use the new tsParticles.load
     * @param tagId the particles container element id
     * @param options the options object to initialize the [[Container]]
     */
    const particlesJS = (tagId: string, options: RecursivePartial<IOptions>): Promise<Container | undefined> => {
        return engine.load(tagId, options);
    };

    /**
     * Loads the provided json with a GET request.
     * The content will be used to create a [[Container]] object.
     * @deprecated this method is obsolete, please use the new tsParticles.loadJSON
     * @param tagId the particles container element id
     * @param pathConfigJson the json path to use in the GET request
     * @param callback called after the [[Container]] is loaded and it will be passed as a parameter
     */
    particlesJS.load = (tagId: string, pathConfigJson: string, callback: (container?: Container) => void): void => {
        engine
            .loadJSON(tagId, pathConfigJson)
            .then((container) => {
                if (container) {
                    callback(container);
                }
            })
            .catch(() => {
                callback(undefined);
            });
    };

    /**
     * Adds a click handler to all the loaded [[Container]] objects.
     * @deprecated this method is obsolete, please use the new tsParticles.setOnClickHandler
     * @param callback the function called after the click event is fired
     */
    particlesJS.setOnClickHandler = (callback: (e: Event, particles?: Particle[]) => void): void => {
        engine.setOnClickHandler(callback);
    };

    /**
     * All the [[Container]] objects loaded
     * @deprecated this method is obsolete, please use the new [[tsParticles.dom]]
     */
    const pJSDom = engine.dom();

    return { particlesJS, pJSDom };
};

export { initPjs };