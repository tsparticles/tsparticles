import { Attractor } from "./Attractor";
import type { Engine } from "../../../engine";

export async function loadExternalAttractInteraction(engine: Engine): Promise<void> {
    await engine.addInteractor("externalAttract", (container) => new Attractor(container));
}
