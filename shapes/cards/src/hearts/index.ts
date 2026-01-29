import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadHeartsSuitShape(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(e => {
    e.addShape(["heart", "hearts"], async () => {
      const { HeartDrawer } = await import("./HeartDrawer.js");

      return new HeartDrawer();
    });
  });
}
