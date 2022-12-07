import { ClubDrawer, DiamondDrawer, HeartDrawer, SpadeDrawer } from "./CardsSuitsDrawers";
import type { Engine } from "tsparticles-engine";

export async function loadCardsShape(engine: Engine): Promise<void> {
    await engine.addShape(["spade", "spades"], new SpadeDrawer());
    await engine.addShape(["heart", "hearts"], new HeartDrawer());
    await engine.addShape(["diamond", "diamonds"], new DiamondDrawer());
    await engine.addShape(["club", "clubs"], new ClubDrawer());
}
