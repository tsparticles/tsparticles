import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadCardSuitsShape(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(async e => {
    const { loadClubsSuitShape } = await import("./clubs/index.js"),
      { loadDiamondsSuitShape } = await import("./diamonds/index.js"),
      { loadHeartsSuitShape } = await import("./hearts/index.js"),
      { loadSpadesSuitShape } = await import("./spades/index.js");

    await loadClubsSuitShape(e);
    await loadDiamondsSuitShape(e);
    await loadHeartsSuitShape(e);
    await loadSpadesSuitShape(e);
  });
}

/**
 * @param engine -
 */
export async function loadCardsShape(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(async e => {
    const { loadFullCardsShape } = await import("./cards/index.js");

    await loadFullCardsShape(e);
    await loadCardSuitsShape(e);
  });
}

export * from "./cards/index.js";
export * from "./clubs/index.js";
export * from "./diamonds/index.js";
export * from "./hearts/index.js";
export * from "./spades/index.js";
