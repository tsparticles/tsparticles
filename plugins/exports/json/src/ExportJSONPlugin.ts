import type { Container, IContainerPlugin, IPlugin } from "@tsparticles/engine";

/** JSON export plugin */
export class ExportJSONPlugin implements IPlugin {
  /** Plugin ID */
  readonly id = "export-json";

  async getPlugin(container: Container): Promise<IContainerPlugin> {
    const { ExportJSONPluginInstance } = await import("./ExportJSONPluginInstance.js");

    return new ExportJSONPluginInstance(container);
  }

  loadOptions(): void {
    // do nothing
  }

  /** Checks if the plugin is needed */
  needsPlugin(): boolean {
    return true;
  }
}
