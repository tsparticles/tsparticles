import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadBaseMover(engine: Engine, refresh = true): Promise<void> {
    const { BaseMover } = await import("./BaseMover.js");

    await engine.addMover("base", () => new BaseMover(), refresh);
}
