import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadInfinityShape(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(async e => {
    const { InfinityDrawer } = await import("./InfinityDrawer.js");

    e.addShape(new InfinityDrawer());
  });
}
