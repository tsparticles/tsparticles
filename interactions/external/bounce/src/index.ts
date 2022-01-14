import type { Engine } from "tsparticles-engine";
import { Bouncer } from "./Bouncer";

export async function loadExternalBounceInteraction(engine: Engine): Promise<void> {
    await engine.addInteractor("externalBounce", (container) => new Bouncer(container));
}
