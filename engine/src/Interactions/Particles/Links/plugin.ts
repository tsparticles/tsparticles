import type { Container } from "../../../Core/Container";
import type { Engine } from "../../../engine";
import type { IPlugin } from "../../../Core/Interfaces/IPlugin";
import { LinkInstance } from "./LinkInstance";

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

export async function loadPlugin(engine: Engine): Promise<void> {
    const plugin = new LinksPlugin();

    await engine.addPlugin(plugin);
}
