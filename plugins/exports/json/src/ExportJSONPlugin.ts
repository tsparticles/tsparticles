import type { Container, IPlugin } from "@tsparticles/engine";
import { ExportJSONInstance } from "./ExportJSONInstance.js";

/**
 */
export class ExportJSONPlugin implements IPlugin {
    readonly id;

    constructor() {
        this.id = "export-json";
    }

    getPlugin(container: Container): Promise<ExportJSONInstance> {
        return Promise.resolve(new ExportJSONInstance(container));
    }

    loadOptions(): void {
        // do nothing
    }

    needsPlugin(): boolean {
        return true;
    }
}
