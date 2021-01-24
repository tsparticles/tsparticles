import type { Main } from "tsparticles-core";
import { ExternalLighter } from "./ExternalLighter";
import { ParticlesLighter } from "./ParticlesLighter";

export function loadInteraction(tsParticles: Main): void {
    tsParticles.addInteractor((container) => new ExternalLighter(container));
    tsParticles.addInteractor((container) => new ParticlesLighter(container));
}
