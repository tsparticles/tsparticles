import type { Engine } from "tsparticles-engine";
import { OrbitUpdater } from "./OrbitUpdater";

export function loadOrbitUpdater(tsParticles: Engine): void {
    tsParticles.addParticleUpdater("orbit", (container) => new OrbitUpdater(container));
}
