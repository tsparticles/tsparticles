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

export function loadPlugin(tsParticles: Main): void {
    const plugin = new Index();

    tsParticles.addPlugin(plugin);
}
