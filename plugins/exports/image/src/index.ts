import type { Container, Engine, IPlugin } from "@tsparticles/engine";
import type { ExportImageInstance } from "./ExportImageInstance.js";

/**
 */
class ExportImagePlugin implements IPlugin {
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

/**
 * @param engine -
 * @param refresh -
 */
export async function loadExportImagePlugin(engine: Engine, refresh = true): Promise<void> {
    await engine.addPlugin(new ExportImagePlugin(engine), refresh);
}
