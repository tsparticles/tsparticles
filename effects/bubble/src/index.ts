import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadBubbleEffect(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(e => {
    e.addEffect("bubble", async () => {
      const { BubbleDrawer } = await import("./BubbleDrawer.js");

      return new BubbleDrawer();
    });
  });
}
