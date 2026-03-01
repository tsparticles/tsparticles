import type { Container, IContainerPlugin, IPlugin } from "@tsparticles/engine";
import type { MoveEngine } from "./Types.js";

export class MovePlugin implements IPlugin {
  id = "move";

  private readonly _engine;

  constructor(engine: MoveEngine) {
    this._engine = engine;
  }

  async getPlugin(container: Container): Promise<IContainerPlugin> {
    const { MovePluginInstance } = await import("./MovePluginInstance.js");

    return new MovePluginInstance(this._engine, container);
  }

  loadOptions(): void {
    // no op
  }

  needsPlugin(): boolean {
    return true;
  }
}
