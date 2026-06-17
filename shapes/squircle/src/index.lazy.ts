import { type Engine } from "@tsparticles/engine/lazy";

declare const __VERSION__: string;

/**
 * @param engine - The engine to load the shape in
 */
export async function loadSquircleShape(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(async e => {
    const { SquircleDrawer } = await import("./SquircleDrawer.js");

    e.pluginManager.addShape(["squircle"], () => Promise.resolve(new SquircleDrawer()));
  });
}
