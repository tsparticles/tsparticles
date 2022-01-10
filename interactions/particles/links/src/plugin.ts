import { LinkInstance } from "./LinkInstance";
import type { Container, IPlugin, Engine } from "tsparticles-engine";

class LinksPlugin implements IPlugin {
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

export async function loadPlugin(tsParticles: Engine): Promise<void> {
    const plugin = new LinksPlugin();

    await tsParticles.addPlugin(plugin);
}
