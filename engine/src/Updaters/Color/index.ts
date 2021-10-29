import type { Main } from "../../main";
import { ColorUpdater } from "./ColorUpdater";

export async function loadColorUpdater(tsParticles: Main): Promise<void> {
    await tsParticles.addParticleUpdater("color", (container) => new ColorUpdater(container));
}
