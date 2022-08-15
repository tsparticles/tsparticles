import { DestroyUpdater } from "./DestroyUpdater";
import type { Engine } from "tsparticles-engine";

export async function loadDestroyUpdater(engine: Engine): Promise<void> {
    await engine.addParticleUpdater("destroy", (container) => new DestroyUpdater(engine, container));
}
