import { type Engine } from "@tsparticles/engine";
import { SquircleDrawer } from "./SquircleDrawer.js";

declare const __VERSION__: string;

/**
 * @param engine - The engine to load the shape in
 */
export async function loadSquircleShape(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    e.pluginManager.addShape(["squircle"], () => Promise.resolve(new SquircleDrawer()));
  });
}
