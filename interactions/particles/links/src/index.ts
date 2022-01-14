import type { Engine } from "tsparticles-engine";
import { loadPlugin } from "./plugin";
import { loadInteraction } from "./interaction";

export async function loadParticlesLinksInteraction(engine: Engine): Promise<void> {
    await loadInteraction(engine);
    await loadPlugin(engine);
}
