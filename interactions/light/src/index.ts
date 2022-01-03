import type { Engine } from "tsparticles";
import { ExternalLighter } from "./ExternalLighter";
import { ParticlesLighter } from "./ParticlesLighter";

export function loadLightInteraction(tsParticles: Engine): void {
    tsParticles.addInteractor("externalLight", (container) => new ExternalLighter(container));
    tsParticles.addInteractor("particlesLight", (container) => new ParticlesLighter(container));
}
