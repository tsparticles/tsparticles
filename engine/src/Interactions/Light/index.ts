import type { Main } from "../../main";
import { ExternalLighter } from "./ExternalLighter";
import { ParticlesLighter } from "./ParticlesLighter";

export function loadLightInteraction(tsParticles: Main): void {
    tsParticles.addInteractor("externalLight", (container) => new ExternalLighter(container));
    tsParticles.addInteractor("particlesLight", (container) => new ParticlesLighter(container));
}
