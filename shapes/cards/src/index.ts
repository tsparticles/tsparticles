import { type Engine } from "@tsparticles/engine";

declare const __VERSION__: string;

/**
 * @param engine -
 */
export function loadCardsShape(engine: Engine): void {
    engine.checkVersion(__VERSION__);

    engine.register(async e => {
        const { loadClubsCardsShape } = await import("./clubs/index.js"),
            { loadDiamondsCardsShape } = await import("./diamonds/index.js"),
            { loadHeartsCardsShape } = await import("./hearts/index.js"),
            { loadSpadesCardsShape } = await import("./spades/index.js");

        loadClubsCardsShape(e);
        loadDiamondsCardsShape(e);
        loadHeartsCardsShape(e);
        loadSpadesCardsShape(e);
    });
}

export * from "./clubs/index.js";
export * from "./diamonds/index.js";
export * from "./hearts/index.js";
export * from "./spades/index.js";
