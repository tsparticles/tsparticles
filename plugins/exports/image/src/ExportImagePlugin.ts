import type { Container, IContainerPlugin, IPlugin } from "@tsparticles/engine";

/**
 */
export class ExportImagePlugin implements IPlugin {
  readonly id = "export-image";

  async getPlugin(container: Container): Promise<IContainerPlugin> {
    const { ExportImagePluginInstance } = await import("./ExportImagePluginInstance.js");

    return new ExportImagePluginInstance(container);
  }

  loadOptions(): void {
    // do nothing
  }

  needsPlugin(): boolean {
    return true;
  }
}
