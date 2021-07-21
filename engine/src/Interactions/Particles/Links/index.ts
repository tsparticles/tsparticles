import type { Main } from "../../../main";
import { Linker } from "./Linker";
import { loadPlugin } from "./plugin";

export function loadInteraction(tsParticles: Main): void {
    tsParticles.addInteractor("particlesLinks", (container) => new Linker(container));
}

export function loadParticlesLinksInteraction(tsParticles: Main): void {
    loadInteraction(tsParticles);
    loadPlugin(tsParticles);
}
