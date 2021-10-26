import type { Main } from "../../../main";
import { Linker } from "./Linker";
import { loadPlugin } from "./plugin";

export async function loadInteraction(tsParticles: Main): Promise<void> {
    await tsParticles.addInteractor("particlesLinks", (container) => new Linker(container));
}

export async function loadParticlesLinksInteraction(tsParticles: Main): Promise<void> {
    await loadInteraction(tsParticles);
    await loadPlugin(tsParticles);
}
