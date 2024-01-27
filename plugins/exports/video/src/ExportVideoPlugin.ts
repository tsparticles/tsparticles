import type { Container, Engine, IPlugin } from "@tsparticles/engine";
import type { ExportVideoInstance } from "./ExportVideoInstance.js";

/**
 */
export class ExportVideoPlugin implements IPlugin {
    readonly id;

    private readonly _engine;

    constructor(engine: Engine) {
        this.id = "export-video";

        this._engine = engine;
    }

    async getPlugin(container: Container): Promise<ExportVideoInstance> {
        const { ExportVideoInstance } = await import("./ExportVideoInstance.js");

        return new ExportVideoInstance(container, this._engine);
    }

    loadOptions(): void {
        // do nothing
    }

    needsPlugin(): boolean {
        return true;
    }
}
