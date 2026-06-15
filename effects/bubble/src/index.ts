import { BubbleDrawer } from "./BubbleDrawer.js";
import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine - The engine to load the shape in
 */
export async function loadBubbleEffect(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    e.pluginManager.addEffect("bubble", () => {
      return Promise.resolve(new BubbleDrawer());
    });
  });
}
