import type { Main } from "tsparticles-core";
import { Infecter } from "./Infecter";

export function loadInteraction(tsParticles: Main): void {
    tsParticles.addInteractor((container) => new Infecter(container));
}
