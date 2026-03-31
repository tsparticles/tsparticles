import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine - The engine to add the plugin to
 */
export async function loadPolygonMaskPlugin(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(async e => {
    const { PolygonMaskPlugin } = await import("./PolygonMaskPlugin.js");

    e.pluginManager.addPlugin(new PolygonMaskPlugin(e.pluginManager));
  });
}

export * from "./Enums/PolygonMaskInlineArrangement.js";
export * from "./Enums/PolygonMaskMoveType.js";
export * from "./Enums/PolygonMaskType.js";
