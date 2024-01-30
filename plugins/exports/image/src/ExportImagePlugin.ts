import type { Container, Engine, IPlugin } from "@tsparticles/engine";
import type { ExportImageInstance } from "./ExportImageInstance.js";

/**
 */
export class ExportImagePlugin implements IPlugin {
    readonly id;

    private readonly _engine;

    constructor(engine: Engine) {
        this.id = "export-image";

        this._engine = engine;
    }

    async getPlugin(container: Container): Promise<ExportImageInstance> {
        const { ExportImageInstance } = await import("./ExportImageInstance.js");

        return new ExportImageInstance(container, this._engine);
    }

    loadOptions(): void {
        // do nothing
    }

    needsPlugin(): boolean {
        return true;
    }
}
