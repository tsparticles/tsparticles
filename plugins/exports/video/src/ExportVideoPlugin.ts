import type { Container, IPlugin } from "@tsparticles/engine";
import { ExportVideoInstance } from "./ExportVideoInstance.js";

/**
 */
export class ExportVideoPlugin implements IPlugin {
    readonly id;

    constructor() {
        this.id = "export-video";
    }

    getPlugin(container: Container): Promise<ExportVideoInstance> {
        return Promise.resolve(new ExportVideoInstance(container));
    }

    loadOptions(): void {
        // do nothing
    }

    needsPlugin(): boolean {
        return true;
    }
}
