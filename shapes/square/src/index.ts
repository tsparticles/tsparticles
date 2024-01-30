import type { Engine } from "@tsparticles/engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadSquareShape(engine: Engine, refresh = true): Promise<void> {
    const { SquareDrawer } = await import("./SquareDrawer.js");

    await engine.addShape(["edge", "square"], new SquareDrawer(), refresh);
}
