import type { Container, IContainerPlugin, IPlugin } from "@tsparticles/engine";

/**
 */
export class ExportJSONPlugin implements IPlugin {
    readonly id;

    constructor() {
        this.id = "export-json";
    }

    async getPlugin(container: Container): Promise<IContainerPlugin> {
        const { ExportJSONInstance } = await import("./ExportJSONInstance.js");

        return new ExportJSONInstance(container);
    }

    loadOptions(): void {
        // do nothing
    }

    needsPlugin(): boolean {
        return true;
    }
}
