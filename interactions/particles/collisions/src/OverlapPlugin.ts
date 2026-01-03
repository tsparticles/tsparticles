import { type Container, type IContainerPlugin, type IPlugin } from "@tsparticles/engine";
import { OverlapPluginInstance } from "./OverlapPluginInstance.js";

export class OverlapPlugin implements IPlugin {
    id = "overlap";

    getPlugin(container: Container): Promise<IContainerPlugin> {
        return Promise.resolve(new OverlapPluginInstance(container));
    }

    loadOptions(): void {
        // no-op
    }

    needsPlugin(): boolean {
        return true;
    }
}
