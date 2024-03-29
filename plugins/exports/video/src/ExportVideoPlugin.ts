import type { Container, Engine, IPlugin } from "@tsparticles/engine";
import { ExportVideoInstance } from "./ExportVideoInstance.js";

/**
 */
export class ExportVideoPlugin implements IPlugin {
    readonly id;

    private readonly _engine;

    constructor(engine: Engine) {
        this.id = "export-video";

        this._engine = engine;
    }

    getPlugin(container: Container): Promise<ExportVideoInstance> {
        return Promise.resolve(new ExportVideoInstance(container, this._engine));
    }

    loadOptions(): void {
        // do nothing
    }

    needsPlugin(): boolean {
        return true;
    }
}
