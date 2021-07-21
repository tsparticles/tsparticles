import type { Main } from "../../../main";
import { Repulser } from "./Repulser";

export function loadExternalRepulseInteraction(tsParticles: Main): void {
    tsParticles.addInteractor("externalRepulse", (container) => new Repulser(container));
}
