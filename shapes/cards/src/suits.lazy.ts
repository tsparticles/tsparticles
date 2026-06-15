import { type Engine } from "@tsparticles/engine/lazy";

declare const __VERSION__: string;

/**
 * @param engine - The engine to load the shape in
 */
export async function loadCardSuitsShape(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  const [{ loadClubsSuitShape }, { loadDiamondsSuitShape }, { loadHeartsSuitShape }, { loadSpadesSuitShape }] =
    await Promise.all([
      import("./clubs/index.lazy.js"),
      import("./diamonds/index.lazy.js"),
      import("./hearts/index.lazy.js"),
      import("./spades/index.lazy.js"),
    ]);

  await Promise.all([
    loadClubsSuitShape(engine),
    loadDiamondsSuitShape(engine),
    loadHeartsSuitShape(engine),
    loadSpadesSuitShape(engine),
  ]);
}
