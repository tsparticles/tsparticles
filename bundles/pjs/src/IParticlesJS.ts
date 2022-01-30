import type { Container } from "tsparticles-engine";
import { IParticlesJSOptions } from "./IParticlesJSOptions";

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
