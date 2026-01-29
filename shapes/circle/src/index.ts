import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadCircleShape(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(e => {
    e.addShape(["circle"], async () => {
      const { CircleDrawer } = await import("./CircleDrawer.js");

      return new CircleDrawer();
    });
  });
}
