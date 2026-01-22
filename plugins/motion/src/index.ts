import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine - The engine instance
 */
export async function loadMotionPlugin(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(async e => {
    const { MotionPlugin } = await import("./MotionPlugin.js");

    e.addPlugin(new MotionPlugin());
  });
}
