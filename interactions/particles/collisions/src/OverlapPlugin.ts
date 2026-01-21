import { type Container, type IContainerPlugin, type IPlugin } from "@tsparticles/engine";

export class OverlapPlugin implements IPlugin {
    id = "overlap";

    async getPlugin(container: Container): Promise<IContainerPlugin> {
        const { OverlapPluginInstance } = await import("./OverlapPluginInstance.js");

        return new OverlapPluginInstance(container);
    }

    loadOptions(): void {
        // no-op
    }

    needsPlugin(): boolean {
        return true;
    }
}
