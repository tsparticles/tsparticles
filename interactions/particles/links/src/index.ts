import type { Engine } from "tsparticles-engine";
import { loadInteraction } from "./interaction";
import { loadPlugin } from "./plugin";

export async function loadParticlesLinksInteraction(engine: Engine): Promise<void> {
    await loadInteraction(engine);
    await loadPlugin(engine);
}
