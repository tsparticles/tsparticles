import type { Main } from "tsparticles-core";
import { Linker } from "./Linker";
import { loadPlugin } from "./plugin";

export function loadInteraction(tsParticles: Main): void {
    tsParticles.addInteractor((container) => new Linker(container));
}

export function loadLinks(tsParticles: Main): void {
    loadInteraction(tsParticles);
    loadPlugin(tsParticles);
}
