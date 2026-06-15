import { type Engine } from "@tsparticles/engine/lazy";

declare const __VERSION__: string;

/**
 * @param engine - The engine to load the shape in
 */
export async function loadFullCardsShape(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(e => {
    e.pluginManager.addShape(["card"], async container => {
      const { CardDrawer } = await import("./CardDrawer.js");

      return new CardDrawer(container);
    });
  });
}
