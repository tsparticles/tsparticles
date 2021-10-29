import type { Main } from "../../main";
import { WobbleUpdater } from "./WobbleUpdater";

export async function loadWobbleUpdater(tsParticles: Main): Promise<void> {
    await tsParticles.addParticleUpdater("wobble", (container) => new WobbleUpdater(container));
}
