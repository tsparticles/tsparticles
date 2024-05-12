import type { Container, Engine, IPlugin } from "@tsparticles/engine";
import { ExportImageInstance } from "./ExportImageInstance.js";

/**
 */
export class ExportImagePlugin implements IPlugin {
    readonly id;

    private readonly _engine;

    constructor(engine: Engine) {
        this.id = "export-image";

        this._engine = engine;
    }

    getPlugin(container: Container): Promise<ExportImageInstance> {
        return Promise.resolve(new ExportImageInstance(container, this._engine));
    }

    loadOptions(): void {
        // do nothing
    }

    needsPlugin(): boolean {
        return true;
    }
}
