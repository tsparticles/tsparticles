import type { Main } from "tsparticles-core";
import { Repulser } from "./Repulser";

export function loadExternalRepulseInteraction(tsParticles: Main): void {
    tsParticles.addInteractor("externalRepulse", (container) => new Repulser(container));
}
