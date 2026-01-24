import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadSpadesSuitShape(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(async e => {
    const { SpadeDrawer } = await import("./SpadeDrawer.js");

    e.addShape(new SpadeDrawer());
  });
}
