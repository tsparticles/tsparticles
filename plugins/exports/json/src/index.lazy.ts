import { type Engine } from "@tsparticles/engine/lazy";

declare const __VERSION__: string;

/**
 * @param engine - The engine to load the shape in
 */
export async function loadExportJSONPlugin(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(async e => {
    const { ExportJSONPlugin } = await import("./ExportJSONPlugin.js");

    e.pluginManager.addPlugin(new ExportJSONPlugin());
  });
}
