import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadLineShape(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(async e => {
    const { LineDrawer } = await import("./LineDrawer.js");

    e.addShape(new LineDrawer());
  });
}
