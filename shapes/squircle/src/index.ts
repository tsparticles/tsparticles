import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadSquircleShape(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(e => {
    e.addShape(["squircle"], async () => {
      const { SquircleDrawer } = await import("./SquircleDrawer.js");

      return new SquircleDrawer();
    });
  });
}
