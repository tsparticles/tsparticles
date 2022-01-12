import { Bouncer } from "./Bouncer";
import type { Engine } from "../../../engine";

export async function loadExternalBounceInteraction(engine: Engine): Promise<void> {
    await engine.addInteractor("externalBounce", (container) => new Bouncer(container));
}
