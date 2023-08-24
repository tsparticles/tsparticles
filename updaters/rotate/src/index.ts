import type { Engine } from "@tsparticles/engine";
import { RotateUpdater } from "./RotateUpdater";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadRotateUpdater(engine: Engine, refresh = true): Promise<void> {
    await engine.addParticleUpdater("rotate", (container) => new RotateUpdater(container), refresh);
}
