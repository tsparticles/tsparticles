import type { Engine } from "tsparticles";
import { OrbitUpdater } from "./OrbitUpdater";

export function loadOrbitUpdater(tsParticles: Engine): void {
    tsParticles.addParticleUpdater("orbit", (container) => new OrbitUpdater(container));
}
