import { LinkInstance } from "./LinkInstance";
import type { Container } from "../../../Core/Container";
import type { Engine } from "../../../engine";
import type { IPlugin } from "../../../Core/Interfaces";

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
