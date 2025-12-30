import type { Container, IPlugin } from "@tsparticles/engine";
import { ExportImageInstance } from "./ExportImageInstance.js";

/**
 */
export class ExportImagePlugin implements IPlugin {
    readonly id;

    constructor() {
        this.id = "export-image";
    }

    getPlugin(container: Container): Promise<ExportImageInstance> {
        return Promise.resolve(new ExportImageInstance(container));
    }

    loadOptions(): void {
        // do nothing
    }

    needsPlugin(): boolean {
        return true;
    }
}
