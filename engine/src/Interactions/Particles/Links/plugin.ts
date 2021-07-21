import { LinkInstance } from "./LinkInstance";
import type { Container } from "../../../Core/Container";
import type { Main } from "../../../main";
import type { IPlugin } from "../../../Core/Interfaces";

class Plugin implements IPlugin {
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
    const plugin = new Plugin();

    tsParticles.addPlugin(plugin);
}
