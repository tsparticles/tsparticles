import type { Main } from "tsparticles-core";
import { Collider } from "./Collider";

export function loadInteraction(tsParticles: Main): void {
    tsParticles.addInteractor((container) => new Collider(container));
}
