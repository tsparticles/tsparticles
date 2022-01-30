import { Bubbler } from "./Bubbler";
import type { Engine } from "tsparticles-engine";

export async function loadExternalBubbleInteraction(engine: Engine): Promise<void> {
    await engine.addInteractor("externalBubble", (container) => new Bubbler(container));
}
