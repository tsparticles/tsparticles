import type { Container, Engine, IPlugin } from "tsparticles-engine";
import { ExportImageInstance } from "./ExportImageInstance";

/**
 */
class ExportImagePlugin implements IPlugin {
    readonly id;

    private readonly _engine;

    constructor(engine: Engine) {
        this.id = "export-image";

        this._engine = engine;
    }

    getPlugin(container: Container): ExportImageInstance {
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
