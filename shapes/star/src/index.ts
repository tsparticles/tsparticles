import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadStarShape(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(async e => {
    const { StarDrawer } = await import("./StarDrawer.js");

    e.addShape(new StarDrawer());
  });
}
