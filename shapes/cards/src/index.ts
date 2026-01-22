import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export async function loadCardsShape(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.register(async e => {
    const { loadClubsCardsShape } = await import("./clubs/index.js"),
      { loadDiamondsCardsShape } = await import("./diamonds/index.js"),
      { loadHeartsCardsShape } = await import("./hearts/index.js"),
      { loadSpadesCardsShape } = await import("./spades/index.js");

    await loadClubsCardsShape(e);
    await loadDiamondsCardsShape(e);
    await loadHeartsCardsShape(e);
    await loadSpadesCardsShape(e);
  });
}

export * from "./clubs/index.js";
export * from "./diamonds/index.js";
export * from "./hearts/index.js";
export * from "./spades/index.js";
