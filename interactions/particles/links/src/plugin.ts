import type { Engine, IPlugin } from "@tsparticles/engine";
import type { LinkContainer } from "./Types.js";
import type { LinkInstance } from "./LinkInstance.js";

class LinksPlugin implements IPlugin {
    readonly id;

    constructor() {
        this.id = "links";
    }

    async getPlugin(container: LinkContainer): Promise<LinkInstance> {
        const { LinkInstance } = await import("./LinkInstance.js");

        return new LinkInstance(container);
    }

    loadOptions(): void {
        // do nothing
    }

    needsPlugin(): boolean {
        return true;
    }
}

/**
 * @param engine -
 * @param refresh -
 */
export async function loadLinksPlugin(engine: Engine, refresh = true): Promise<void> {
    const plugin = new LinksPlugin();

    await engine.addPlugin(plugin, refresh);
}
