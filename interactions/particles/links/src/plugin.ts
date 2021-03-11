import type { Container, IPlugin, Main } from "tsparticles-engine";
import { LinkInstance } from "./LinkInstance";

class Plugin implements IPlugin {
    public readonly id;

    constructor() {
        this.id = "links";
    }

    public getPlugin(container: Container): LinkInstance {
        return new LinkInstance(container);
    }

    public needsPlugin(): boolean {
        return true;
    }

    public loadOptions(): void {
        // do nothing
    }
}

export function loadPlugin(tsParticles: Main): void {
    const plugin = new Plugin();

    tsParticles.addPlugin(plugin);
}
