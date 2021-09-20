import type { Main } from "../../main";
import { WobbleUpdater } from "./WobbleUpdater";

export function loadWobbleUpdater(tsParticles: Main): void {
    tsParticles.addParticleUpdater("wobble", (container) => new WobbleUpdater(container));
}
