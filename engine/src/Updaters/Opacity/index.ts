import type { Engine } from "../../engine";
import { OpacityUpdater } from "./OpacityUpdater";

export async function loadOpacityUpdater(engine: Engine): Promise<void> {
    await engine.addParticleUpdater("opacity", (container) => new OpacityUpdater(container));
}
