import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadInfinityShape(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(e => {
    e.addShape(["infinity"], async () => {
      const { InfinityDrawer } = await import("./InfinityDrawer.js");

      return new InfinityDrawer();
    });
  });
}
