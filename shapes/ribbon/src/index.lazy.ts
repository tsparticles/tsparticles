import { type Container } from "@tsparticles/engine";
import { type Engine } from "@tsparticles/engine/lazy";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadRibbonShape(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(async e => {
    const { RibbonDrawer } = await import("./RibbonDrawer.js");

    e.pluginManager.addShape(["ribbon"], (container: Container) =>
      Promise.resolve(new RibbonDrawer(container, container.hdr)),
    );
  });
}
