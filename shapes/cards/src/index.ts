import { ClubDrawer, DiamondDrawer, HeartDrawer, SpadeDrawer } from "./CardsSuitsDrawers";
import type { Engine } from "tsparticles-engine";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadCardsShape(engine: Engine, refresh = true): Promise<void> {
    await engine.addShape(["spade", "spades"], new SpadeDrawer(), refresh);
    await engine.addShape(["heart", "hearts"], new HeartDrawer(), refresh);
    await engine.addShape(["diamond", "diamonds"], new DiamondDrawer(), refresh);
    await engine.addShape(["club", "clubs"], new ClubDrawer(), refresh);
}
