import { CardDrawer } from "./CardDrawer.js";
import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine - The engine to load the shape in
 */
export async function loadFullCardsShape(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    e.pluginManager.addShape(["card"], container => Promise.resolve(new CardDrawer(container)));
  });
}
