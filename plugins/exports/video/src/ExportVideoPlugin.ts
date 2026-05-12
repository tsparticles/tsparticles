import type { Container, IContainerPlugin, IPlugin } from "@tsparticles/engine";

/** Video export plugin */
export class ExportVideoPlugin implements IPlugin {
  /** Plugin ID */
  readonly id = "export-video";

  async getPlugin(container: Container): Promise<IContainerPlugin> {
    const { ExportVideoPluginInstance } = await import("./ExportVideoPluginInstance.js");

    return new ExportVideoPluginInstance(container);
  }

  loadOptions(): void {
    // do nothing
  }

  /** Checks if the plugin is needed */
  needsPlugin(): boolean {
    return true;
  }
}
