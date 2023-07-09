import type { Container, Engine, IPlugin } from "tsparticles-engine";
import { ExportVideoInstance } from "./ExportVideoInstance";

/**
 */
class ExportVideoPlugin implements IPlugin {
    readonly id;

    private readonly _engine;

    constructor(engine: Engine) {
        this.id = "sounds";

        this._engine = engine;
    }

    getPlugin(container: Container): ExportVideoInstance {
        return new ExportVideoInstance(container, this._engine);
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
export async function loadExportVideoPlugin(engine: Engine, refresh = true): Promise<void> {
    await engine.addPlugin(new ExportVideoPlugin(engine), refresh);
}
