import { /*type Container, type Engine,*/ type IPlugin, type ISourceOptions, type Options } from "@tsparticles/engine";
import type { PluginInstance } from "./PluginInstance.js";

/**
 */
export class Plugin implements IPlugin {
    readonly id;

    //readonly #engine;

    constructor(/*engine: Engine*/) {
        this.id = "#template#";

        //this.#engine = engine;
    }

    async getPlugin(/*container: Container*/): Promise<PluginInstance> {
        const { PluginInstance } = await import("./PluginInstance.js");

        return new PluginInstance(/*container, this._engine*/);
    }

    loadOptions(_options: Options, _source?: ISourceOptions): void {
        if (!this.needsPlugin()) {
            // ignore plugin options when not needed

            return;
        }

        // Load your options here
    }

    needsPlugin(_options?: ISourceOptions): boolean {
        return true; // add your condition here, replace true with condition if needed
    }
}
