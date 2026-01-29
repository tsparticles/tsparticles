import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadPathShape(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(e => {
    e.addShape(["path"], async () => {
      const { PathDrawer } = await import("./PathDrawer.js");

      return new PathDrawer();
    });
  });
}
