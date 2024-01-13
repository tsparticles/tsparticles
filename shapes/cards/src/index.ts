import type { Engine } from "@tsparticles/engine";

/**
 *
 * @param engine
 * @param refresh
 */
export async function loadSpadesShape(engine: Engine, refresh = true): Promise<void> {
    const { SpadeDrawer } = await import("./CardsSuitsDrawers.js");

    await engine.addShape(["spade", "spades"], new SpadeDrawer(), refresh);
}

/**
 *
 * @param engine
 * @param refresh
 */
export async function loadHeartsShape(engine: Engine, refresh = true): Promise<void> {
    const { HeartDrawer } = await import("./CardsSuitsDrawers.js");

    await engine.addShape(["heart", "hearts"], new HeartDrawer(), refresh);
}

/**
 *
 * @param engine
 * @param refresh
 */
export async function loadDiamondsShape(engine: Engine, refresh = true): Promise<void> {
    const { DiamondDrawer } = await import("./CardsSuitsDrawers.js");

    await engine.addShape(["diamond", "diamonds"], new DiamondDrawer(), refresh);
}

/**
 *
 * @param engine
 * @param refresh
 */
export async function loadClubsShape(engine: Engine, refresh = true): Promise<void> {
    const { ClubDrawer } = await import("./CardsSuitsDrawers.js");

    await engine.addShape(["club", "clubs"], new ClubDrawer(), refresh);
}

/**
 * @param engine -
 * @param refresh -
 */
export async function loadCardsShape(engine: Engine, refresh = true): Promise<void> {
    await loadSpadesShape(engine, false);
    await loadHeartsShape(engine, false);
    await loadDiamondsShape(engine, false);
    await loadClubsShape(engine, false);

    if (refresh) {
        await engine.refresh();
    }
}
