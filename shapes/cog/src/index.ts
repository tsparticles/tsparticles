import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadCogShape(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(e => {
    e.addShape(["cog"], async () => {
      const { CogDrawer } = await import("./CogDrawer.js");

      return new CogDrawer();
    });
  });
}
