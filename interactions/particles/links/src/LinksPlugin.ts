import type { IPlugin } from "@tsparticles/engine";
import type { LinkContainer } from "./Types.js";
import { LinkInstance } from "./LinkInstance.js";

export class LinksPlugin implements IPlugin {
    readonly id;

    constructor() {
        this.id = "links";
    }

    getPlugin(container: LinkContainer): Promise<LinkInstance> {
        return Promise.resolve(new LinkInstance(container));
    }

    loadOptions(): void {
        // do nothing
    }

    needsPlugin(): boolean {
        return true;
    }
}
