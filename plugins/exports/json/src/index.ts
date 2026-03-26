import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadExportJSONPlugin(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(async e => {
    const { ExportJSONPlugin } = await import("./ExportJSONPlugin.js");

    e.pluginManager.addPlugin(new ExportJSONPlugin());
  });
}
