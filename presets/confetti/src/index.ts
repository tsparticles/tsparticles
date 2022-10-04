import type { Engine, RecursivePartial } from "tsparticles-engine";
import { getRandom, tsParticles } from "tsparticles-engine";
import type { IConfettiOptions } from "./IConfettiOptions";
import { loadAngleUpdater } from "tsparticles-updater-angle";
import { loadBaseMover } from "tsparticles-move-base";
import { loadCircleShape } from "tsparticles-shape-circle";
import { loadColorUpdater } from "tsparticles-updater-color";
import { loadEmittersPlugin } from "tsparticles-plugin-emitters";
import { loadLifeUpdater } from "tsparticles-updater-life";
import { loadMotionPlugin } from "tsparticles-plugin-motion";
import { loadOpacityUpdater } from "tsparticles-updater-opacity";
import { loadOptions } from "./options";
import { loadOutModesUpdater } from "tsparticles-updater-out-modes";
import { loadRollUpdater } from "tsparticles-updater-roll";
import { loadSizeUpdater } from "tsparticles-updater-size";
import { loadSquareShape } from "tsparticles-shape-square";
import { loadTiltUpdater } from "tsparticles-updater-tilt";
import { loadWobbleUpdater } from "tsparticles-updater-wobble";

async function loadPreset(
    engine: Engine,
    confettiOptions: RecursivePartial<IConfettiOptions>,
    override = false
): Promise<void> {
    await loadBaseMover(engine);
    await loadCircleShape(engine);
    await loadSquareShape(engine);
    await loadColorUpdater(engine);
    await loadSizeUpdater(engine);
    await loadOpacityUpdater(engine);
    await loadOutModesUpdater(engine);
    await loadEmittersPlugin(engine);
    await loadMotionPlugin(engine);
    await loadWobbleUpdater(engine);
    await loadRollUpdater(engine);
    await loadAngleUpdater(engine);
    await loadTiltUpdater(engine);
    await loadLifeUpdater(engine);

    await engine.addPreset("confetti", loadOptions(confettiOptions), override);
}

export async function loadConfettiPreset(main: Engine): Promise<void> {
    await loadPreset(main, {}, true);
}

export type ConfettiOptions = RecursivePartial<IConfettiOptions>;
export type ConfettiFirstParam = string | ConfettiOptions;

export async function confetti(
    idOrOptions: ConfettiFirstParam,
    confettiOptions?: RecursivePartial<IConfettiOptions>
): Promise<void> {
    let options: ConfettiOptions;
    let id: string;

    if (typeof idOrOptions === "string") {
        id = idOrOptions;
        options = confettiOptions ?? {};
    } else {
        id = `tsparticles_${Math.floor(getRandom() * 1000)}`;
        options = idOrOptions;
    }

    await loadPreset(tsParticles, options, true);

    await tsParticles.load(id, { preset: "confetti" });
}
