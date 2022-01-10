import type { Engine } from "../../../engine";
import { Linker } from "./Linker";

export async function loadInteraction(tsParticles: Engine): Promise<void> {
    await tsParticles.addInteractor("particlesLinks", (container) => new Linker(container));
}
