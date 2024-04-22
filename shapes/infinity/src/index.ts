import type { Engine } from "@tsparticles/engine";
import { InfinityDrawer } from "./InfinityDrawer.js";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadInfinityShape(engine: Engine, refresh = true): Promise<void> {
    await engine.addShape(new InfinityDrawer(), refresh);
}
