import { type Engine, assertValidVersion } from "@tsparticles/engine";
import { ClubDrawer } from "./ClubDrawer.js";
import { DiamondDrawer } from "./DiamondDrawer.js";
import { HeartDrawer } from "./HeartDrawer.js";
import { SpadeDrawer } from "./SpadeDrawer.js";

declare const __VERSION__: string;

/**
 * @param engine -
 * @param refresh -
 */
export async function loadCardsShape(engine: Engine, refresh = true): Promise<void> {
    assertValidVersion(engine, __VERSION__);

    await engine.addShape(new SpadeDrawer(), refresh);
    await engine.addShape(new HeartDrawer(), refresh);
    await engine.addShape(new DiamondDrawer(), refresh);
    await engine.addShape(new ClubDrawer(), refresh);
}
