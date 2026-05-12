import type { Container, IContainerPlugin, IPlugin } from "@tsparticles/engine";

/** Image export plugin */
export class ExportImagePlugin implements IPlugin {
  /** Plugin ID */
  readonly id = "export-image";

  async getPlugin(container: Container): Promise<IContainerPlugin> {
    const { ExportImagePluginInstance } = await import("./ExportImagePluginInstance.js");

    return new ExportImagePluginInstance(container);
  }

  loadOptions(): void {
    // do nothing
  }

  /** Checks if the plugin is needed */
  needsPlugin(): boolean {
    return true;
  }
}
