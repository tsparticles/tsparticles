import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadFullCardsShape(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(async e => {
    const { CardDrawer } = await import("./CardDrawer.js");

    e.addShape(new CardDrawer());
  });
}
