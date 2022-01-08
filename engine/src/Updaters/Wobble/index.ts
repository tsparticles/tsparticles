import type { Engine } from "../../engine";
import { WobbleUpdater } from "./WobbleUpdater";

export async function loadWobbleUpdater(tsParticles: Engine): Promise<void> {
    await tsParticles.addParticleUpdater("wobble", (container) => new WobbleUpdater(container));
}
