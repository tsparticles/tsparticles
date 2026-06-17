import { type Engine } from "@tsparticles/engine";
import { SpadeDrawer } from "./SpadeDrawer.js";

declare const __VERSION__: string;

/**
 * @param engine - The engine to load the shape in
 */
export async function loadSpadesSuitShape(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    e.pluginManager.addShape(["spade", "spades"], () => Promise.resolve(new SpadeDrawer()));
  });
}
