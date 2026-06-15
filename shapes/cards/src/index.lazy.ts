import { type Engine } from "@tsparticles/engine/lazy";

declare const __VERSION__: string;

/**
 * @param engine - The engine to load the shape in
 */
export async function loadCardsShape(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(async e => {
    const [{ loadFullCardsShape }, { loadCardSuitsShape }] = await Promise.all([
      import("./cards/index.lazy.js"),
      import("./suits.lazy.js"),
    ]);

    await Promise.all([
      loadFullCardsShape(e),
      loadCardSuitsShape(e),
    ]);
  });
}
