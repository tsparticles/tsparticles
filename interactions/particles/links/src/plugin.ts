import { LinkInstance } from "./LinkInstance";
import type { Container, IPlugin, Main } from "tsparticles-engine";

class Index implements IPlugin {
    readonly id;

    constructor() {
        this.id = "links";
    }

    getPlugin(container: Container): LinkInstance {
        return new LinkInstance(container);
    }

    needsPlugin(): boolean {
        return true;
    }

    loadOptions(): void {
        // do nothing
    }
}

export async function loadPlugin(tsParticles: Main): Promise<void> {
    const plugin = new Index();

    await tsParticles.addPlugin(plugin);
}
