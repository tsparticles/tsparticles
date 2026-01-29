import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadLineShape(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(e => {
    e.addShape(["line"], async () => {
      const { LineDrawer } = await import("./LineDrawer.js");

      return new LineDrawer();
    });
  });
}
