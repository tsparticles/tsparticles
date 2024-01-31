import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadBaseMover(engine: Engine, refresh = true): Promise<void> {
    await engine.addMover(
        "base",
        async () => {
            const { BaseMover } = await import("./BaseMover.js");

            return new BaseMover();
        },
        refresh,
    );
}
