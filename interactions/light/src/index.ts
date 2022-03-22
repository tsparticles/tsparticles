import type { Engine } from "tsparticles";
import { ExternalLighter } from "./ExternalLighter";
import { ParticlesLighter } from "./ParticlesLighter";

export function loadLightInteraction(engine: Engine): void {
    engine.addInteractor("externalLight", (container) => new ExternalLighter(container));
    engine.addInteractor("particlesLight", (container) => new ParticlesLighter(container));
}
