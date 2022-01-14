import { Engine, RecursivePartial, tsParticles } from "tsparticles-engine";
import { IConfettiOptions } from "./IConfettiOptions";
import { loadAngleUpdater } from "tsparticles-updater-angle";
import { loadCircleShape } from "tsparticles-shape-circle";
import { loadColorUpdater } from "tsparticles-updater-color";
import { loadEmittersPlugin } from "tsparticles-plugin-emitters";
import { loadLifeUpdater } from "tsparticles-updater-life";
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
    await loadCircleShape(engine);
    await loadSquareShape(engine);
    await loadColorUpdater(engine);
    await loadSizeUpdater(engine);
    await loadOpacityUpdater(engine);
    await loadOutModesUpdater(engine);
    await loadEmittersPlugin(engine);
    await loadWobbleUpdater(engine);
    await loadRollUpdater(engine);
    await loadAngleUpdater(engine);
    await loadTiltUpdater(engine);
    await loadLifeUpdater(engine);

    await engine.addPreset("confetti", loadOptions(confettiOptions), override);
}

export function loadConfettiPreset(main: Engine): void {
    loadPreset(main, {}, true);
}

type ConfettiOptions = RecursivePartial<IConfettiOptions>;
type ConfettiFirstParam = string | ConfettiOptions;

export function confetti(idOrOptions: ConfettiFirstParam, confettiOptions?: RecursivePartial<IConfettiOptions>): void {
    let options: ConfettiOptions;
    let id: string;

    if (typeof idOrOptions === "string") {
        id = idOrOptions;
        options = confettiOptions ?? {};
    } else {
        id = `tsparticles_${Math.floor(Math.random() * 1000)}`;
        options = idOrOptions;
    }

    loadPreset(tsParticles, options, true);

    tsParticles.load(id, { preset: "confetti" });
}
