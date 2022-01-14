import type { Engine } from "../../engine";
import { StrokeColorUpdater } from "./StrokeColorUpdater";

export async function loadStrokeColorUpdater(engine: Engine): Promise<void> {
    await engine.addParticleUpdater("strokeColor", (container) => new StrokeColorUpdater(container));
}
