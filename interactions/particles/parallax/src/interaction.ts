import type { Main } from "tsparticles-core";
import { Parallax } from "./Parallax";

export function loadInteraction(tsParticles: Main): void {
    tsParticles.addInteractor((container) => new Parallax(container));
}
