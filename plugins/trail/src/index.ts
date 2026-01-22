import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine - The engine instance
 */
export async function loadTrailPlugin(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(async e => {
    const { TrailPlugin } = await import("./TrailPlugin.js");

    e.addPlugin(new TrailPlugin(engine));
  });
}
