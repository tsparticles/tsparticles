import type { Engine } from "tsparticles-engine";
import { Repulser } from "./Repulser";

export function loadParticlesRepulseInteraction(engine: Engine): void {
    engine.addInteractor("particlesRepulse", (container) => new Repulser(container));
}
