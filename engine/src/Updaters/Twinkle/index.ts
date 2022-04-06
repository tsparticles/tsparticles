import type { Engine } from "../../engine";
import { TwinkleUpdater } from "./TwinkleUpdater";

export async function loadTwinkleUpdater(engine: Engine): Promise<void> {
    await engine.addParticleUpdater("tilt", () => new TwinkleUpdater());
}
