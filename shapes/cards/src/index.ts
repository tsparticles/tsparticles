import { type Engine } from "@tsparticles/engine";
import { loadCardSuitsShape } from "./suits.js";
import { loadFullCardsShape } from "./cards/index.js";

declare const __VERSION__: string;

/**
 * @param engine - The engine to load the shape in
 */
export async function loadCardsShape(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await Promise.all([
    loadFullCardsShape(engine),
    loadCardSuitsShape(engine),
  ]);
}
