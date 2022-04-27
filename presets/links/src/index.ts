import type { Engine } from "@tsparticles/engine";
import { loadBaseMover } from "@tsparticles/move-base";
import { loadCircleShape } from "@tsparticles/shape-circle";
import { loadColorUpdater } from "@tsparticles/updater-color";
import { loadOpacityUpdater } from "@tsparticles/updater-opacity";
import { loadOutModesUpdater } from "@tsparticles/updater-out-modes";
import { loadParticlesLinksInteraction } from "@tsparticles/interaction-particles-links";
import { loadSizeUpdater } from "@tsparticles/updater-size";
import { options } from "./options";

export async function loadLinksPreset(engine: Engine): Promise<void> {
    await loadBaseMover(engine);
    await loadCircleShape(engine);
    await loadColorUpdater(engine);
    await loadParticlesLinksInteraction(engine);
    await loadOutModesUpdater(engine);
    await loadOpacityUpdater(engine);
    await loadSizeUpdater(engine);

    await engine.addPreset("links", options);
}
