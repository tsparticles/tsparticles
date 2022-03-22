import { Attractor } from "./Attractor";
import type { Engine } from "../../../engine";

export async function loadParticlesAttractInteraction(engine: Engine): Promise<void> {
    await engine.addInteractor("particlesAttract", (container) => new Attractor(container));
}
