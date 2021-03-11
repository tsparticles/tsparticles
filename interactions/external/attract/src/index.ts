import type { Main } from "tsparticles-engine";
import { Attractor } from "./Attractor";

export function loadExternalAttractInteraction(tsParticles: Main): void {
    tsParticles.addInteractor("externalAttract", (container) => new Attractor(container));
}
