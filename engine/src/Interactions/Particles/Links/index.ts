import type { Engine } from "../../../engine";
import { loadInteraction } from "./interaction";
import { loadPlugin } from "./plugin";

export async function loadParticlesLinksInteraction(tsParticles: Engine): Promise<void> {
    await loadInteraction(tsParticles);
    await loadPlugin(tsParticles);
}
