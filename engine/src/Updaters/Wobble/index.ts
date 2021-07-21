import type { Main } from "../../main";
import { WobbleUpdater } from "./WobbleUpdater";

export function loadWobbleUpdater(tsParticles: Main): void {
    tsParticles.addParticleUpdater("wobble", () => new WobbleUpdater());
}
