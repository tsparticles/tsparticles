import type { Engine } from "tsparticles-engine";
import { TwinkleUpdater } from "./TwinkleUpdater";

/**
 * @param engine -
 * @param refresh -
 */
export async function loadTwinkleUpdater(engine: Engine, refresh = true): Promise<void> {
    await engine.addParticleUpdater("twinkle", () => new TwinkleUpdater(), refresh);
}
