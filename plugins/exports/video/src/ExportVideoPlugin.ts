import type { Container, IContainerPlugin, IPlugin } from "@tsparticles/engine";

/**
 */
export class ExportVideoPlugin implements IPlugin {
    readonly id;

    constructor() {
        this.id = "export-video";
    }

    async getPlugin(container: Container): Promise<IContainerPlugin> {
        const { ExportVideoInstance } = await import("./ExportVideoInstance.js");

        return new ExportVideoInstance(container);
    }

    loadOptions(): void {
        // do nothing
    }

    needsPlugin(): boolean {
        return true;
    }
}
