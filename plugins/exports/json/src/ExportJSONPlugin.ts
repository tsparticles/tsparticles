import type { Container, IContainerPlugin, IPlugin } from "@tsparticles/engine";

/**
 */
export class ExportJSONPlugin implements IPlugin {
    readonly id;

    constructor() {
        this.id = "export-json";
    }

    async getPlugin(container: Container): Promise<IContainerPlugin> {
        const { ExportJSONPluginInstance } = await import("./ExportJSONPluginInstance.js");

        return new ExportJSONPluginInstance(container);
    }

    loadOptions(): void {
        // do nothing
    }

    needsPlugin(): boolean {
        return true;
    }
}
