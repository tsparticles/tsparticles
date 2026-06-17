import { type Engine } from "@tsparticles/engine";
import { loadClubsSuitShape } from "./clubs/index.js";
import { loadDiamondsSuitShape } from "./diamonds/index.js";
import { loadHeartsSuitShape } from "./hearts/index.js";
import { loadSpadesSuitShape } from "./spades/index.js";

declare const __VERSION__: string;

/**
 * @param engine - The engine to load the shape in
 */
export async function loadCardSuitsShape(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await Promise.all([
    loadClubsSuitShape(engine),
    loadDiamondsSuitShape(engine),
    loadHeartsSuitShape(engine),
    loadSpadesSuitShape(engine),
  ]);
}
