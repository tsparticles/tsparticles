import type { Container, Engine, IPlugin } from "@tsparticles/engine";
import type { ExportJSONInstance } from "./ExportJSONInstance.js";

/**
 */
export class ExportJSONPlugin implements IPlugin {
    readonly id;

    private readonly _engine;

    constructor(engine: Engine) {
        this.id = "export-json";

        this._engine = engine;
    }

    async getPlugin(container: Container): Promise<ExportJSONInstance> {
        const { ExportJSONInstance } = await import("./ExportJSONInstance.js");

        return new ExportJSONInstance(container, this._engine);
    }

    loadOptions(): void {
        // do nothing
    }

    needsPlugin(): boolean {
        return true;
    }
}
