/**
 * [[include:pjsMigration.md]]
 * @packageDocumentation
 */
import type {
    Container,
    Main,
    Particle,
    RecursivePartial
} from "tsparticles-engine";
import type { IParticlesJSOptions } from "./IParticlesJSOptions";
import { fixOptions } from "./fixOptions";

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
    (tagId: string, options: IParticlesJSOptions): Promise<Container | undefined>;

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

function fetchError(statusCode: number): void {
    console.error(`Error tsParticles - fetch status: ${statusCode}`);
    console.error("Error tsParticles - File config not found");
}

const initPjs = (main: Main): { particlesJS: IParticlesJS; pJSDom: Container[] } => {
    /**
     * Loads the provided options to create a [[Container]] object.
     * @deprecated this method is obsolete, please use the new tsParticles.load
     * @param tagId the particles container element id
     * @param options the options object to initialize the [[Container]]
     */
    const particlesJS = (tagId: string, options: RecursivePartial<IParticlesJSOptions>): Promise<Container | undefined> => {
        return main.load(tagId, fixOptions(options));
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
        (async () => {
            const response = await fetch(pathConfigJson);

            if (!response.ok) {
                fetchError(response.status);

                return;
            }

            const data = await response.json();

            callback(await particlesJS(tagId, data));
        })();
    };

    /**
     * Adds an additional click handler to all the loaded [[Container]] objects.
     * @deprecated this method is obsolete, please use the new tsParticles.setOnClickHandler
     * @param callback the function called after the click event is fired
     */
    particlesJS.setOnClickHandler = (callback: (e: Event, particles?: Particle[]) => void): void => {
        main.setOnClickHandler(callback);
    };

    /**
     * All the [[Container]] objects loaded
     * @deprecated this method is obsolete, please use the new tsParticles.dom
     */
    const pJSDom = main.dom();

    return { particlesJS, pJSDom };
};

export { initPjs };
