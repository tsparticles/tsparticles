import type { Engine } from "../../engine";
import { SizeUpdater } from "./SizeUpdater";

export async function loadSizeUpdater(engine: Engine): Promise<void> {
    await engine.addParticleUpdater("size", () => new SizeUpdater());
}
