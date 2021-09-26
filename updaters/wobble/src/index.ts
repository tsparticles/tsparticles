import type { Main } from "tsparticles-engine";
import { WobbleUpdater } from "./WobbleUpdater";

export function loadWobbleUpdater(tsParticles: Main): void {
    tsParticles.addParticleUpdater("wobble", (container) => new WobbleUpdater(container));
}
