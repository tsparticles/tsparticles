import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadSquareShape(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(e => {
    e.addShape(["edge", "square"], async () => {
      const { SquareDrawer } = await import("./SquareDrawer.js");

      return new SquareDrawer();
    });
  });
}
