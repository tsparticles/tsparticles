import type { Engine } from "tsparticles-engine";
import { StrokeColorUpdater } from "./StrokeColorUpdater";

export async function loadStrokeColorUpdater(tsParticles: Engine): Promise<void> {
    await tsParticles.addParticleUpdater("strokeColor", (container) => new StrokeColorUpdater(container));
}
