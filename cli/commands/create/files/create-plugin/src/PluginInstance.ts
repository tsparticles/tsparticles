import { /*type Container, type Engine,*/ type IContainerPlugin } from "@tsparticles/engine";

export class PluginInstance implements IContainerPlugin {
    /*
    readonly #container;
    readonly #engine;

    constructor(container: Container, engine: Engine) {
        /*this.#container = container;
        this.#engine = engine;
    }
    */

    async init(): Promise<void> {
        // add your plugin initialization here, replace the empty promise
        return await Promise.resolve();
    }
}
