import type { Main } from "../../main";
import { StrokeColorUpdater } from "./StrokeColorUpdater";

export async function loadStrokeColorUpdater(tsParticles: Main): Promise<void> {
    await tsParticles.addParticleUpdater("strokeColor", (container) => new StrokeColorUpdater(container));
}
