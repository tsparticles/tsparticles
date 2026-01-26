import { type Engine, type IPlugin } from "@tsparticles/engine";
import type { LinkContainer } from "./Types.js";
import type { LinkInstance } from "./LinkInstance.js";

export class LinksPlugin implements IPlugin {
  readonly id = "links";
  private readonly _engine;

  constructor(engine: Engine) {
    this._engine = engine;
  }

  async getPlugin(container: LinkContainer): Promise<LinkInstance> {
    const { LinkInstance } = await import("./LinkInstance.js");

    return new LinkInstance(container, this._engine);
  }

  loadOptions(): void {
    // do nothing
  }

  needsPlugin(): boolean {
    return true;
  }
}
