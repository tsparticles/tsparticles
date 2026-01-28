import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadSpadesSuitShape(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(e => {
    e.addShape(["spade", "spades"], async () => {
      const { SpadeDrawer } = await import("./SpadeDrawer.js");

      return new SpadeDrawer();
    });
  });
}
