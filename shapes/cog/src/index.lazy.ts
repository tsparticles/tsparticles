import { type Engine } from "@tsparticles/engine/lazy";

declare const __VERSION__: string;

/**
 * @param engine - The engine to load the shape in
 */
export async function loadCogShape(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(async e => {
    const { CogDrawer } = await import("./CogDrawer.js");

    e.pluginManager.addShape(["cog"], () => Promise.resolve(new CogDrawer()));
  });
}
