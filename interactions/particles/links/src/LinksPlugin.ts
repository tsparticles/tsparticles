import type { Engine, IPlugin } from "@tsparticles/engine";
import type { LinkContainer } from "./Types.js";
import { LinkInstance } from "./LinkInstance.js";

export class LinksPlugin implements IPlugin {
    readonly id;
    private readonly _engine;

    constructor(engine: Engine) {
        this.id = "links";
        this._engine = engine;
    }

    getPlugin(container: LinkContainer): Promise<LinkInstance> {
        return Promise.resolve(new LinkInstance(container, this._engine));
    }

    loadOptions(): void {
        // do nothing
    }

    needsPlugin(): boolean {
        return true;
    }
}
