import type { Main } from "tsparticles-engine";
import { WobbleUpdater } from "./WobbleUpdater";

export async function loadWobbleUpdater(tsParticles: Main): Promise<void> {
    await tsParticles.addParticleUpdater("wobble", (container) => new WobbleUpdater(container));
}
