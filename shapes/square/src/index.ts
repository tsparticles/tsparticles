import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadSquareShape(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(async e => {
    const { SquareDrawer } = await import("./SquareDrawer.js");

    e.addShape(new SquareDrawer());
  });
}
