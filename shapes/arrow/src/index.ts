import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadArrowShape(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(e => {
    e.addShape(["arrow"], async () => {
      const { ArrowDrawer } = await import("./ArrowDrawer.js");

      return new ArrowDrawer();
    });
  });
}
