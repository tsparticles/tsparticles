import { type Engine } from "@tsparticles/engine/lazy";
import { validTypes } from "./Utils.js";

declare const __VERSION__: string;

/**
 * @param engine - The engine to load the shape in
 */
export async function loadTextShape(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    e.pluginManager.addShape(validTypes, async () => {
      const { TextDrawer } = await import("./TextDrawer.js");

      return new TextDrawer();
    });
  });
}
