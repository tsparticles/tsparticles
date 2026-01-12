import type { Container, IContainerPlugin, IPlugin } from "@tsparticles/engine";

/**
 */
export class ExportImagePlugin implements IPlugin {
    readonly id;

    constructor() {
        this.id = "export-image";
    }

    async getPlugin(container: Container): Promise<IContainerPlugin> {
        const { ExportImageInstance } = await import("./ExportImageInstance.js");

        return new ExportImageInstance(container);
    }

    loadOptions(): void {
        // do nothing
    }

    needsPlugin(): boolean {
        return true;
    }
}
