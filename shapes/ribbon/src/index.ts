import { type Container, type Engine } from "@tsparticles/engine";
import { RibbonDrawer } from "./RibbonDrawer.js";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadRibbonShape(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    e.pluginManager.addShape(["ribbon"], (container: Container) =>
      Promise.resolve(new RibbonDrawer(container, container.hdr)),
    );
  });
}
