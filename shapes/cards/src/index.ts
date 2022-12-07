import { ClubDrawer, DiamondDrawer, HeartDrawer, SpadeDrawer } from "./CardsSuitsDrawers";
import type { Engine } from "tsparticles-engine";

export async function loadCardsShape(engine: Engine): Promise<void> {
    const spade = new SpadeDrawer(),
        heart = new HeartDrawer(),
        diamond = new DiamondDrawer(),
        club = new ClubDrawer();

    await engine.addShape("spade", spade);
    await engine.addShape("spades", spade);

    await engine.addShape("heart", heart);
    await engine.addShape("hearts", heart);

    await engine.addShape("diamond", diamond);
    await engine.addShape("diamonds", diamond);

    await engine.addShape("club", club);
    await engine.addShape("clubs", club);
}
