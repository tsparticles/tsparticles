import type { Engine } from "tsparticles-engine";
import { loadPlugin } from "./plugin";
import { loadInteraction } from "./interaction";

export async function loadParticlesLinksInteraction(tsParticles: Engine): Promise<void> {
    await loadInteraction(tsParticles);
    await loadPlugin(tsParticles);
}
