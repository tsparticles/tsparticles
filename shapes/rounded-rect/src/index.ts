import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadRoundedRectShape(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(e => {
    e.addShape(["rounded-rect"], async () => {
      const { RoundedRectDrawer } = await import("./RoundedRectDrawer.js");

      return new RoundedRectDrawer();
    });
  });
}
