import type { Main } from "../../main";
import { ColorUpdater } from "./ColorUpdater";

export function loadColorUpdater(tsParticles: Main): void {
    tsParticles.addParticleUpdater("color", (container) => new ColorUpdater(container));
}
