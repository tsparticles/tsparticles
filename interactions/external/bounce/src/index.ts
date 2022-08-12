import { Bouncer } from "./Bouncer";
import type { Engine } from "tsparticles-engine";

export async function loadExternalBounceInteraction(engine: Engine): Promise<void> {
    await engine.addInteractor("externalBounce", (container) => new Bouncer(container));
}

export * from "./Options/Classes/Bounce";
export * from "./Options/Interfaces/IBounce";
