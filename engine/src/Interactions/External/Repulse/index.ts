import type { Engine } from "../../../engine";
import { Repulser } from "./Repulser";

export async function loadExternalRepulseInteraction(engine: Engine): Promise<void> {
    await engine.addInteractor("externalRepulse", (container) => new Repulser(container));
}
