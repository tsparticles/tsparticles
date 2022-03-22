import type { Engine } from "tsparticles";
import { OrbitUpdater } from "./OrbitUpdater";

export function loadOrbitUpdater(engine: Engine): void {
    engine.addParticleUpdater("orbit", (container) => new OrbitUpdater(container));
}
