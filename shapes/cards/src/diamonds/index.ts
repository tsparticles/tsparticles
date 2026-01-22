import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadDiamondsCardsShape(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(async e => {
    const { DiamondDrawer } = await import("./DiamondDrawer.js");

    e.addShape(new DiamondDrawer());
  });
}
