import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadSpiralShape(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(async e => {
    const { SpiralDrawer } = await import("./SpiralDrawer.js");

    e.addShape(new SpiralDrawer());
  });
}
