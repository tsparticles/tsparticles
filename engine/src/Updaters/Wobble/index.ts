import type { Engine } from "../../engine";
import { WobbleUpdater } from "./WobbleUpdater";

export async function loadWobbleUpdater(engine: Engine): Promise<void> {
    await engine.addParticleUpdater("wobble", (container) => new WobbleUpdater(container));
}
