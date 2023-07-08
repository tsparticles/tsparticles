import type { Container, Engine, IPlugin } from "tsparticles-engine";
import { ExportJSONInstance } from "./ExportJSONInstance";

/**
 */
class ExportJSONPlugin implements IPlugin {
    readonly id;

    private readonly _engine;

    constructor(engine: Engine) {
        this.id = "sounds";

        this._engine = engine;
    }

    getPlugin(container: Container): ExportJSONInstance {
        return new ExportJSONInstance(container, this._engine);
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
export async function loadExportJSONPlugin(engine: Engine, refresh = true): Promise<void> {
    await engine.addPlugin(new ExportJSONPlugin(engine), refresh);
}
