import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadCardSuitsShape(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(async e => {
    const [
      { loadClubsSuitShape },
      { loadDiamondsSuitShape },
      { loadHeartsSuitShape },
      { loadSpadesSuitShape },
    ] = await Promise.all([
      import("./clubs/index.js"),
      import("./diamonds/index.js"),
      import("./hearts/index.js"),
      import("./spades/index.js"),
    ]);

    await Promise.all([
      loadClubsSuitShape(e),
      loadDiamondsSuitShape(e),
      loadHeartsSuitShape(e),
      loadSpadesSuitShape(e),
    ]);
  });
}

/**
 * @param engine -
 */
export async function loadCardsShape(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(async e => {
    const { loadFullCardsShape } = await import("./cards/index.js");

    await Promise.all([
      loadFullCardsShape(e),
      loadCardSuitsShape(e),
    ]);
  });
}

export * from "./cards/index.js";
export * from "./clubs/index.js";
export * from "./diamonds/index.js";
export * from "./hearts/index.js";
export * from "./spades/index.js";
