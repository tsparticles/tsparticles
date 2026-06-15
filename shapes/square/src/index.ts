import { type Engine } from "@tsparticles/engine";
import { SquareDrawer } from "./SquareDrawer.js";

declare const __VERSION__: string;

/**
 * @param engine - The engine to load the shape in
 */
export async function loadSquareShape(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    e.pluginManager.addShape(["edge", "square"], () => Promise.resolve(new SquareDrawer()));
  });
}
