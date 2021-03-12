import type { Main } from "tsparticles-engine";
import { OrbitUpdater } from "./OrbitUpdater";

export function loadOrbitUpdater(tsParticles: Main): void {
    tsParticles.addParticleUpdater("orbit", (container) => new OrbitUpdater(container));
}
