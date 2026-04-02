import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadCardsShape(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(async e => {
    const [{ loadFullCardsShape }, { loadCardSuitsShape }] = await Promise.all([
      import("./cards/index.js"),
      import("./suits.js"),
    ]);

    await Promise.all([
      loadFullCardsShape(e),
      loadCardSuitsShape(e),
    ]);
  });
}

export * from "./cards/index.js";
export * from "./suits.js";
