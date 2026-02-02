import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadDiamondsSuitShape(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(e => {
    e.addShape(["diamond", "diamonds"], async () => {
      const { DiamondDrawer } = await import("./DiamondDrawer.js");

      return new DiamondDrawer();
    });
  });
}
