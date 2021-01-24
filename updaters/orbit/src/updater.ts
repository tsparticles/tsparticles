import type { Main } from "tsparticles-core";
import { OrbitUpdater } from "./OrbitUpdater";

export function loadUpdater(tsParticles: Main): void {
    tsParticles.addParticleUpdater((container) => new OrbitUpdater(container));
}
