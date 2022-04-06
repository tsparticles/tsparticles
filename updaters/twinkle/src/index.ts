import type { Engine } from "tsparticles-engine";
import { TwinkleUpdater } from "./TwinkleUpdater";

export async function loadTwinkleUpdater(engine: Engine): Promise<void> {
    await engine.addParticleUpdater("twinkle", () => new TwinkleUpdater());
}
