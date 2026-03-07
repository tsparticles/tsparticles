import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadMatrixShape(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(e => {
    e.addShape(["matrix"], async () => {
      const { MatrixDrawer } = await import("./MatrixDrawer.js");

      return new MatrixDrawer();
    });
  });
}
