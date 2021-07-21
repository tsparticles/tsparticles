import type { Main } from "../../main";
import { OpacityUpdater } from "./OpacityUpdater";

export function loadOpacityUpdater(tsParticles: Main): void {
    tsParticles.addParticleUpdater("opacity", () => new OpacityUpdater());
}
